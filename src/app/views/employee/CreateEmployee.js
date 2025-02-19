import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Avatar,

} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { CREATEUSER, GETALLUSERS, GETUSER, UPDATEUSER } from 'app/redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Breadcrumb, SimpleCard } from 'app/components';
import { ErrorMessage, TextField1 } from 'app/assets';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addImage } from 'app/redux/api';
import { REQUEST, USER_REQUEST } from 'app/redux/actions/utilities';
import { PATH } from '../../../config';
import Loading from 'app/components/MatxLoading';
import { createImageFromInitials } from 'app/assets/genericActions';
import { useAuth } from 'app/hooks/useAuth';
import PasswordChangeDialog from 'app/assets/genericComponents/PasswordChangeDialog.';

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const navigate = useNavigate();
  const param = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');
  const [initialValues, setInitialValues] = useState(null);
  const [cnicFrontPreview, setCnicFrontPreview] = useState(null);
  const [cnicBackPreview, setCnicBackPreview] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const employees = useSelector(state => state.user);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    joiningDate: Yup.date()
      .required('Joining date is required')
      .nullable()
      .transform(value => (value === '' ? null : value)),
    isTeamLead: Yup.boolean().required().default(true),
    teamLeadId: Yup.number().nullable().when('isTeamLead', {
      is: false,
      then: Yup.number(),
    }),
    cnic: Yup.string()
      .length(13, 'CNIC must be exactly 13 digits')
      .matches(/^\d{13}$/, 'CNIC must contain only digits')
      .required('CNIC is required'),
    phone: Yup.string()
      .length(11, 'Mobile number must be exactly 11 digits')
      .matches(/^\d{11}$/, 'Mobile number must contain only digits')
      .required('Mobile number is required'),
    status: Yup.string().required('Status is required'),
    userType: Yup.string().required('User type is required').default('employee'),
    isTerminated: Yup.boolean(),
    avatar: Yup.string().nullable(),
    cnic_front: Yup.string().nullable().default(null),
    cnic_back: Yup.string().nullable().default(null),
    terminatedDate: Yup.date()
      .nullable()
      .when('isTerminated', {
        is: true,
        then: Yup.date()
          .required('Termination date is required')
          .min(Yup.ref('joiningDate'), 'Termination date cannot be before joining date'),
      }),
  });

  const moveToNext = (data) => {
    setInitialValues({
      ...data,
      joiningDate: data.joiningDate ? new Date(data.joiningDate).toISOString().split('T')[0] : '',
      terminatedDate: data.terminatedDate ? new Date(data.terminatedDate).toISOString().split('T')[0] : '',
    });
  };

  const onFailure = (msg) => {
    setSnackbarOpen(true)
    setError(msg);
  };

  useEffect(() => {
    dispatch(REQUEST(USER_REQUEST.RESET_USER_DATA));
    setInitialValues(null);
    if (param.id !== 'new') {
      dispatch(GETUSER(param.id, moveToNext, onFailure));
    } else {
      setInitialValues({
        name: '',
        email: '',
        joiningDate: '',
        status: '',
        isTerminated: false,
        avatar: null,
        cnic: '',
        phone: '',
        teamLeadId: auth.isTeamLead ? auth.id : null,
        terminatedDate: null,
        cnic_front: null,
        cnic_back: null,
        isTeamLead: auth.isTeamLead ? false : true,
        userType: 'employee',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id, dispatch]);

  useEffect(() => {
    dispatch(GETALLUSERS({
      page: 1,
      limit: 1000000,
      isTeamLead: true,
    }, auth, dispatch));
  }, [auth, dispatch]);

  const moveToNextOnSubmit = () => {
    if (auth.userType === 'admin') {
      navigate(PATH.ALLEMPLOYEES);
    } else {
      navigate(PATH.TEAMLEADEMPLOYEES);
    }

  };

  const handleSubmit = async (values) => {
    const userData = {
      ...values,
      avatar: values?.avatar ? values.avatar : createImageFromInitials(values.name),
      userType: values.userType,
      teamLeadId: values.teamLeadId,
    };
    if (param.id !== 'new') {
      dispatch(UPDATEUSER(userData, moveToNextOnSubmit, onFailure));
    } else {
      dispatch(CREATEUSER(userData, moveToNextOnSubmit, onFailure));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError('');
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
            if (setPreview) {
              setPreview(reader.result);
            }
          };
          reader.readAsDataURL(file_);
        }
      });
    }
  };



  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  if (!initialValues) return <Loading />;
  return (
    <SimpleCard>
      <Box>
        <Breadcrumb routeSegments={[{ name: param.id === 'new' ? 'Create Employee' : 'Edit Employee' }]} />
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(formikProps) => {
          const { values, handleChange, handleSubmit, handleBlur, setFieldValue, errors, touched } = formikProps;
          return (
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                  <label htmlFor="avatar-upload">
                    <Avatar
                      sx={{ width: 100, height: 100, cursor: 'pointer' }}
                      src={values?.avatar ? values.avatar : undefined}
                    />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(event) => uploadFile(event, setFieldValue, 'avatar')}
                    />
                  </label>
                  {touched.avatar && errors.avatar && (
                    <div style={{ color: 'red', marginTop: '8px' }}>{errors.avatar}</div>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                {param.id !== 'new' && (
                  <Button type="button" variant="outlined" onClick={handleOpenDialog} sx={{ marginBottom: "20px" }}>
                    Change Password
                  </Button>
                )}
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField1
                    fullWidth
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField1
                    fullWidth
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField1
                    fullWidth
                    name="cnic"
                    label="CNIC Number"
                    value={values.cnic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.cnic && errors.cnic)}
                    helperText={touched.cnic && errors.cnic}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField1
                    fullWidth
                    name="phone"
                    label="Mobile Number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField1
                    fullWidth
                    name="joiningDate"
                    label="Joining Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={values.joiningDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.joiningDate && errors.joiningDate)}
                    helperText={touched.joiningDate && errors.joiningDate}

                  />
                </Grid>


                <Grid item xs={12} sm={6}>
                  <TextField1
                    fullWidth
                    name="status"
                    label="Status"
                    select
                    SelectProps={{ native: true }}
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.status && errors.status)}
                    helperText={touched.status && errors.status}
                  >
                    <option value="" disabled></option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </TextField1>
                </Grid>
                {param.id !== 'new'
                  && <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Checkbox name="isTerminated" checked={values.isTerminated} onChange={handleChange} />}
                      label="Is Terminated"
                    />
                  </Grid>}

                {formikProps.values.isTerminated === true
                  && <Grid item xs={12} sm={6}>
                    <TextField1
                      fullWidth
                      name="terminatedDate"
                      label="Termination Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={values.terminatedDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.terminatedDate && errors.terminatedDate)}
                      helperText={touched.terminatedDate && errors.terminatedDate}
                    />
                  </Grid>}

                {auth.userType === 'admin'
                  &&
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={<Checkbox name="isTeamLead" checked={values.isTeamLead} onChange={handleChange} />}
                      label="Is Team Lead"
                    />
                  </Grid>
                }

                {
                  auth.userType === 'admin'
                  &&
                  formikProps.values.isTeamLead === false &&
                  <Grid item xs={12} sm={6}>
                    <TextField1
                      fullWidth
                      select
                      name="teamLeadId"
                      label="Team Leads"
                      SelectProps={{ native: true }}
                      value={values.teamLeadId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.teamLeadId && errors.teamLeadId)}
                      helperText={touched.teamLeadId && errors.teamLeadId}
                    >
                      <option value="" disabled selected>

                      </option>
                      {employees?.allUsers?.users?.length > 0 ? (
                        employees.allUsers.users.map((teamLead, index) => {
                          return (
                            <option key={index} value={teamLead.id}>
                              {teamLead.name}
                            </option>
                          );
                        })
                      ) : (
                        <option disabled>No team leads available</option>
                      )}

                    </TextField1>
                  </Grid>
                }

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} container direction="column" alignItems="start">
                    {cnicFrontPreview && (
                      <img
                        src={cnicFrontPreview}
                        alt="CNIC Front Preview"
                        style={{ width: '100px', height: '50px', marginBottom: '10px', marginLeft: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                      />
                    )}
                    <Button component="label" variant="outlined" startIcon={<AttachFileIcon />} sx={{ marginLeft: '20px' }}>
                      Upload CNIC Front
                      <input
                        name="cnic_front"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) => uploadFile(event, setFieldValue, 'cnic_front', setCnicFrontPreview)}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} container direction="column" alignItems="start">
                    {cnicBackPreview && (
                      <img
                        src={cnicBackPreview}
                        alt="CNIC Back Preview"
                        style={{ width: '100px', height: '50px', marginBottom: '10px', marginLeft: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                      />
                    )}
                    <Button component="label" variant="outlined" startIcon={<AttachFileIcon />} sx={{ marginLeft: '20px' }}>
                      Upload CNIC Back
                      <input
                        name="cnic_back"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) => uploadFile(event, setFieldValue, 'cnic_back', setCnicBackPreview)}
                      />
                    </Button>
                  </Grid>
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
            </Box>
          );
        }}
      </Formik>
      <PasswordChangeDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
      <ErrorMessage
        snackbarOpen={snackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
        message={error}
      />

    </SimpleCard>
  );
};

export default CreateEmployee;
