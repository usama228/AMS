import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, Card, Grid, TextField, useTheme, MenuItem, Avatar, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik } from "formik";
import * as Yup from "yup";
import MatxLogo from "app/components/MatxLogo";
import { Paragraph, Span } from "app/components/Typography";
import { PATH } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER } from "app/redux/actions/users";
import { LoginRoot, Logo, SnackbarComponent } from "app/assets";
import { useState } from "react";
import { convertBase64, createImageFromInitials } from "app/assets/genericActions";

const roles = [
    { id: 'admin', value: "Admin" },
    { id: 'employee', value: "Employee" },
    { id: 'teamLead', value: "Team Lead" }
];

const initialValues = {
    name: "",
    phoneNumber: '',
    userType: "",
    avatar: "",
    email: "",
    password: "",
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Enter Name"),
    userType: Yup.string().required("Select Role"),
    avatar: Yup.string(),
    phoneNumber: Yup.string().matches(/^\d{11}$/, 'Phone number must be exactly 11 digits'),
    password: Yup.string()
        .min(8, "Password must be 8 characters long")
        .required("Password is required!"),
    email: Yup.string().email("Invalid Email address").required("Email is required!"),
});

export default function Register() {
    const [show, setShow] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const navigate = useNavigate();

    const { registerError, registerLoading } = useSelector((state) => state.user);

    const handleFormSubmit = (values) => {
        const avatar = values.avatar || createImageFromInitials(values.name);
        const data = { ...values, avatar };
        dispatch(REGISTER(data, registerSuccessfully, handleError));
    };

    const registerSuccessfully = () => {
        setShow(false);
        navigate(state?.from || PATH.LOGIN);
    };

    const handleError = (error) => {
        setShow(true);
    };

    const [file, setFile] = useState(null);
    const uploadFile = (e) => {
        let file_ = e.target.files[0];
        if (file_) {
            convertBase64(file_).then((base64File) => {
                setFile(base64File);
            });
        }
    };

    return (
        <LoginRoot>
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <div className="cardLeft">
                            <Logo>
                                <MatxLogo /> <span>MatX Pro</span>
                            </Logo>
                            <h1 className="mainTitle">Admin Dashboard</h1>
                            <div className="features">
                                <div className="item">JWT, Firebase & Auth0 Authentication</div>
                                <div className="item">Clean & Organized Code</div>
                                <div className="item">Limitless Pages & Components</div>
                            </div>
                            <Span flexGrow={1}></Span>
                            <a href="https://ui-lib.com/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/images/logos/ui-lib.png" alt="UI Lib Logo" />
                            </a>
                        </div>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        {show && registerError && (
                            <SnackbarComponent show={show} message={registerError} />
                        )}
                        <Box p={4}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleFormSubmit}
                            >
                                {(props) => {
                                    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = props;

                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <label htmlFor="upload">
                                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                                        <Avatar src={file} style={{ width: "125px", height: "125px" }} />
                                                    </IconButton>
                                                </label>
                                            </div>
                                            <input
                                                type="file"
                                                name="avatar"
                                                onChange={uploadFile}
                                                id="upload"
                                                accept="image/*"
                                                style={{ display: "none" }}
                                            />

                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="text"
                                                name="name"
                                                label="Name"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                helperText={touched.name && errors.name}
                                                error={Boolean(errors.name && touched.name)}
                                                sx={{ mb: 3, mt: 3 }}
                                                required
                                            />

                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="email"
                                                name="email"
                                                label="Email"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.email}
                                                onChange={handleChange}
                                                helperText={touched.email && errors.email}
                                                error={Boolean(errors.email && touched.email)}
                                                sx={{ mb: 3 }}
                                                required
                                            />

                                            <TextField
                                                fullWidth
                                                size="small"
                                                type="password"
                                                name="password"
                                                label="Password"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.password}
                                                onChange={handleChange}
                                                helperText={touched.password && errors.password}
                                                error={Boolean(errors.password && touched.password)}
                                                sx={{ mb: 3 }}
                                                required
                                            />

                                            <TextField
                                                fullWidth
                                                size="small"
                                                select
                                                name="userType"
                                                label="Role"
                                                variant="outlined"
                                                onBlur={handleBlur}
                                                value={values.userType}
                                                onChange={handleChange}
                                                helperText={touched.userType && errors.userType}
                                                error={Boolean(errors.userType && touched.userType)}
                                                sx={{ mb: 3 }}
                                                required
                                            >
                                                {roles.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.value}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <LoadingButton
                                                type="submit"
                                                color="primary"
                                                loading={registerLoading}
                                                variant="contained"
                                                sx={{ my: 2 }}
                                            >
                                                Register
                                            </LoadingButton>

                                            <Paragraph>
                                                Already have an account?
                                                <NavLink
                                                    to={PATH.LOGIN}
                                                    style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                                                >
                                                    Login
                                                </NavLink>
                                            </Paragraph>
                                        </form>
                                    );
                                }}
                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </LoginRoot>
    );
}
