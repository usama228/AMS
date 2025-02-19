// import React, { useState, useEffect } from 'react';
// import { LoadingButton } from "@mui/lab";
// import {
//     Box, DialogActions, DialogContent, Stack,
//     Grid, TextField, Typography
// } from "@mui/material";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from 'react-redux';
// import { CREATEUSER, GETUSERBYROLE } from 'app/redux/actions/users';
// import { useAuth } from 'app/hooks/useAuth';
// import { SimpleCard, Breadcrumb } from 'app/components';
// import { useNavigate } from 'react-router-dom';
// import MenuItem from '@mui/material/MenuItem';
// import { PATH, ROLE } from '../../../config';
// import { createImageFromInitials } from 'app/assets/genericActions';
// import Loading from 'app/components/MatxLoading';
// import { Container, EDITROOT, SnackbarComponent } from 'app/assets';
// import { addImage } from 'app/redux/api';

// export default function AddUser(props) {
//     const [show, setShow] = useState(false);
//     const { handleClose } = props;
//     const dispatch = useDispatch();
//     let auth = useAuth();
//     const navigate = useNavigate();
    
//     // Dummy data for testing
//     const dummyUser = {
//         user_name: 'john_doe',
//         first_name: 'John',
//         last_name: 'Doe',
//         role: 'customer',
//         avatar: '',
//         phoneNumber: '123-456-7890',
//         email: 'john.doe@example.com',
//         user_of: '',
//         adminName: ''
//     };

//     const handleFormSubmit = (values) => {
//         const data = { ...values, avatar: file ? file : createImageFromInitials(`${values.first_name} ${values.last_name}`) };
//         dispatch(CREATEUSER(data, auth, moveToNext, failure));
//     };

//     function failure() {
//         setShow(true);
//     }

//     const moveToNext = (role) => {
//         navigate(PATH.USERS.replace(':role', role));
//     };

//     const initialValues = { ...dummyUser };

//     const validationSchema = Yup.object().shape({
//         user_name: Yup.string().required('User name is required'),
//         first_name: Yup.string().required('First name is required'),
//         last_name: Yup.string().required('Last name is required'),
//         serial_no: Yup.string().required('Serial number is required'),
//         role: Yup.string().required('Role is required'),
//         user_of: Yup.string().when('role', {
//             is: 'customer',
//             then: Yup.string().required('User of is required for customer role'),
//             otherwise: Yup.string().notRequired(),
//         }),
//         adminName: Yup.string().when('role', {
//             is: 'customer',
//             then: Yup.string().required('User of is required for customer role'),
//             otherwise: Yup.string().notRequired(),
//         }),
//         avatar: Yup.string().optional(),
//         phoneNumber: Yup.string().optional(),
//         email: Yup.string().email('Invalid email format').optional(),
//     });

//     const [file, setFile] = useState(null);
//     const uploadFile = (e) => {
//         let file_ = e.target.files[0];
//         if (file_) {
//             const formData = new FormData();
//             formData.append('avatar', file_);
//             addImage(formData).then(response => {
//                 if (response.data.succeeded) {
//                     setFile(response.data.data.path);
//                 }
//             }).catch(error => {
//                 console.error("Image upload failed:", error);
//             });
//         }
//     };

//     useEffect(() => {
//         dispatch(GETUSERBYROLE('admin', auth));
//     }, [auth, dispatch]);

//     return (
//         <Formik
//             onSubmit={handleFormSubmit}
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//         >
//             {(props) => {
//                 const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
//                 return (
//                     <UserForm
//                         uploadFile={uploadFile}
//                         show={show}
//                         setShow={setShow}
//                         handleClose={handleClose}
//                         setFieldValue={setFieldValue}
//                         values={values}
//                         errors={errors}
//                         touched={touched}
//                         handleChange={handleChange}
//                         handleBlur={handleBlur}
//                         handleSubmit={handleSubmit}
//                     />
//                 );
//             }}
//         </Formik>
//     );
// }

// function UserForm(props) {
//     let auth = useAuth();
//     const user = useSelector((state) => state.user);

//     const setAdminName = (id) => {
//         const foundObject = user?.userByRole?.find(obj => obj._id === id);
//         setFieldValue(`adminName`, foundObject.user_name);
//     };

