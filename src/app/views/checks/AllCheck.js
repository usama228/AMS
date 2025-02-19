import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GETALLUSERS, GETUSERSBYTEAMLEAD } from 'app/redux/actions';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Box, Grid, IconButton
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import dayjs from 'dayjs';
import { useAuth } from 'app/hooks/useAuth';
import { ResponsiveDeleteConfirmationDialog, SnackbarComponent, TextField1 } from 'app/assets';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { DELETEATTENDANCEBYADMIN, GETUSERATTENDANCE } from 'app/redux/actions/checkin/attendanceActions';
import { getDaysInMonth } from 'app/assets/genericActions';
import { MONTHLIST } from 'config';
import { PATH } from 'config';
import { useNavigate } from 'react-router-dom';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function AllCheck() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  const employees = useSelector(state => state.user);
  const attendance = useSelector(state => state.attendance);
  const [checkToDelete, setCheckToDelete] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (auth.userType === 'admin') {
      dispatch(GETALLUSERS({ page: 1, limit: 1000000 }, auth, onError));
    }
    else {
      if (auth.isTeamLead) {
        dispatch(GETUSERSBYTEAMLEAD(auth.id, { page: 1, limit: 1000000 }));
      }
      dispatch(GETUSERATTENDANCE(auth.id));
    }
  }, [dispatch, auth]);


  const onEmployeeSelection = (employeeId) => {
    setSelectedEmployee(employeeId);
    if (employeeId) {
      dispatch(GETUSERATTENDANCE(employeeId));
    }
  };

  const confirmDelete = () => {
    dispatch(DELETEATTENDANCEBYADMIN(checkToDelete, auth, null, onError));
    setDialogOpen(false);
    setCheckToDelete(null);
  };

  const handleEditClick = (id) => {
    navigate(PATH.CREATECHECK.replace(":id", id));

  };

  const handleDeleteClick = (id) => {
    setCheckToDelete(id);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCheckToDelete(null);
  };

  const onError = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const attendanceLookup = {};
  attendance.attendanceData.forEach(record => {
    attendanceLookup[dayjs(record.date).format('YYYY-MM-DD')] = record;
  });


  const id = new Date().getMonth() + 1
  const monthList = MONTHLIST.filter(m => m.id <= id);
  return (
    <SimpleCard>
      <Box>
        <Breadcrumb routeSegments={[{ name: "All Checks" }]} />
      </Box>
      <Box padding={2}>
        <Grid container spacing={2}>
          {(auth.userType === 'admin') && (
            <Grid item xs={4}>

              <TextField1
                fullWidth
                select
                name="employeesbyteamlead"
                value={selectedEmployee}
                SelectProps={{ native: true }}
                onChange={(e) => onEmployeeSelection(e.target.value)}
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
              name="month"
              value={month}
              SelectProps={{ native: true }}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="" disabled>Select Month</option>
              {monthList.map((month) => (
                <option key={month.id} value={month.id}>
                  {month.value}
                </option>
              ))
              }
            </TextField1>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                fullWidth
                slotProps={{ textField: { fullWidth: true } }}
                label="Select Year"
                views={['year']}
                value={dayjs(`${year}-01-01`)}
                onChange={(newValue) => setYear(newValue.year())}
                renderInput={(params) => <TextField1 {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

        </Grid>
        <TableContainer component={Paper} style={{ marginTop: '16px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Check In Time</TableCell>
                <TableCell align="center">Check Out Time</TableCell>
                <TableCell align="center">Break Time (min)</TableCell>
                <TableCell align="center">Working Hours</TableCell>
                <TableCell align="center">Notes</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getDaysInMonth(month, year)?.reverse()?.map(date => {
                const record = attendanceLookup[date] || {};
                const isRecordAvailable = Boolean(record.checkIn);
                return (
                  <TableRow key={date}>
                    <TableCell align="center">{date}</TableCell>
                    <TableCell align="center">{record.checkIn ? dayjs(record.checkIn).format('HH:mm') : '---'}</TableCell>
                    <TableCell align="center">{record.checkOut ? dayjs(record.checkOut).format('HH:mm') : '---'}</TableCell>
                    <TableCell align="center">{record.breakTime || '---'}</TableCell>
                    <TableCell align="center">{record.workingHours || '---'}</TableCell>
                    <TableCell align="center">{record.notes || '---'}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" disabled={!isRecordAvailable} onClick={() => handleEditClick(record.id)}>
                        <EditOutlined />
                      </IconButton>
                      {auth.userType === 'admin' && (
                        <IconButton color="error" disabled={!isRecordAvailable} onClick={() => handleDeleteClick(record.id)}>
                          <DeleteOutline />
                        </IconButton>
                      )}
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
    </SimpleCard>
  );
}

export default AllCheck;
