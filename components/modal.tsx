import {
    Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Modal, TextField
} from "@mui/material";
import { typeModalProps } from '../utils/types';
const ModalComp=({formik,open,handleClose,handleSubmit,mode,setSnackBar}:typeModalProps)=>{
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return(
    <>
    <Modal
        open={open}
        onClose={handleClose}
        >
        <Box sx={style}>
            <Box component="form" >
                <TextField 
                    required 
                    // onFocus={()=>{
                    //   trigger.current.email=true
                    //   console.log(trigger)
                    // }}
                    // error={
                        //   !formik.values.email.includes("@") && trigger.current.email ?
                        //   true :
                        //   false
                        // }
                        // helperText={
                            //   !formik.values.email.includes("@") && trigger.current.email ?
                            //   "Please input a valid email" :
                            //   "" 
                            // }
                            size="small"
                            label="Name"
                            name="name" 
                            onChange={formik.handleChange} 
                    value={formik.values.name} 
                    sx={{marginBottom:"20px"}}
                    />
                <br />
                <TextField 
                    required
                    size="small"
                    label="Genre" 
                    name="genre"
                    value={formik.values.genre}
                    onChange={formik.handleChange} 
                    sx={{marginBottom:"20px"}}
                />
                <br />
                <TextField 
                    required
                    size="small"
                    label="Platform" 
                    name="platform"
                    value={formik.values.platform}
                    onChange={formik.handleChange} 
                    sx={{marginBottom:"20px"}}
                    />
                <br />
                <TextField 
                    required
                    size="small"
                    label="Release Year" 
                    name="release"
                    type="number"
                    value={formik.values.release}
                    onChange={formik.handleChange} 
                    sx={{marginBottom:"20px"}}
                    />
                <br />
                    <TextField 
                        required
                        size="small"
                        label="Image Link" 
                        name="image_url"
                        value={formik.values.image_url}
                        onChange={formik.handleChange} 
                        sx={{marginBottom:"20px"}}
                        />
                <br/>
                <FormControl >
                    <FormLabel component="legend">Game Type</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox />
                        }
                        label="Single Player"
                        name="singlePlayer"
                        checked={formik.values.singlePlayer}
                        onChange={formik.handleChange} 
                        
                        />
                    <FormControlLabel
                        control={
                            <Checkbox />
                        }
                        label="Multi Player"
                        name="multiPlayer"
                        checked={formik.values.multiPlayer}
                        onChange={formik.handleChange} 
                        />
                    </FormGroup>
                </FormControl>
                <br />
                {
                    mode=="create"?
                    <Button 
                        component="label"
                        variant="contained"
                        size="small"
                        onClick={handleSubmit}
                        >
                        Create
                        <input hidden type="submit"/>
                    </Button> :
                    <Button 
                        component="label"
                        variant="contained"
                        size="small"
                        onClick={handleSubmit}
                        >
                        Edit
                        <input hidden type="submit"/>
                    </Button>
                
                }
            </Box>
        </Box>
    </Modal>
    </>
    )
}
export default ModalComp