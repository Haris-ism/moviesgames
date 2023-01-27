import * as React from 'react';
import {useEffect,useState,useRef,useContext} from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import {Button,Box,Grid,TextField,OutlinedInput } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getDataGames, deleteDataGame } from '../../utils';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik'
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from "../../statemanagement/userContext"
import {typePostDataGame} from '../../utils/types'
import { postDataGame,putDataGame } from '../../utils';
import ModalComp from '../../components/modal'
import { fetchGames, graphQLFetchGames,typeGamesTable } from '../../utils/types';
const columns: readonly typeGamesTable[] = [
  { id: 'no', label: 'No', minWidth: 10 },
  { id: 'img_url', label: 'Image', minWidth: 150 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'genre', label: 'Genre', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'platform', label: 'Platform', minWidth: 100 },
  { id: 'release', label: 'Release', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 100 },

];

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
export default function StickyHeadTable() {
  const [games, setGames] = useState<graphQLFetchGames[]>([])
  const [page, setPage] = useState<number>(0);
  const [loading,setLoading]=useState<boolean>(true)
  const [search,setSearch]=useState<string>("")
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [tempGames,setTempGames]=useState<graphQLFetchGames[]>([])
  const [modalMode,setModalMode]=useState<"create"|"edit">("create")
  const context = useContext(UserContext)
  const setUser = context.setUser
  const user=context.user
  const token = context.token
  const setToken=context.setToken
    console.log("loading",loading)
  let history = useRouter();
  const trigger=useRef({
    email:false,
    password:false
  })
  useEffect(() => {
    handleGet();
  }, [])
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setModalMode("create")
    formik.setFieldValue("name","")
    formik.setFieldValue("genre","")
    formik.setFieldValue("image_url","")
    formik.setFieldValue("singlePlayer",false)
    formik.setFieldValue("multiPlayer",false)
    formik.setFieldValue("platform","")
    formik.setFieldValue("release",0)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const handleSubmit=async (e)=>{
    e.preventDefault()
    console.log("formik:",formik.values)
    if (modalMode=="create"){
        try {
            await postDataGame({
              genre: formik.values.genre,
              image_url: formik.values.image_url,
              singlePlayer: formik.values.singlePlayer,
              multiPlayer: formik.values.multiPlayer,
              name: formik.values.name,
              platform: formik.values.platform,
              release: formik.values.release
            }, token)
            alert("Create Success")
            handleGet()
          }
          catch (err:any) {
            if (err.response?.data?.errors[0]?.message !== 'Please Login') {
              alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
            } else {
              alert("Session Expired, Please Login.")
              localStorage.removeItem('token')
              localStorage.removeItem('userId')
              setUser(null)
              setToken(null)
              history.push(`/login`)
            }
          }
    }
    if (modalMode=="edit"){
        try {
            await putDataGame(formik.values._id, {
              name: formik.values.name,
              genre: formik.values.genre,
              image_url: formik.values.image_url,
              platform: formik.values.platform,
              release: formik.values.release,
              singlePlayer: formik.values.singlePlayer,
              multiPlayer: formik.values.multiPlayer
            }, token)
            alert('Edit Success')
            handleGet()
          }
          catch (err:any) {
            if (err.response?.data?.errors[0]?.message !== 'Please Login') {
              alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
            } else {
              alert("Session Expired, Please Login.")
              localStorage.removeItem('token')
              localStorage.removeItem('userId')
              history.push(`/login`)
            }
          }
    }
  }
  const Action=({item})=>{
    const handleDelete = async () => {
        console.log("id:",item._id)
        console.log("token:",token)
        console.log("user:",user)
        setLoading(true)
        try {
          await deleteDataGame(item._id, token)
          handleGet()
        }
        catch (err:any) {
          if (err.response?.data?.errors[0]?.message !== 'Please Login') {
            alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
          } else {
            alert("Session Expired, Please Login.")
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            history.push(`/login`)
          }
        }
        setLoading(false)
      }
      const handleEdit=async()=>{
        setModalMode("edit")
        for (let key in formik.values){
            formik.setFieldValue(key,item[key])
        }
        setOpen(true)
        console.log("games formik:",formik.values)
      }
    return(
        <>
            <Button 
                component="label"
                variant="contained"
                size="small"
                sx={{marginBottom:"10px"}}
                onClick={handleEdit}
            >
                {/* <EditIcon sx={{fontSize:"20px"}} /> */}
                <BorderColorOutlinedIcon sx={{fontSize:"20px"}}/>
                Edit
            </Button>
            <br/>
            <Button 
                component="label"
                variant="contained"
                size="small"
                onClick={handleDelete}
            >
                <DeleteIcon sx={{fontSize:"20px"}}/>
                Delete
            </Button>
        </>
    )
  }
  const handleGet = async () => {
    setLoading(true)
    try {
      const game = await getDataGames("_id image_url name genre singlePlayer multiPlayer platform release")
      console.log("games:",game?.data?.data?.fetchGames)
      setGames(game?.data?.data?.fetchGames)
      setTempGames(game?.data?.data?.fetchGames)

    }
    catch (err:any) {
      alert(err?.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setLoading(false)
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
    if (e.target.value==""){
        setGames(tempGames)
    }
  }
  const handleCancelSearch=()=>{
    setSearch("")
    if (tempGames.length>0){
        setGames(tempGames)
        setPage(0)
    }
  }
  const handleSearch=(e)=>{
    e.preventDefault()
    let searchVal=games.filter(item=>item.name.toLowerCase().includes(search))
    if (searchVal.length>0){
        // setTempGames(games)
        setGames(searchVal)
        setPage(0)
    }
  }
  const formik= useFormik<graphQLFetchGames>({
    initialValues: {
        name: "",
        genre: "",
        image_url:"",
        singlePlayer:false,
        multiPlayer:false,
        platform:"",
        release:0,
        _id:"",
        createdAt:"",
        updatedAt:""
    },
    onSubmit: (): void => {},
  })
  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
    {/* <Modal
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
                <Button 
                    component="label"
                    variant="contained"
                    size="small"
                    onClick={handleSubmit}
                >
                    Submit
                    <input hidden type="submit"/>
                </Button>
            </Box>
        </Box>
    </Modal> */}
    <ModalComp formik={formik} open={open} handleClose={handleClose} handleSubmit={handleSubmit} mode={modalMode} />
    <Grid container sx={{ width: '100%', overflow: 'hidden',display:"flex",justifyContent:"center" }}>
        <Grid item sm={12} >
        <Box component="form" sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Box 
            sx={{
                borderRadius:"3px",
                outlineStyle:"solid",
                outlineColor:"#b0bec5",
                outlineWidth:"1px",
                width:"250px",
                height:"38px",
                paddingLeft:"10px",
                display:"flex",
                alignItems:"center"
                }} 
            >
                <InputBase
                    color="secondary"
                    placeholder="Search"
                    size="small"
                    sx={{width:"220px"}}
                    value={search}
                    onChange={handleChangeSearch}
                />
                {
                    search!="" ?
                    <IconButton sx={{width:"10px",height:"10px"}} onClick={handleCancelSearch} >
                        <ClearIcon sx={{fontSize:"10px"}} />
                    </IconButton> :
                    null

                }
            </Box>
            <IconButton  sx={{ p: '10px' }} component="label" onClick={handleSearch}>
                <SearchIcon />
                <input hidden type="submit"/>
            </IconButton>
        </Box>
        </Grid>
        <Grid item sm={11} sx={{display:"flex",justifyContent:"right",alignItems:"center"}}>
            <Fab color="primary" aria-label="add" sx={{width:"40px",height:"40px"}} onClick={handleOpen}>
                <AddIcon />
            </Fab>
        </Grid>
        <Grid item sm={12}>
            <TableContainer sx={{ maxHeight: "80vh" }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        //   align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {games
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item,idx) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                            <TableCell 
                                sx={{
                                    width:columns[0].minWidth
                                }}
                            >
                                {(idx+1)+(rowsPerPage*(page))}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:columns[1].minWidth
                                }}
                            >
                                <img
                                    src={item.image_url}
                                    alt="euy"
                                    width={columns[1].minWidth}
                                />
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:200
                                }}
                            >
                                {item.name}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:250
                                }}
                            >
                                {item.genre}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:200
                                }}
                            >
                                {
                                    item.singlePlayer ?
                                    "Single Player" :
                                    null
                                }
                                {
                                    item.multiPlayer ?
                                    <>
                                        {
                                            item.singlePlayer ?
                                            ", Multi Player":
                                            "Multi Player"
                                        }
                                    </> :
                                    null
                                }
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:200
                                }}
                            >
                                {item.platform}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:100
                                }}
                            >
                                {item.release}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:150
                                }}
                            >
                                <Action item={item}/>
                            </TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={games.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Grid>
    </Grid>
    </>
  );
}