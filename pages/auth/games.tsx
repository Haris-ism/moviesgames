import AddIcon from '@mui/icons-material/Add';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
    Alert, Backdrop, Box,
    Button, CircularProgress,
    Fab, Grid, IconButton,
    InputBase, Snackbar, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
    ChangeEvent,
    SyntheticEvent,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import ModalComp from '../../components/modal';
import { UserContext } from "../../statemanagement/userContext";
import {
    deleteDataGame,
    getDataGames,
    postDataGame,
    putDataGame
} from '../../utils';
import {
    graphQLFetchGames,
    typeGamesTable,
    typeSnackBar
} from '../../utils/types';

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

const AuthGames=()=> {
  const [games, setGames] = useState<graphQLFetchGames[]>([])
  const [page, setPage] = useState<number>(0);
  const [loading,setLoading]=useState<boolean>(true)
  const [search,setSearch]=useState<string>("")
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [tempGames,setTempGames]=useState<graphQLFetchGames[]>([])
  const [modalMode,setModalMode]=useState<"create"|"edit">("create")
  const [open, setOpen] = useState<boolean>(false);
  const [snackBar,setSnackBar]=useState<typeSnackBar>({
    trigger:false,
    severity:"error",
    message:"Data Not Found"
  })
  const context = useContext(UserContext)
  const setUser = context.setUser
  const token = context.token
  const setToken=context.setToken
  let history = useRouter();
  const trigger=useRef({
    email:false,
    password:false
  })
  useEffect(() => {
    handleGet();
  }, [])
  
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
  const handleSubmit=async (e:SyntheticEvent)=>{
    e.preventDefault()
    handleClose()
    setLoading(true)
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
            setSnackBar({
                trigger:true,
                severity:"success",
                message:"Create Success"
            })
            await handleGet()
          }
          catch (err:any) {
            if (err.response?.data?.errors[0]?.message !== 'Please Login') {
                setSnackBar({
                    trigger:true,
                    severity:"error",
                    message:err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later."
                })
            } else {
              setSnackBar({
                trigger:true,
                severity:"error",
                message:"Session Expired, Please Login."
                })
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
            setSnackBar({
                trigger:true,
                severity:"success",
                message:"Edit Success"
            })
            await handleGet()
          }
          catch (err:any) {
            if (err.response?.data?.errors[0]?.message !== 'Please Login') {
                setSnackBar({
                    trigger:true,
                    severity:"error",
                    message:err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later."
                })
            } else {
              setSnackBar({
                trigger:true,
                severity:"error",
                message:"Session Expired, Please Login."
                })
              localStorage.removeItem('token')
              localStorage.removeItem('userId')
              history.push(`/login`)
            }
          }
    }
    setLoading(false)
  }
  const Action=({item}:any)=>{
    const handleDelete = async () => {
        setLoading(true)
        try {
          await deleteDataGame(item._id, token)
          setSnackBar({
            trigger:true,
            severity:"success",
            message:"Delete Success"
        })
          await handleGet()
        }
        catch (err:any) {
            if (err.response?.data?.errors[0]?.message !== 'Please Login') {
                setSnackBar({
                    trigger:true,
                    severity:"error",
                    message:err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later."
                })
            } else {
              setSnackBar({
                trigger:true,
                severity:"error",
                message:"Session Expired, Please Login."
                })
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

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeSearch=(e:ChangeEvent<HTMLInputElement>)=>{
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
  const handleSearch=(e:SyntheticEvent)=>{
    e.preventDefault()
    let searchVal=games.filter(item=>item.name.toLowerCase().includes(search))
    if (searchVal.length>0){
        // setTempGames(games)
        setGames(searchVal)
        setPage(0)
    }else{
        setSnackBar({
            trigger:true,
            severity:"error",
            message:"Data Not Found"
        })
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
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 99 }}
        open={loading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
    <ModalComp 
        formik={formik} 
        open={open} 
        handleClose={handleClose} 
        handleSubmit={handleSubmit} 
        mode={modalMode} 
        setSnackBar={setSnackBar} 
    />
    <Grid 
        container 
        sx={{ 
            width: '100%', 
            overflow: 'hidden',
            display:"flex",
            justifyContent:"center" 
            }}>
        <Grid item sm={12} >
        <Box 
            component="form" 
            sx={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
                }}>
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
                    <IconButton 
                        sx={{
                            width:"10px",
                            height:"10px"
                            }} 
                        onClick={handleCancelSearch} 
                    >
                        <ClearIcon sx={{fontSize:"10px"}} />
                    </IconButton> :
                    null

                }
            </Box>
            <IconButton  
                sx={{ p: '10px' }} 
                component="label" 
                onClick={handleSearch}
            >
                <SearchIcon />
                <input hidden type="submit"/>
            </IconButton>
        </Box>
        </Grid>
        <Grid 
            item 
            sm={11} 
            sx={{
                display:"flex",
                justifyContent:"right",
                alignItems:"center"
                }}
        >
            <Fab 
                color="primary" 
                aria-label="add" 
                sx={{
                    width:"40px",
                    height:"40px"
                    }} 
                onClick={handleOpen}
            >
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
    <Snackbar 
        open={snackBar.trigger} 
        autoHideDuration={4000} 
        onClose={handleSnackBarClose}
    >
        <Alert severity={snackBar.severity} sx={{ width: '100%' }}>
            {snackBar.message}
        </Alert>
    </Snackbar>
    </>
  );
}

export default AuthGames