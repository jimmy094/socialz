import { useState } from 'react'
import { Box, Button, TextField, UseMediaQuery, Typography, useTheme, useMediaQuery } from "@mui/material";
import { EditOutlinedIcon } from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from "state";
import DropZone from "react-dropzone";
import FlexBetween from 'components/FlexBetween';
import { AudioFileSharp } from '@mui/icons-material';
import { color } from '@mui/system';

//validate inputs by requiring inputs and errors if invalid
const registerSchema = yup.Object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Ivalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),

})

const loginSchema = yup.object().shape({
    email: yup.string().email("Ivalid email").required("required"),
    password: yup.string().required("required"),
});

const initalValueRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
};



const Form = () => {

const [pageType, setPageType] = useState("login");
const { palette } = useTheme();
const dispatch = useDispatch();
const navigate = useNavigate();
const isNonMobile = useMediaQuery("(min-width:600px)");
const isLogin = pageType === "login";
const isRegister = pageType === "register";

const handleFormSubmit = async(values, onSubmitProps) => {};

   
  return (
    <Formik
    onSubmit={handleFormSubmit}
    initialValues={isLogin ? initialValuesLogin : initalValueRegister}
    validationSchema={isLogin? loginSchema : registerSchema}
    >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            resetForm
        }) => (
            <form onSubmit={handleSubmit}>
                <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div" : {gridColumn: isNonMobile ? undefined: "span 4"},
                }}
                >
                    {isRegister && (
                        <>
                            <TextField
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                            sx={{ gridColumn: "span 2"}} 
                            />

                            <TextField
                            label="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 2"}} 
                            />

                            <TextField
                            label="Location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.location}
                            name="location"
                            error={Boolean(touched.location) && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                            sx={{ gridColumn: "span 4"}} 
                            />    

                             <TextField
                            label="Occupation"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.occupation}
                            name="occupation"
                            error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                            helperText={touched.occupation && errors.occupation}
                            sx={{ gridColumn: "span 4"}} 
                            />

                            <Box 
                            gridColumn="span 4"
                            border={`1px solid ${palette.nuetral.medium}`}
                            borderRadius="5px"
                            p="1rem"
                            >
                            
                                <DropZone
                                 acceptedFiles=".jpg,.jpeg,.png"
                                 multiple={false}
                                 onDrop={(acceptedFiles) => 
                                    setFieldValue("picture", acceptedFiles[0])
                                }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        sx={{ "&:hover": { cursor: "pointer" }}}
                                        >
                                            <input {...getInputProps()} />
                                            
                                        </Box>
                                    )}

                                </DropZone>

                            
                            </Box>        
                        </>
                    )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4"}} 
                        />

                        <TextField
                            label="Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4"}} 
                        />                  

                </Box>

                {/* BUTTONS */}
                <Box>
                    <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: "2rem 0",
                            p: "1 rem",
                            backgroundColor: palette.primary.main,
                            color: palette.background.alt,
                            "&:hover": { color: palette.primary.main }
                        }}
                    >
                        {isLogin ? "LOGIN": "REGISTER"}
                    </Button>

                    <Typography
                    onClick={() => {
                        setPageType(isLogin ? "register : "login");
                        resetForm();
                    }}
                    sx={{
                        textDecoration: "underline",
                        color: palette 
                    }}
                    >

                    </Typography>

                </Box>
            </form>
        )}

    </Formik>
  )
}

export default Form