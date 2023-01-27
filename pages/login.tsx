import { useContext,useRef,useState } from "react"
import { UserContext } from "../statemanagement/userContext"
import { typeLogin } from "../utils/types";
import { useFormik } from 'formik'
import { login } from '../utils'
import { TextField,Box,Button } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Login = () => {
  const [loading,setLoading]=useState<boolean>(false)
  const trigger=useRef({
    email:false,
    password:false
  })
  const context = useContext(UserContext)
  const setUser = context.setUser
  const token = context.token
  const setToken=context.setToken
  const formik= useFormik<typeLogin>({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (): void => {},
  })
  const handleLogin = async (e:React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      const result = await login(formik.values)
      console.log("result:",result.data.data.login)
      localStorage.setItem('userId', result.data.data.login.user)
      localStorage.setItem('token', result.data.data.login.token)
      setUser(result.data.data.login.user)
      setToken(result.data.data.login.token)
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
