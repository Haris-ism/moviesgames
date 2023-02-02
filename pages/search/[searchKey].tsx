import { getDataGames,getDataMovies } from "../../utils"
import {typeID,typeGameDetail,graphQLFetchGames,fetchGames,graphQLFetchMovies,fetchMovies} from "../../utils/types"
import { GetStaticProps } from 'next'
import {useState,useEffect,useContext} from 'react'
import { UserContext } from "../../statemanagement/userContext";
import Link from "next/link";
import {
    Typography,
    Card,
    Box,
    CardActionArea
} from "@mui/material"
import Image from "next/image";
import { useRouter } from "next/router";

const SearchKey=()=>{
    const [games, setGames] = useState<graphQLFetchGames[]>([])
    const [movies, setMovies] = useState<graphQLFetchMovies[]>([])
    const router=useRouter()
    const context = useContext(UserContext)
    const setUser = context.setUser
    const token = context.token
    const setToken=context.setToken
    const loading = context.loading
    const setLoading=context.setLoading
    const handleGet = async () => {
        setLoading(true)
        try {
          const game = await getDataGames("_id image_url name genre singlePlayer multiPlayer platform release")
          const movie = await getDataMovies("title genre _id description duration image_url rating review year")
          if (typeof router.query.searchKey=="string"){
              let searchVal:string =router.query.searchKey
              let searchGame=game?.data?.data?.fetchGames.filter((item:fetchGames)=>item.name.toLowerCase().includes(searchVal))
              let searchMovie=movie?.data?.data?.fetchMovies.filter((item:fetchMovies)=>item.title.toLowerCase().includes(searchVal))
              setGames(searchGame)  
              setMovies(searchMovie)
          }
          
        }
        catch (err:any) {
          alert(err?.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
        }
        setLoading(false)
      }
    useEffect(()=>{
        handleGet()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[router.query.searchKey])
    const truncateString = (str:string, num:number) => {
        if (str === undefined) {
          return ""
        } else {
          if (str === null) {
            return ""
          } else {
            if (str.length <= num) {
              return str
            }
            return str.slice(0, num) + '...'
          }
        }
      }
      
    return(
        <>
        
          <Box className="container">
            <Typography variant="h5" sx={{display:"flex",justifyContent:"center"}}>
                Search Games {games?.length} Result:
            </Typography>
            <Box sx={{display:"flex",justifyContent:"center",marginBottom:"50px"}}>
                {
                    games?.length>0 ?
                        games.map((item:fetchGames, index:number) => {
                            return (
                                
                                <Box key={item?._id} className="cards" >
                                <Link href={`/games/${item?._id}`} onClick={()=>setLoading(true)}>
                                <Card style={{ borderRadius: "15px",padding: "0px" }}>
                                    <CardActionArea>
                                    <Image 
                                        // placeholder='blur'
                                        loader={()=>item?.image_url} 
                                        src={item?.image_url} 
                                        alt="Failed To Get Image" 
                                        width={220} 
                                        height={300} 
                                        />
                                    <Typography gutterBottom component="label">{truncateString(item?.name, 23)}</Typography>
                                    <br />
                                    <Typography gutterBottom component="label">Platform :</Typography>
                                    <br />
                                    <Typography gutterBottom component="label">{truncateString(item?.platform, 25)}</Typography>
                                    </CardActionArea>
                                </Card>
                                </Link>
                                </Box>
                            )
                        })
                     :
                    <>
                        No Data
                    </>
                }
                
            </Box>
          </Box>
          <Box className="container">
            <Typography variant="h5" sx={{display:"flex",justifyContent:"center"}}>
                Search Movies {movies?.length} Result:
            </Typography>
            <Box sx={{display:"flex",justifyContent:"center"}}>
                {
                    movies?.length>0 ?
                    movies.map((item:fetchMovies, index:number) => {
                        return (
                        <Box key={item?._id} className="cards" >
                        <Link href={`/movies/${item?._id}`} onClick={()=>setLoading(true)}>
                                <Card style={{ borderRadius: "15px",padding: "0px" }}>
                                    <CardActionArea>
                                        <Image 
                                            loader={()=>item?.image_url} 
                                            src={item?.image_url} 
                                            alt="Failed To Get Image" 
                                            width={220} 
                                            height={300} 
                                        />
                                        <Typography gutterBottom component="label">{truncateString(item?.title, 23)}</Typography>
                                        <br />
                                        <Typography gutterBottom component="label">Genre : {truncateString(item?.genre, 20)}</Typography>
                                        <br />
                                        <Typography gutterBottom component="label">Year : {item?.year}</Typography>
                                    </CardActionArea>
                                </Card>
                            </Link>
                        </Box>
                        )
                    }) :
                    <> 
                        No Data
                    </>
                }
            </Box>
            </Box>
        </>
    )
}

export default SearchKey;