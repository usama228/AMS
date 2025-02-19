import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Grid,

} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GETALLUSERS, REMOVEUSER } from 'app/redux/actions';
import { useAuth } from 'app/hooks/useAuth';
import Loading from 'app/components/MatxLoading';
import Avatar from 'react-avatar';
import { PAGE_LIMIT, PATH, STATUSFILTER } from '../../../config';
import { PaginationComponent, ResponsiveDeleteConfirmationDialog, SnackbarComponent, StyledTable, TextField1 } from 'app/assets';
import { ROLE, TEAMLEADFILTER } from '../../../config';

const AllEmployees = () => {
    const employees = useSelector(state => state.user);
    const auth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [userType, setUserType] = useState('');
    const [isTeamLead, setIsTeamLead] = useState('');
    const [status, setStatus] = useState('active');

    useEffect(() => {
        dispatch(GETALLUSERS({
            page,
            limit: PAGE_LIMIT,
            userType,
            searchValue,
            isTeamLead,
            status
        }, auth, onError));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, auth, page]);

    const handlePageChange = (value) => {
        setPage(value);
    };


    const onBlurSearchFields = (name, value) => {
        if (name === 'byName') {
            dispatch(GETALLUSERS({
                page: page,
                limit: PAGE_LIMIT,
                userType: userType,
                searchValue: value,
                isTeamLead: isTeamLead,
                status: status
            }, auth, onError));
        } else if (name === 'byuserType') {
            dispatch(GETALLUSERS({
                page: page,
                limit: PAGE_LIMIT,
                userType: value,
                searchValue: searchValue,
                isTeamLead: isTeamLead,
                status: status
            }, auth, onError));
        } else if (name === 'byteamLead') {
            dispatch(GETALLUSERS({
                page: page,
                limit: PAGE_LIMIT,
                userType: userType,
                searchValue: searchValue,
                isTeamLead: value,
                status: status
            }, auth, onError));
        }
        else {
            dispatch(GETALLUSERS({
                page: page,
                limit: PAGE_LIMIT,
                userType: userType,
                searchValue: searchValue,
                isTeamLead: isTeamLead,
                status: value
            }, auth, onError));
        }
    }

    const onError = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
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

    const handleEditClick = (id) => {
        navigate(PATH.CREATEEMPLOYEE.replace(":id", id));
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setEmployeeToDelete(null);
    };

    return (
        <SimpleCard>
            <Box>
                <Breadcrumb routeSegments={[{ name: 'All Employees' }]} />
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
                            setSearchValue(e.target.value)
                            onBlurSearchFields(e.target.name, e.target.value)
                        }}
                        sx={{ margin: "10px" }} />
                </Grid>
                <Grid item xs={3}>
                    <TextField1
                        select
                        name='byuserType'
                        size="small"
                        label="Search by Role"
                        SelectProps={{ native: true }}
                        value={userType}
                        onChange={(e) => {
                            setUserType(e.target.value);
                            onBlurSearchFields(e.target.name, e.target.value);
                        }}
                        sx={{ margin: "10px" }}
                    >
                        <option value="" disabled selected></option>
                        {ROLE.map((role) => (

                            <option key={role.id} value={role.id}>
                                {role.value}
                            </option>
                        ))}
                    </TextField1>
                </Grid>
                <Grid item xs={3}>
                    <TextField1
                        select
                        name="byteamLead"
                        size="small"
                        label="Search by Team Lead"
                        value={isTeamLead}
                        SelectProps={{ native: true }}
                        onChange={(e) => {
                            setIsTeamLead(e.target.value);
                            onBlurSearchFields(e.target.name, e.target.value);
                        }}
                        sx={{ margin: "10px" }}
                    >
                        <option value="" disabled selected></option>
                        {TEAMLEADFILTER.map((lead) => {
                            return (
                                <option key={lead.id} value={lead.id}>
                                    {lead.name}
                                </option>
                            );
                        })}
                    </TextField1>
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
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
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
                    {employees.allUsers?.users.length <= 0 ? (
                        <span>No User</span>
                    ) : (
                        <React.Fragment>
                            <StyledTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Profile</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Joining Date</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Role</TableCell>
                                        <TableCell align="center">CNIC</TableCell>
                                        <TableCell align="center">Team Lead</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {employees.allUsers.users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell align="center">
                                                <Avatar alt="Remy Sharp" src={user.avatar} />
                                            </TableCell>
                                            <TableCell align="center">{user.name}</TableCell>
                                            <TableCell align="center">{user.email}</TableCell>
                                            <TableCell align="center">{new Date(user.joiningDate).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">{user.status}</TableCell>
                                            <TableCell align="center">{user.userType}</TableCell>
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
                                    ))}
                                </TableBody>
                            </StyledTable>
                            {employees.allUsers.totalPages && (
                                <PaginationComponent
                                    count={employees.allUsers.totalPages}
                                    page={page}
                                    handlePageChange={handlePageChange}
                                />
                            )}
                        </React.Fragment>
                    )}
                </Box>
            )}
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
};

export default AllEmployees;
