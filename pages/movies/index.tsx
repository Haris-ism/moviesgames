import Card from '@mui/material/Card';
import { getDataMovies } from '../../utils';
import { fetchMovies,typePropsMovies } from '../../utils/types';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import {CardActionArea,
    Typography,Box
  } from '@mui/material'
import Link from 'next/link';
import { useContext,useEffect } from "react"
import { UserContext } from "../../statemanagement/userContext"
const Movies=({movies}:typePropsMovies)=>{
  const context = useContext(UserContext)
  const setLoading=context.setLoading
  const loading=context.loading
  useEffect(()=>{
    setLoading(false)
  },[])
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
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            {
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
                })
            }
            </div>
        </>
    )
}

export default Movies;

export const getServerSideProps:GetServerSideProps=async ()=> {
  const movie = await getDataMovies("_id genre image_url title year")
  return{
    props:{
      movies:movie?.data?.data?.fetchMovies
    }
  }
}