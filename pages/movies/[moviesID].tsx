
import { getDataMovies,getDataMovie } from "../../utils"
import {typeID,typeMovieDetail} from "../../utils/types"
import { GetStaticProps } from 'next'
import { useRouter } from "next/router"
import { useContext,useEffect,useState,useRef } from "react"
import { UserContext } from "../../statemanagement/userContext"
import Image from 'next/image'
import star from '../../public/star.png'
import { 
  Box, Typography
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const MoviesID=()=>{
  const [data,setData]=useState<typeMovieDetail>({
    _id:"",
    title:"",
    rating:0,
    genre:"",
    image_url:"",
    duration:0,
    year:0,
    review:"",
    description:""
  })
  const firstRender=useRef(true)
  const router=useRouter()
  let id=router.query.moviesID
  const context = useContext(UserContext)
  const setLoading=context.setLoading
  useEffect(()=>{
    handleGet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleGet = async () => {
    setLoading(true)
    if (typeof id=="string"){
      try {
        const movie = await getDataMovie(id, "_id title rating genre image_url duration year review description")
        setData(movie?.data?.data?.fetchOneMovie)
        firstRender.current=false
      }
      catch (err:any) {
        alert("Something Went Wrong Please Try Again Later.")
        firstRender.current=false
      }
    }
    setLoading(false)
  }
    return(
      <>
      {
        !firstRender.current ?
          data.title!="" ?
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <Box
              sx={{
                width:"300px",
                height:"400px",
                position:"relative"
              }}
            >
              <Image 
                loader={()=>data?.image_url} 
                src={data?.image_url} 
                alt="Failed To Get Image" 
                objectFit="cover" 
                fill
                style={{borderRadius: "15px"}} 
              />
            </Box>
            <Box sx={{ float: "left",padding: "10px", top: 0 }}>
              <Typography gutterBottom variant="h5" sx={{ marginTop:"40px",marginBottom:"40px",fontWeight:"bold" }}>
                {data?.title} ({data?.year})
              </Typography>
              <Box sx={{ fontSize: "23px",display:"flex",alignItems:"center"}}>
                {
                  [...Array(5)].map((item,i)=>(
                    <Box key={i}>
                      {
                        i<data?.rating?
                        <Image 
                          src={star} 
                          alt="star" 
                          width={20}
                          height={20}
                        />:
                        <StarBorderIcon sx={{color:"#2196f3", position:"relative",top:"2.7px"}}/>
                      }
                    </Box>
                  ))
                }
                
                <Typography variant="h6" sx={{marginLeft:"0.3rem"}}>
                  |
                </Typography>
                <br/>
                <AccessTimeIcon sx={{color:"#2196f3",marginLeft:"0.3rem",marginRight:"0.3rem"}} /> 
                <Typography variant="h6">
                {data?.duration} Minutes | {data?.genre}
                </Typography>
              </Box>
              <br />
              <Typography variant="h6">Description:</Typography>
              <Typography variant="h6">{data?.description}</Typography>
              <br />
              <Typography variant="h6">Review:</Typography>
              <Typography variant="h6">{data?.review}</Typography>
            </Box>
          </Box> :
          <Typography variant="h5" sx={{display:"flex",justifyContent:"center"}}>
            Data Not Found
          </Typography> :
        null
      }
      </>
    
    )
}

export default MoviesID;

export const getStaticPaths=async ()=>{
    const movie = await getDataMovies("_id")
    const paths=movie?.data?.data?.fetchMovies.map((item:typeID)=>({params:{moviesID:item._id}}))
    return{
        paths:paths,
        fallback:"blocking"
    }
}

export const getStaticProps:GetStaticProps =async()=>{
    return{
        props:{}
    }
}