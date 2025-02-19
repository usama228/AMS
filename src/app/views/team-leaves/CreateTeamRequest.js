import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EDITLEAVEREQUEST, GETALLUSERS, GETUSERLEAVES, GETUSERSBYTEAMLEAD, REQUESTLEAVE } from 'app/redux/actions';
import { Box, Button, Grid, Typography } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { addImage } from 'app/redux/api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useAuth } from 'app/hooks/useAuth';
import { ErrorMessage, TextField1 } from 'app/assets';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Loading from 'app/components/MatxLoading';
import { useNavigate, useParams } from 'react-router-dom';
import {  PATH } from '../../../config';
import dayjs from 'dayjs';

const CreateTeamRequest = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const param = useParams();
  const navigate = useNavigate();
  const employees = useSelector(state => state.user);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');

  const [initialValues, setInitialValues] = useState({
    userId: '',
    startDate: null,
    endDate: null,
    leaveType: '',
    document: null,
    reason: ''
  });

  // Validation Schema
  const validationSchema = Yup.object({
    userId: Yup.string().required('Employee is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date()
      .required('End Date is required')
      .min(Yup.ref('startDate'), 'End Date must be after Start Date'),
    leaveType: Yup.string().required('Leave Type is required'),
    document: Yup.string().nullable().default(null),
    reason: Yup.string().trim().required('Reason cannot be empty'),
  });

  useEffect(() => {
    if (param.id !== 'new') {
      dispatch(GETUSERLEAVES(param.id, moveToNext, onFailure));
    }
    if (auth.userType === 'admin') {
      dispatch(GETALLUSERS({ page: 1, limit: 1000000 }, auth));
    } else if (auth.isTeamLead) {
      dispatch(GETUSERSBYTEAMLEAD(auth.id, { page: 1, limit: 1000000 }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id, dispatch]);

  const moveToNext = (data) => {
    setInitialValues({
      ...data,
      startDate: dayjs(data.startDate),
      endDate: dayjs(data.endDate),
    });
  };

  const moveToNextOnSubmit = () => {
    navigate(PATH.ALLTEAMREQUESTS);
  };

  const onFailure = (msg) => {
    setSnackbarOpen(true);
    setError(msg);
  };

  const handleLeaveSubmit = (values) => {
    const leaveData = {
      ...values,
      id: values.id,
      userId: values.userId,
      startDate: values.startDate,
      endDate: values.endDate,
      leaveType: values.leaveType,
      document: values.document,
      reason: values.reason,
    };
    if (param.id !== 'new') {
      dispatch(EDITLEAVEREQUEST(leaveData, moveToNextOnSubmit, onFailure));
    } else {
      dispatch(REQUESTLEAVE(leaveData, moveToNextOnSubmit, onFailure));
    }
  };

  const uploadFile = (e, setFieldValue, fieldName, setPreview) => {
    const file_ = e.target.files[0];
    if (file_) {
      const formData = new FormData();
      formData.append('avatar', file_);
      addImage(formData).then((response) => {
        if (response.data.succeeded === true) {
          setFieldValue(fieldName, response.data.data.path);
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(file_);
        }
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError('');
  };

  if (!initialValues) return <Loading />;

  return (
    <SimpleCard>
      <Box>
        <Breadcrumb routeSegments={[{ name: 'Create Leave Request' }]} />
      </Box>
      <Box padding={2}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLeaveSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, handleChange, handleSubmit, handleBlur, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {(auth.userType === 'employee' && auth.isTeamLead) && (
                    <TextField1
                      fullWidth
                      select
                      name="userId"
                      value={values.userId}
                      SelectProps={{ native: true }}
                      onChange={(e) => setFieldValue('userId', e.target.value)}
                    >
                      <option value="" disabled>Select Employee</option>
                      {employees?.allUsers?.users.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                    </TextField1>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100% " }}
                      label="Start Leave Date"
                      value={values.startDate}
                      onChange={(newValue) => setFieldValue('startDate', newValue)}
                    />
                  </LocalizationProvider>
                  {touched.startDate && errors.startDate && (
                    <Typography color="error">{errors.startDate}</Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100% " }}
                      label="End Leave Date"
                      value={values.endDate}
                      onChange={(newValue) => setFieldValue('endDate', newValue)}
                    />
                  </LocalizationProvider>
                  {touched.endDate && errors.endDate && (
                    <Typography color="error">{errors.endDate}</Typography>
                  )}
                </Grid>

                <Grid item xs={6}>
                  <TextField1
                    fullWidth
                    name="leaveType"
                    label="Leave Type"
                    select
                    SelectProps={{ native: true }}
                    value={values.leaveType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.leaveType && errors.leaveType)}
                    helperText={touched.leaveType && errors.leaveType}
                  >
                    <option value="" disabled></option>
                    <option value="sick">Sick</option>
                    <option value="casual">Casual</option>
                    <option value="urgent">Urgent</option>
                  </TextField1>
                </Grid>

                <Grid item xs={12} container direction="column" alignItems="start">
                  {documentPreview && (
                    <img
                      src={documentPreview}
                      alt="Document Preview"
                      style={{ width: '100px', height: '80px', marginBottom: '10px', marginLeft: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                  )}
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<AttachFileIcon />}

                  >
                    Upload Document
                    <input
                      name="document"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(event) => uploadFile(event, setFieldValue, 'document', setDocumentPreview)}
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <TextField1
                    label="Reason"
                    name="reason"
                    multiline
                    rows={4}
                    value={values.reason}
                    onChange={(e) => setFieldValue('reason', e.target.value)}
                    onBlur={handleBlur}
                    fullWidth
                    error={Boolean(touched.reason && errors.reason)}
                    helperText={touched.reason && errors.reason}
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
              </Grid>
            </Form>
          )}
        </Formik>
        <ErrorMessage
          snackbarOpen={snackbarOpen}
          handleSnackbarClose={handleSnackbarClose}
          message={error}
        />
      </Box>
    </SimpleCard>
  );
};

export default CreateTeamRequest;
