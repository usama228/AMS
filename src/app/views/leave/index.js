import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETELEAVEREQUEST, GETALLLEAVES, GETALLUSERS, GETUSERSBYTEAMLEAD, UPDATELEAVESTATUS } from 'app/redux/actions';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Grid,
  IconButton,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, SimpleCard } from 'app/components';
import { PaginationComponent, ResponsiveDeleteConfirmationDialog, SnackbarComponent, StyledTable, TextField1 } from 'app/assets';
import { useAuth } from 'app/hooks/useAuth';
import Loading from 'app/components/MatxLoading';
import { PAGE_LIMIT } from 'config';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { PATH } from 'config';
import { STATUS } from 'config';

const AllRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const employees = useSelector(state => state.user);
  const leaves = useSelector(state => state.leave);

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(1);
  const [leaveToDelete, setLeaveToDelete] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  useEffect(() => {
    if (auth.userType === 'admin') {
      dispatch(GETALLUSERS({ page: 1, limit: 1000000 }, auth, onError));
    } else if (auth.isTeamLead) {
      dispatch(GETUSERSBYTEAMLEAD(auth.id, { page: 1, limit: 1000000 }));
    }
  }, [dispatch, auth]);

  useEffect(() => {
    dispatch(GETALLLEAVES({
      page: page,
      limit: PAGE_LIMIT,
      userId: selectedEmployee || (auth.userType === 'admin' ? null : auth.id),
      status: selectedStatus,
    }));
  }, [dispatch, auth, selectedEmployee, page, selectedStatus]);


  const handleEditClick = (id) => {
    navigate(PATH.CREATEREQUEST.replace(":id", id));
  };

  const confirmDelete = () => {
    dispatch(DELETELEAVEREQUEST(leaveToDelete, moveToNextOnDelete, onError));
    setDialogOpen(false);
    setLeaveToDelete(null);
  };
const moveToNextOnDelete=()=>{
  dispatch(GETALLLEAVES({
    page: page,
    limit: PAGE_LIMIT,
    userId: selectedEmployee || (auth.userType === 'admin' ? null : auth.id),
    status: selectedStatus,
  }));
}
  const handleDeleteClick = (id) => {
    setLeaveToDelete(id);
    setDialogOpen(true);
  };


  const handleDialogClose = () => {
    setDialogOpen(false);
    setLeaveToDelete(null);
  };


  const handlePageChange = (value) => {
    setPage(value);
  };

  const handleStatusChange = (leaveId, newStatus) => {
    setLeaveStatus(prev => ({
      ...prev,
      [leaveId]: newStatus
    }));

    dispatch(UPDATELEAVESTATUS(leaveId, newStatus, () => {
    }));
  };

  const onError = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };



  return (
    <SimpleCard>
      <Box>
        <Breadcrumb routeSegments={[{ name: 'All Leaves' }]} />
      </Box>
      <Grid container spacing={2}>
        {(auth.userType === 'admin' || auth.isTeamLead === true) && (
          <Grid item xs={4}>

            <TextField1
              fullWidth
              select
              name="employeesbyteamlead"
              value={selectedEmployee}
              SelectProps={{ native: true }}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="" disabled>Select Employee</option>
              {employees?.allUsers?.users.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </TextField1>
          </Grid>
        )}
        <Grid item xs={4}>
          <TextField1
            fullWidth
            select
            name="status"
            value={selectedStatus}
            SelectProps={{ native: true }}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="" disabled>Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </TextField1>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate(PATH.CREATEREQUEST.replace(":id", "new"))}
          >
            Create Leave
          </Button>
        </Grid>
      </Grid>
      {leaves.allLeavesLoading && <Loading />}
      {leaves.allLeavesSuccess && (
        <Box width="100%" overflow="auto">
          {leaves.allLeavesData?.leaves.length <= 0 ? (
            <span>No Leaves</span>
          ) : (
            <React.Fragment>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Employee Name</TableCell>
                    <TableCell align="center">Start</TableCell>
                    <TableCell align="center">End</TableCell>
                    <TableCell align="center">Reason</TableCell>
                    <TableCell align="center">Leave Type</TableCell>
                    <TableCell align="center">Status</TableCell>
                    {auth.userType === 'employee' && (
                      <TableCell align="center">Actions</TableCell>
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {leaves.allLeavesData.leaves.map((leave) => {
                    const currentStatus = leaveStatus[leave.id] || leave.status;
                    return (
                      <TableRow key={leave.id}>
                        <TableCell align="center">{leave.User.name}</TableCell>
                        <TableCell align="center">{new Date(leave.startDate).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{new Date(leave.endDate).toLocaleDateString()}</TableCell>
                        <TableCell align="center">{leave.reason}</TableCell>
                        <TableCell align="center">{leave.leaveType}</TableCell>

                        {auth.userType === 'admin' ? (
                          <TableCell align="center">
                            <TextField1
                              fullWidth
                              select
                              name="status"
                              value={currentStatus}
                              SelectProps={{ native: true }}
                              onChange={(e) => handleStatusChange(leave.id, e.target.value)}
                            >
                              <option value="" disabled>Select Status</option>
                              {STATUS.map((status) => (
                                <option key={status.id} value={status.id}>
                                  {status.value}
                                </option>
                              ))}
                            </TextField1>
                          </TableCell>
                        ) : (
                          <TableCell align="center">
                            {leave.status}
                          </TableCell>
                        )}
                        {auth.userType === 'employee' && (
                          <TableCell align="center">
                            <IconButton color="primary" onClick={() => handleEditClick(leave.id)}>
                              <EditOutlined />
                            </IconButton>

                            <IconButton color="error" onClick={() => handleDeleteClick(leave.id)}>
                              <DeleteOutline />
                            </IconButton>

                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </StyledTable>
              {leaves.allLeavesData.totalPages && (
                <PaginationComponent
                  count={leaves.allLeavesData.totalPages}
                  page={page}
                  handlePageChange={handlePageChange}
                />
              )}
            </React.Fragment>
          )}
        </Box>
      )
      }
      <SnackbarComponent
        show={snackbarOpen}
        message={snackbarMessage}
      />
      <ResponsiveDeleteConfirmationDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        onYes={confirmDelete}
        message="Are you sure you want to delete this employee?"
      />
    </SimpleCard >
  );
};

export default AllRequests;
