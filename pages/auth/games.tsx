import * as React from 'react';
import {useEffect,useState} from 'react'
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
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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


export default function StickyHeadTable() {
  const [games, setGames] = useState<graphQLFetchGames[]>([])
  const [page, setPage] = useState<number>(0);
  const [loading,setLoading]=useState<boolean>(true)
  const [search,setSearch]=useState<string>("")
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [tempGames,setTempGames]=useState<graphQLFetchGames[]>([])
  let history = useRouter();
  let token:string|null =null
  useEffect(() => {
    setLoading(true)
    console.log("ieu loading:",loading)
    token= localStorage.getItem('token')
    handleGet();
  }, [])
  
  const Action=({id})=>{
    const handleDelete = async () => {
        setLoading(true)
        try {
          await deleteDataGame(id, token)
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
    return(
        <>
            <Button 
                component="label"
                variant="contained"
                size="small"
                sx={{marginBottom:"10px"}}
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
    try {
      const game = await getDataGames("_id image_url name genre singlePlayer multiPlayer platform release")
      console.log("games:",game?.data?.data?.fetchGames)
      setGames(game?.data?.data?.fetchGames)
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
  }
  const handleCancelSearch=()=>{
    setSearch("")
    if (tempGames.length>0){
        setGames(tempGames)
    }
  }
  const handleSearch=(e)=>{
    e.preventDefault()
    let searchVal=games.filter(item=>item.name.toLowerCase().includes(search))
    if (searchVal.length>0){
        setTempGames(games)
        setGames(searchVal)
    }
  }
  return (
    <>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
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
            <Fab color="primary" aria-label="add" sx={{width:"40px",height:"40px"}} >
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
                                <Action id="a"/>
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