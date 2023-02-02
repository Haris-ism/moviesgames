import AddIcon from '@mui/icons-material/Add';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import {
    Alert, Box,
    Button,
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
import ModalComp from '../../components/modalMovies';
import { UserContext } from "../../statemanagement/userContext";
import {
    deleteDataMovie,
    getDataMovies,
    postDataMovie,
    putDataMovie
} from '../../utils';
import {
    graphQLFetchMovies,
    typeMoviesTable,
    typeSnackBar,
    typeActionEditor
} from '../../utils/types';
import Image from 'next/image';

const columns: readonly typeMoviesTable[] = [
  { id: 'no', label: 'No', minWidth: 10 },
  { id: 'img_url', label: 'Image', minWidth: 250 },
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'genre', label: 'Genre', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 350 },
  { id: 'review', label: 'Review', minWidth: 350 },
  { id: 'rating', label: 'Rating', minWidth: 50 },
  { id: 'year', label: 'Year', minWidth: 50 },
  { id: 'duration', label: 'Duration', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 100 },
];

const Authmovies=()=> {
  const [movies, setMovies] = useState<graphQLFetchMovies[]>([])
  const [page, setPage] = useState<number>(0);
  const [search,setSearch]=useState<string>("")
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [tempMovies,setTempMovies]=useState<graphQLFetchMovies[]>([])
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
  const loading = context.loading
  const setLoading=context.setLoading
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
    formik.setFieldValue("title","")
    formik.setFieldValue("rating",0)
    formik.setFieldValue("image_url","")
    formik.setFieldValue("genre","")
    formik.setFieldValue("duration",0)
    formik.setFieldValue("year",0)
    formik.setFieldValue("review","")
    formik.setFieldValue("description","")
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const handleSubmit=async (e:SyntheticEvent)=>{
    e.preventDefault()
    handleClose()
    setLoading(true)
    if (modalMode=="create"){
        try {
            await postDataMovie({
              title: formik.values.title,
              rating: formik.values.rating,
              image_url: formik.values.image_url,
              genre: formik.values.genre,
              duration: formik.values.duration,
              year: formik.values.year,
              review: formik.values.review,
              description: formik.values.description,
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
            await putDataMovie(formik.values._id, {
                title: formik.values.title,
                rating: formik.values.rating,
                image_url: formik.values.image_url,
                genre: formik.values.genre,
                duration: formik.values.duration,
                year: formik.values.year,
                review: formik.values.review,
                description: formik.values.description,
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
              localStorage.removeItem('uactionserId')
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
          await deleteDataMovie(item?._id, token)
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
      const movie = await getDataMovies("title genre _id description duration image_url rating review year")
      setMovies(movie?.data?.data?.fetchMovies)
      setTempMovies(movie?.data?.data?.fetchMovies)

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
        setMovies(tempMovies)
    }
  }
  const handleCancelSearch=()=>{
    setSearch("")
    if (tempMovies.length>0){
        setMovies(tempMovies)
        setPage(0)
    }
  }
  const handleSearch=(e:SyntheticEvent)=>{
    e.preventDefault()
    let searchVal=movies.filter(item=>item?.title?.toLowerCase().includes(search))
    if (searchVal.length>0){
        // setTempMovies(movies)
        setMovies(searchVal)
        setPage(0)
    }else{
        setSnackBar({
            trigger:true,
            severity:"error",
            message:"Data Not Found"
        })
    }
  }
  const formik= useFormik<graphQLFetchMovies>({
    initialValues: {
        title: "",
        rating: 0,
        image_url:"",
        genre:"",
        duration:0,
        year:0,
        review:"",
        description:"",
        _id:"",
        createdAt:"",
        updatedAt:""
    },
    validateOnChange: false,
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
                    {movies
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
                                 <Box 
                                    sx={{
                                        width:columns[1].minWidth,
                                        height:"300px",
                                        position: 'relative'
                                        }}
                                >
                                    <Image 
                                        // placeholder='blur'
                                        loader={()=>item?.image_url} 
                                        src={item?.image_url} 
                                        alt="Failed To Get Image" 
                                        fill
                                        objectFit='contain' 
                                        />
                                </Box>
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:200
                                }}
                            >
                                {item?.title}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:250
                                }}
                            >
                                {item?.genre}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:200
                                }}
                            >
                                {item?.description}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:100
                                }}
                            >
                                {item?.review}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:200
                                }}
                            >
                                {item?.rating}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:100
                                }}
                            >
                                {item?.year}
                            </TableCell>
                            <TableCell 
                                sx={{
                                    width:100
                                }}
                            >
                                {item?.duration+" "}minutes
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
                count={movies.length}
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

export default Authmovies