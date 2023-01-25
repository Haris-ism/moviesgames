import { useContext,useRef } from "react"
import { UserContext } from "../statemanagement/userContext"
import { initialValues } from "../utils/types";
import { useFormik } from 'formik'
import { login } from '../utils'
import { TextField,Box,Button } from "@mui/material";
const Login = () => {
  const trigger=useRef({
    email:false,
    password:false
  })
  const context = useContext(UserContext)
  const setUser = context.setUser
  const formik= useFormik<initialValues>({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (): void => {},
  })
  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await login(formik.values)
      localStorage.setItem('userId', result.data.data.login.user)
      localStorage.setItem('token', result.data.data.login.token)
      setUser(result.data.data.login.user)
    }
    catch (err:any) {
      alert(err?.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
  }
  return (
    <>
      <Box sx={{ margin: "0 auto", width: "400px", padding: "50px" }}>
        <Box component="form" >
          <TextField 
            required 
            onFocus={()=>{
              trigger.current.email=true
              console.log(trigger)
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
              console.log(trigger)
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
    </>
  )
}

export default Login
