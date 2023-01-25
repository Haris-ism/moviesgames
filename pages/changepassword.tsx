import { useContext,useRef,useState } from "react"
import { UserContext } from "../statemanagement/userContext"
import { typeRegister } from "../utils/types";
import { useFormik } from 'formik'
import { changePassword } from '../utils'
import { TextField,Box,Button } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const ChangePassword = () => {
  const [loading,setLoading]=useState<boolean>(false)
  const trigger=useRef({
    email:false,
    password:false,
    confirm:false
  })
  const context = useContext(UserContext)
  const setUser = context.setUser
  const user=context.user
  const formik= useFormik<typeRegister>({
    initialValues: {
      email: user,
      password: "",
      confirm:""
    },
    onSubmit: (): void => {},
  })
  const handleRegister = async (e:React.FormEvent) => {
    console.log("formik:",formik.values)
    setLoading(true)
    e.preventDefault()
    try {
      await changePassword(formik.values,localStorage.getItem('token'))
      alert("Password Changed")
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
          <TextField 
            required 
            onFocus={()=>{
              trigger.current.confirm=true
              console.log(trigger)
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
            Change Password
            <input hidden type="submit"/>
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ChangePassword
