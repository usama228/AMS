import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Snackbar, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { PaginationComponent, StyledTable, TextField1 } from 'app/assets';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useAuth } from 'app/hooks/useAuth';
import { GETUSERSBYTEAMLEAD, REMOVEUSER } from 'app/redux/actions';
import { PAGE_LIMIT, PATH, STATUSFILTER } from '../../../config';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from 'app/components/MatxLoading';


function TeamLeadEmployees() {
    const dispatch = useDispatch();
    const auth = useAuth();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const employees = useSelector(state => state.user);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [page, setPage] = useState(1);

    const [status, setStatus] = useState('active');

    useEffect(() => {
        dispatch(GETUSERSBYTEAMLEAD(auth.id, {
            page: page,
            limit: PAGE_LIMIT,
            searchValue: searchValue,
            status: status
        }));


    }, [dispatch, auth, page, searchValue, status]);

    const onBlurSearchFields = (name, value) => {
        if (name === 'byName') {
            dispatch(GETUSERSBYTEAMLEAD(auth.id, {
                page: page,
                limit: PAGE_LIMIT,
                searchValue: value,
                status: status
            }, auth));
        } else {
            console.log("sdss", value)
            dispatch(GETUSERSBYTEAMLEAD(auth.id, {
                page: page,
                limit: PAGE_LIMIT,
                searchValue: searchValue,
                status: value
            }, auth, onError));
        }
    };

    const handlePageChange = (value) => {
        setPage(value);
    };

    const onError = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleEditClick = (id) => {
        navigate(PATH.CREATEEMPLOYEE.replace(":id", id));
    };

    const handleDeleteClick = (id) => {
        setEmployeeToDelete(id);
        setDialogOpen(true);
    };

    const confirmDelete = () => {
        dispatch(REMOVEUSER(employeeToDelete, null, onError));
        setDialogOpen(false);
        setEmployeeToDelete(null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEmployeeToDelete(null);
    };

    return (
        <SimpleCard>
            <Box>
                <Breadcrumb routeSegments={[{ name: 'Team' }]} />
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField1
                        id="outlined-basic"
                        label="Search by Name"
                        type="text"
                        name='byName'
                        variant="outlined"
                        size="small"
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            onBlurSearchFields(e.target.name, e.target.value);
                        }}
                        sx={{ margin: "10px" }} />
                </Grid>
                <Grid item xs={3}>
                    <TextField1
                        select
                        name="bystatus"
                        size="small"
                        label="Search by Status"
                        value={status}
                        SelectProps={{ native: true }}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            onBlurSearchFields(e.target.name, e.target.value);
                        }}
                        sx={{ margin: "10px" }}
                    >
                        <option value="" disabled selected></option>
                        {STATUSFILTER.map((status) => {
                            return (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            );
                        })}
                    </TextField1>
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(PATH.CREATEEMPLOYEE.replace(":id", "new"))}
                    >
                        Create Employee
                    </Button>
                </Grid>



            </Grid>
            {employees.allUsersLoading && <Loading />}
            {employees.allUsersSuccess && (
                <Box width="100%" overflow="auto">
                    <React.Fragment>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Profile</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Joining Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">CNIC</TableCell>
                                    <TableCell align="center">Team Lead</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employees.allUsers?.users.map((user) => {
                                    return (
                                        <TableRow key={user.id}>
                                            <TableCell align="center">
                                                <Avatar />
                                            </TableCell>
                                            <TableCell align="center">{user.name}</TableCell>
                                            <TableCell align="center">{user.email}</TableCell>
                                            <TableCell align="center">{new Date(user.joiningDate).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">{user.status}</TableCell>
                                            <TableCell align="center">{user.cnic}</TableCell>
                                            <TableCell align="center">{user.isTeamLead ? 'Yes' : 'No'}</TableCell>
                                            <TableCell align="center">
                                                <IconButton color="primary" onClick={() => handleEditClick(user.id)}>
                                                    <EditOutlined />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDeleteClick(user.id)}>
                                                    <DeleteOutline />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </StyledTable>
                        {employees.allUsers?.totalPages && (
                            <PaginationComponent
                                count={employees.allUsers.totalPages}
                                page={page}
                                handlePageChange={handlePageChange}
                            />
                        )}
                    </React.Fragment>
                </Box>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this employee?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </SimpleCard>
    );
}

export default TeamLeadEmployees;
