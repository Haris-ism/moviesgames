import {
    Box, Button, Modal, TextField
} from "@mui/material";
import { typeModalProps } from '../utils/types';
const ModalComp=({formik,open,handleClose,handleSubmit,mode,setSnackBar}:typeModalProps)=>{
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
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
                            label="Title"
                            name="title" 
                            onChange={formik.handleChange} 
                    value={formik.values.title} 
                    sx={{marginBottom:"20px",width:"300px"}}
                    />
                <br />
                <TextField 
                    required
                    size="small"
                    label="Genre" 
                    name="genre"
                    value={formik.values.genre}
                    onChange={formik.handleChange} 
                    sx={{marginBottom:"20px",width:"300px"}}
                />
                <br/>
                <TextField 
                    required
                    size="small"
                    label="Image Link" 
                    name="image_url"
                    value={formik.values.image_url}
                    onChange={formik.handleChange} 
                    sx={{marginBottom:"20px",width:"300px"}}
                    />
                <br />
                <TextField 
                        required
                        size="small"
                        label="Description" 
                        name="description"
                        multiline
                        value={formik.values.description}
                        onChange={formik.handleChange} 
                        sx={{marginBottom:"20px",width:"300px"}}
                        />
                <br/>
                <TextField 
                        required
                        size="small"
                        label="Review" 
                        name="review"
                        multiline
                        value={formik.values.review}
                        onChange={formik.handleChange} 
                        sx={{marginBottom:"20px",width:"300px"}}
                        />
                <br/>
                <TextField 
                    required
                    size="small"
                    label="Rating" 
                    name="rating"
                    type="number"
                    value={formik.values.rating}
                    onChange={formik.handleChange} 
                    sx={{marginBottom:"20px",width:"300px"}}
                    />
                <br />
                <TextField 
                    required
                    size="small"
                    label="Year" 
                    name="year"
                    type="number"
                    value={formik.values.year}
                    onChange={formik.handleChange} 
                    sx={{marginBottom:"20px",width:"300px"}}
                    />
                <br />
                <TextField 
                    required
                    size="small"
                    label="Duration" 
                    name="duration"
                    type="number"
                    value={formik.values.duration}
                    onChange={formik.handleChange} 
                    sx={{marginBottom:"20px",width:"300px"}}
                    />
                <br/>
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