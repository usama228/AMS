import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GETALLUSERS, GETUSERSBYTEAMLEAD } from 'app/redux/actions';
import {
    CHECKINUSER,
    EDITATTENDANCEBYUSER,
    GETATTENDANCEDETAILBYID,
} from 'app/redux/actions/checkin/attendanceActions';
import {
    Button, Grid, Box, TextField, Typography,
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useAuth } from 'app/hooks/useAuth';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { renderTimeViewClock } from '@mui/x-date-pickers';
import { ErrorMessage, TextField1 } from 'app/assets';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '../../../config';
import dayjs from 'dayjs';
import Loading from 'app/components/MatxLoading';

function CreateTeamCheck() {
    const dispatch = useDispatch();
    const auth = useAuth();
    const navigate = useNavigate();
    const param = useParams();

    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [initialValues, setInitialValues] = useState({
        userId: '',
        checkIn: dayjs().hour(10).minute(0),
        checkOut: dayjs().hour(19).minute(0),
        breakTime: 60,
        notes: ''
    });

    const employees = useSelector(state => state.user);

    const validationSchema = Yup.object({
        userId: Yup.string().required('Employee is required'),
        checkIn: Yup.date().required('Check-In Time is required'),
        checkOut: Yup.date()
            .required('Check-Out Time is required')
            .min(Yup.ref('checkIn'), 'Check-Out Time must be after Check-In Time'),
        breakTime: Yup.number().required('Break time is required').min(0, 'Break time cannot be negative'),
        notes: Yup.string().trim().required('Notes cannot be empty'),
    });

    useEffect(() => {
        if (auth.userType === 'admin') {
            dispatch(GETALLUSERS({ page: 1, limit: 1000000 }, auth));
        }
        else {
            if (auth.isTeamLead) {
                dispatch(GETUSERSBYTEAMLEAD(auth.id, { page: 1, limit: 1000000 }));
            }

        }
    }, [dispatch, auth]);



    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setError('');
    };

    const onFailure = (msg) => {
        console.error("Submission Error:", msg);
        setSnackbarOpen(true);
        setError(msg);
    };

    const moveToNext = (data) => {
        console.log("Fetched Data: ", data);
        setInitialValues({
            ...data,
            userId: data.userId,
            checkIn: dayjs(data.checkIn),
            checkOut: dayjs(data.checkOut),
            breakTime: data.breakTime,
            notes: data.notes,
        });
    };

    const moveToNextOnSubmit = () => {
        navigate(PATH.ALLTEAMCHECKS);
    };

    useEffect(() => {
        if (param.id !== 'new') {
            dispatch(GETATTENDANCEDETAILBYID(param.id, moveToNext, onFailure));
        }
    }, [param.id, dispatch]);

    const handleCheckInSubmit = (values) => {
        const checkInData = {
            ...values,
            userId: values.userId,
            checkIn: values.checkIn,
            checkOut: values.checkOut,
            notes: values.notes,
            breakTime: values.breakTime,
        };
        if (param.id !== 'new') {
            console.log("checkInData", checkInData);
            dispatch(EDITATTENDANCEBYUSER(checkInData, auth, moveToNextOnSubmit, onFailure));
        } else {
            dispatch(CHECKINUSER(checkInData, auth, moveToNextOnSubmit, onFailure));
        }
    };

    if (!initialValues) return <Loading />;

    return (
        <SimpleCard>
            <Box>
                <Breadcrumb routeSegments={[{ name: "Create Check" }]} />
            </Box>
            <Box padding={2}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleCheckInSubmit}
                    enableReinitialize
                >
                    {(formik_props) => {
                        const { values, setFieldValue, handleSubmit, handleBlur, errors, touched } = formik_props;
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        {(auth.userType === 'employee' && auth.isTeamLead) && (
                                            <TextField1
                                                fullWidth
                                                select
                                                label="Employees"
                                                name="userId"
                                                value={values.userId}
                                                onChange={(e) => setFieldValue('userId', e.target.value)}
                                                onBlur={handleBlur}
                                                SelectProps={{ native: true }}
                                                error={Boolean(touched.userId && errors.userId)}
                                                helperText={touched.userId && errors.userId}
                                            >
                                                <option value="" disabled></option>
                                                {employees?.allUsers?.users?.map((employee) => (
                                                    <option key={employee.id} value={employee.id}>
                                                        {employee.name}
                                                    </option>
                                                ))}
                                            </TextField1>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} marginTop={2}>
                                    <Grid item xs={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                label="Check In Time"
                                                closeOnSelect={false}
                                                maxDate={dayjs().startOf('day')}
                                                value={values.checkIn}
                                                onChange={(newValue) => setFieldValue('checkIn', newValue)}
                                                onBlur={handleBlur}
                                                renderInput={(params) => <TextField {...params} />}
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                }}
                                            />
                                        </LocalizationProvider>
                                        {touched.checkIn && errors.checkIn && (
                                            <Typography color="error">{errors.checkIn}</Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={3}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateTimePicker
                                                label="Check Out Time"
                                                closeOnSelect={false}
                                                maxDate={dayjs().startOf('day')}
                                                value={values.checkOut}
                                                onChange={(newValue) => setFieldValue('checkOut', newValue)}
                                                onBlur={handleBlur}
                                                renderInput={(params) => <TextField {...params} />}
                                                views={['year', 'month', 'day', 'hours', 'minutes']}
                                                viewRenderers={{
                                                    hours: renderTimeViewClock,
                                                    minutes: renderTimeViewClock,
                                                }}
                                            />
                                        </LocalizationProvider>
                                        {touched.checkOut && errors.checkOut && (
                                            <Typography color="error">{errors.checkOut}</Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField1
                                            label="Break Time (minutes)"
                                            type="number"
                                            name="breakTime"
                                            value={values.breakTime}
                                            onChange={(e) => setFieldValue('breakTime', Math.max(0, parseInt(e.target.value) || 0))}
                                            onBlur={handleBlur}
                                            fullWidth
                                            inputProps={{ min: 0 }}
                                            error={Boolean(touched.breakTime && errors.breakTime)}
                                            helperText={touched.breakTime && errors.breakTime}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} marginTop={2}>
                                    <TextField1
                                        label="Notes"
                                        name="notes"
                                        multiline
                                        rows={4}
                                        value={values.notes}
                                        onChange={(e) => setFieldValue('notes', e.target.value)}
                                        onBlur={handleBlur}
                                        fullWidth
                                        error={Boolean(touched.notes && errors.notes)}
                                        helperText={touched.notes && errors.notes}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {(employees.updateLoading === true || employees.createLoading === true) ? (
                                        <Loading />
                                    ) : (
                                        <Button type="submit" variant="contained">
                                            {param.id === 'new' ? 'Create' : 'Update'}
                                        </Button>
                                    )}
                                </Grid>
                            </Form>
                        );
                    }}
                </Formik>
                <ErrorMessage
                    snackbarOpen={snackbarOpen}
                    handleSnackbarClose={handleSnackbarClose}
                    message={error}
                />
            </Box>
        </SimpleCard>
    );
}

export default CreateTeamCheck;