//     const { uploadFile, show, handleClose, values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = props;
//     return (
//         <form onSubmit={handleSubmit}>
//             <Container>
//                 <Box className="breadcrumb">
//                     <Breadcrumb routeSegments={[{ name: "Customer", path: '/users/customer' }, { name: 'Add Customer' }]} />
//                 </Box>
//                 <Stack spacing={2}>
//                     <SimpleCard>
//                         {user.createLoading && <Loading />}
//                         {user.createFailure && user.createError && <SnackbarComponent show={show} message={user.createError} />}
//                         <DialogContent sx={{ padding: "0px !important" }}>
//                             <EDITROOT>
//                                 <Grid container spacing={2}>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             type="text"
//                                             name="user_name"
//                                             label="Username"
//                                             variant="outlined"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.user_name}
//                                             helperText={touched.user_name && errors.user_name}
//                                             error={Boolean(errors.user_name && touched.user_name)}
//                                             sx={{ mb: 3, mt: 3 }}
//                                             required />
//                                     </Grid>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             type="email"
//                                             name="email"
//                                             label="Email"
//                                             variant="outlined"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.email}
//                                             error={Boolean(errors.email && touched.email)}
//                                             helperText={touched.email && errors.email}
//                                             sx={{ mb: 3, mt: 3 }} />
//                                     </Grid>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             type="text"
//                                             name="first_name"
//                                             label="First Name"
//                                             variant="outlined"
//                                             onBlur={handleBlur}
//                                             value={values.first_name}
//                                             onChange={handleChange}
//                                             error={Boolean(errors.first_name && touched.first_name)}
//                                             helperText={touched.first_name && errors.first_name}
//                                             sx={{ mb: 3 }}
//                                             required />
//                                     </Grid>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             type="text"
//                                             name="last_name"
//                                             label="Last Name"
//                                             variant="outlined"
//                                             onBlur={handleBlur}
//                                             value={values.last_name}
//                                             onChange={handleChange}
//                                             error={Boolean(errors.last_name && touched.last_name)}
//                                             helperText={touched.last_name && errors.last_name}
//                                             sx={{ mb: 3 }}
//                                             required />
//                                     </Grid>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             type="number"
//                                             name="serial_no"
//                                             label="Serial Number"
//                                             variant="outlined"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.serial_no}
//                                             error={Boolean(errors.serial_no && touched.serial_no)}
//                                             helperText={touched.serial_no && errors.serial_no}
//                                             sx={{ mb: 3 }}
//                                             required />
//                                     </Grid>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             name="phoneNumber"
//                                             type="text"
//                                             label="Phone"
//                                             variant="outlined"
//                                             onBlur={handleBlur}
//                                             value={values.phoneNumber}
//                                             onChange={handleChange}
//                                             helperText={touched.phoneNumber && errors.phoneNumber}
//                                             error={Boolean(errors.phoneNumber && touched.phoneNumber)}
//                                             sx={{ mb: 3 }} />
//                                     </Grid>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             size="small"
//                                             select
//                                             name="role"
//                                             label="Role"
//                                             variant="outlined"
//                                             defaultValue="Admin"
//                                             fullWidth
//                                             onBlur={handleBlur}
//                                             value={values.role}
//                                             helperText={touched.role && errors.role}
//                                             error={Boolean(errors.role && touched.role)}
//                                             sx={{ mb: 3 }}
//                                             onChange={(e) => {
//                                                 handleChange(e);
//                                                 setAdminName(e.target.value);
//                                             }}>
//                                             {Object.keys(ROLE).map((key, index) => (
//                                                 <MenuItem key={index} value={ROLE[key]}>{ROLE[key]}</MenuItem>
//                                             ))}
//                                         </TextField>
//                                     </Grid>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             type="text"
//                                             name="user_of"
//                                             label="User Of"
//                                             variant="outlined"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.user_of}
//                                             helperText={touched.user_of && errors.user_of}
//                                             error={Boolean(errors.user_of && touched.user_of)}
//                                             sx={{ mb: 3 }} />
//                                     </Grid>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             type="text"
//                                             name="adminName"
//                                             label="Admin Name"
//                                             variant="outlined"
//                                             onBlur={handleBlur}
//                                             onChange={handleChange}
//                                             value={values.adminName}
//                                             helperText={touched.adminName && errors.adminName}
//                                             error={Boolean(errors.adminName && touched.adminName)}
//                                             sx={{ mb: 3 }} />
//                                     </Grid>
//                                     <Grid item lg={6} md={6} sm={12} xs={12}>
//                                         <TextField
//                                             type="file"
//                                             onChange={uploadFile}
//                                             sx={{ mb: 3 }} />
//                                     </Grid>
//                                 </Grid>
//                             </EDITROOT>
//                         </DialogContent>
//                         <DialogActions sx={{ mt: 2 }}>
//                             <LoadingButton type="submit" variant="contained" loading={user.createLoading}>
//                                 Submit
//                             </LoadingButton>
//                         </DialogActions>
//                     </SimpleCard>
//                 </Stack>
//             </Container>
//         </form>
//     );
// }
