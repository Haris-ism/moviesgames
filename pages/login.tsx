import {
  Alert, Backdrop, Box,
  Button, CircularProgress, Snackbar, TextField
} from "@mui/material";
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { SyntheticEvent, useContext, useRef, useState } from "react";
import { UserContext } from "../statemanagement/userContext";
import { login } from '../utils';
import { typeLogin, typeSnackBar } from "../utils/types";

const Login = () => {
  const [loading,setLoading]=useState<boolean>(false)
  const [snackBar,setSnackBar]=useState<typeSnackBar>({
    trigger:false,
    severity:"error",
    message:"Data Not Found"
  })
  const trigger=useRef({
    email:false,
    password:false
  })
  let history = useRouter();
  const context = useContext(UserContext)
  const setUser = context.setUser
  // const token = context.token
  const setToken=context.setToken
  const formik= useFormik<typeLogin>({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (): void => {},
  })
  const handleCheckFormat=():boolean=>{
    if (!formik.values.email.includes("@")||!(formik.values.password.length>=6)){
      return false
    }
    return true
  }
  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (!handleCheckFormat()) {
      setSnackBar({
        trigger:true,
        severity:"error",
        message:"Please Fill With A Valid Inputs"
      })
      setLoading(false)
      return
    }
    try {
      const result = await login(formik.values)
      localStorage.setItem('userId', result?.data?.data?.login?.user)
      localStorage.setItem('token', result?.data?.data?.login?.token)
      setUser(result?.data?.data?.login?.user)
      setToken(result?.data?.data?.login?.token)
      setSnackBar({
        trigger:true,
        severity:"success",
        message:"Login Success!"
      })
      setTimeout(()=>{
        history.push("/")
      },1000)
    }
    catch (err:any) {
      setSnackBar({
        trigger:true,
        severity:"error",
        message:err?.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later."
      })
    }
    setLoading(false)
  }
  const handleSnackBarClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar({
      ...snackBar,
      trigger:false,
    })
  };
  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
    </Backdrop>
      <Box sx={{ margin: "0 auto", width: "400px", padding: "50px" }}>
        <Box component="form" >
          <TextField 
            required 
            onFocus={()=>{
              trigger.current.email=true
            }}
            error={
              !formik.values.email.includes("@") && trigger.current.email ?
              true :
              false
            }
            helperText={
              !formik.values.email.includes("@") && trigger.current.email ?
              "Please input a valid email" :
              "" 
            }
            size="small"
            label="Email"
            type="email" 
            name="email" 
            onChange={formik.handleChange} 
            value={formik.values.email} 
            sx={{marginBottom:"20px"}}
          />
          <br />
          <TextField 
            required 
            onFocus={()=>{
              trigger.current.password=true
            }}
            error={
              !(formik.values.password.length>=6) && trigger.current.password ?
              true :
              false
            }
            helperText={
              !(formik.values.password.length>=6) && trigger.current.password ?
              "Minimum 6 digits" :
              "" 
            }
            size="small"
            label="Password"
            type="password" 
            name="password" 
            onChange={formik.handleChange} 
            value={formik.values.password} 
            sx={{marginBottom:"20px"}}
          />
          <br />
          <Button 
            component="label"
            variant="contained"
            size="small"
            onClick={handleLogin}
          >
            Login
            <input hidden type="submit"/>
          </Button>
        </Box>
      </Box>
      <Snackbar open={snackBar.trigger} autoHideDuration={4000} onClose={handleSnackBarClose}>
        <Alert severity={snackBar.severity} sx={{ width: '100%' }}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Login
