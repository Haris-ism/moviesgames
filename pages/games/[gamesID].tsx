import { getDataGame,getDataGames } from "../../utils"
import {typeID,typeGameDetail} from "../../utils/types"
import { GetStaticProps } from 'next'
import { useRouter } from "next/router"
import Image from "next/image"
import { Box, Typography } from "@mui/material"
import { useContext,useEffect,useState } from "react";
import { UserContext } from "../../statemanagement/userContext";
const GamesID=()=>{
  const [data,setData]=useState<typeGameDetail>({
    name:"",
    genre:"",
    image_url:"",
    singlePlayer:false,
    multiPlayer:false,
    platform:"",
    release:0,
    _id:""
  })
  const router=useRouter()
  const context = useContext(UserContext)
  const loading = context.loading
  const setLoading=context.setLoading
  let id=router.query.gamesID
  useEffect(()=>{
    handleGet()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleGet = async () => {
    setLoading(true)
    if (typeof id=="string"){
      try {
        const game = await getDataGame(id, "name genre image_url singlePlayer multiPlayer platform release")
        setData(game?.data?.data?.fetchOneGame)
      }
      catch (err:any) {
        alert(err?.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
      }

    }
    setLoading(false)
  }
    return(
      <>
      {
        data.name!="" ?
        <Box style={{ display: "flex", marginTop: "20px" }}>
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
              fill
              objectFit="cover"
              style={{ borderRadius: "15px" }} 
            />
          </Box>
          <Box 
            sx={{ 
              float: "left", 
              fontSize: "20px", 
              padding: "10px", 
              top: 0, 
              display: "inline-block" 
            }}
          >
            <Typography gutterBottom variant="h5" sx={{ marginTop:"40px",marginBottom:"40px",fontWeight:"bold" }}>{data?.name} ({data?.release})</Typography>
            <Typography variant="h6">Type:</Typography>
            <Typography variant="h6">
              {
                data?.singlePlayer ? 
                `Singleplayer` : 
                ''
              } {
                data?.multiPlayer ? 
                `Multiplayer` : 
                ''
                }
            </Typography>
            <br />
            <Typography variant="h6">Genre:</Typography>
            <Typography variant="h6">{data?.genre}</Typography>
            <br />
            <Typography variant="h6">Platform:</Typography>
            <Typography variant="h6">{data?.platform}</Typography>
          </Box>
        </Box> :
        <>Data Not Found</>

      }
      </>
    )
}

export default GamesID;

export const getStaticPaths=async ()=>{
  const game = await getDataGames("_id")
  const paths=game?.data?.data?.fetchGames.map((item:typeID)=>({params:{gamesID:item._id}}))
  return{
      paths:paths,
      fallback:"blocking"
  }
}

export const getStaticProps:GetStaticProps=async(context)=>{
  return{
      props:{}
  }
}