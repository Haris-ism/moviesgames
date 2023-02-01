import { Box, Button, TextField } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from 'formik';
import { useContext, useRef, useState } from "react";
import { UserContext } from "../statemanagement/userContext";
import { registration } from '../utils';
import { typeRegister } from "../utils/types";
const Register = () => {
  const [loading,setLoading]=useState<boolean>(false)
  const trigger=useRef({
    email:false,
    password:false,
    confirm:false
  })
  const context = useContext(UserContext)
  const setUser = context.setUser
  const formik= useFormik<typeRegister>({
    initialValues: {
      email: "",
      password: "",
      confirm:""
    },
    onSubmit: (): void => {},
  })
  const handleRegister = async (e:React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      await registration(formik.values)
      alert("Registration Completed")
    }
    catch (err:any) {
      alert(err?.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoading(false)
  }
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
              !formik.values?.email?.includes("@") && trigger.current.email ?
              true :
              false
            }
            helperText={
              !formik.values?.email?.includes("@") && trigger.current.email ?
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
          <TextField 
            required 
            onFocus={()=>{
              trigger.current.confirm=true
            }}
            error={
              formik.values.confirm!=formik.values.password && trigger.current.confirm ?
              true :
              false
            }
            helperText={
                formik.values.confirm!=formik.values.password && trigger.current.confirm ?
              "Password don't match" :
              "" 
            }
            size="small"
            label="Confirm"
            type="password" 
            name="confirm" 
            onChange={formik.handleChange} 
            value={formik.values.confirm} 
            sx={{marginBottom:"20px"}}
          />
          <br />
          <Button 
            component="label"
            variant="contained"
            size="small"
            onClick={handleRegister}
          >
            Register
            <input hidden type="submit"/>
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Register
