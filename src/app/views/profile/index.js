import React, { useState } from 'react';
import { Avatar, Box, Button, Grid, Stack } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addImage } from 'app/redux/api';
import { TextField1 } from 'app/assets';
import { useAuth } from 'app/hooks/useAuth';
import PasswordChangeDialog from 'app/assets/genericComponents/PasswordChangeDialog.';

const profileValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    cnic: Yup.string()
        .length(13, 'CNIC must be exactly 13 digits')
        .matches(/^\d{13}$/, 'CNIC must contain only digits')
        .required('CNIC is required'),
    phone: Yup.string()
        .length(11, 'Mobile number must be exactly 11 digits')
        .matches(/^\d{11}$/, 'Mobile number must contain only digits')
        .required('Mobile number is required'),
    avatar: Yup.string().nullable().required('Avatar is required'),
    cnic_front: Yup.string().nullable(),
    cnic_back: Yup.string().nullable(),
});



const Profile = () => {
    const auth = useAuth();
    const [cnicFrontPreview, setCnicFrontPreview] = useState(null);
    const [cnicBackPreview, setCnicBackPreview] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);


    const handleSubmit = async (values) => {
        // dispatch(updateCurrentUser(values, auth, moveToNext, moveToNext));
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


    const handleDialogOpen = () => {
        setDialogOpen(true);
    };



    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <SimpleCard>
            <Box sx={{ p: 3 }}>
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "Profile" }]} />
                </Box>
                <Formik
                    initialValues={auth}
                    validationSchema={profileValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik_props) => {
                        const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = formik_props;
                        return (
                            <Box component="form" onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: '20px' }}>
                                            <label htmlFor="avatar-upload">
                                                <Avatar
                                                    sx={{ width: 100, height: 100, cursor: 'pointer' }}
                                                    src={values.avatar}
                                                />
                                                <input
                                                    id="avatar-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={(event) => uploadFile(event, setFieldValue, 'avatar')}
                                                />
                                            </label>
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                                            <Button variant="outlined" onClick={handleDialogOpen}>
                                                Change Password
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField1
                                                name="name"
                                                label="Name"
                                                value={values.name}
                                                onChange={handleChange}
                                                error={Boolean(touched.name && errors.name)}
                                                helperText={touched.name && errors.name}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField1
                                                name="email"
                                                label="Email"
                                                value={values.email}
                                                onChange={handleChange}
                                                error={Boolean(touched.email && errors.email)}
                                                helperText={touched.email && errors.email}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField1
                                                name="cnic"
                                                label="CNIC"
                                                value={values.cnic}
                                                onChange={handleChange}
                                                error={Boolean(touched.cnic && errors.cnic)}
                                                helperText={touched.cnic && errors.cnic}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField1
                                                name="phone"
                                                label="Phone"
                                                value={values.phone}
                                                onChange={handleChange}
                                                error={Boolean(touched.phone && errors.phone)}
                                                helperText={touched.phone && errors.phone}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                <strong>Joining Date:</strong> {new Date(values.joiningDate).toLocaleDateString()}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box>
                                                <strong>Status:</strong> {values.status}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Box>
                                                <strong>Is Team Lead:</strong> {values.isTeamLead ? 'Yes' : 'No'}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6} container direction="column" alignItems="start">
                                            {cnicFrontPreview && (
                                                <img
                                                    src={cnicFrontPreview}
                                                    alt="CNIC Front Preview"
                                                    style={{ width: '100px', height: '50px', marginBottom: '10px', marginLeft: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                                                />
                                            )}
                                            <Button variant="outlined" component="label">
                                                Upload CNIC Front
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
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
                                            <Button variant="outlined" component="label">
                                                Upload CNIC Back
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(event) => uploadFile(event, setFieldValue, 'cnic_back', setCnicBackPreview)} />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                            >
                                                Update
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Box>
                        );
                    }}
                </Formik>
            </Box>

            <PasswordChangeDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
            />
        </SimpleCard>
    );
};

export default Profile;
