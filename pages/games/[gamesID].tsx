import { getDataGame,getDataGames } from "../../utils"
import {typeID,typeGameDetail} from "../../utils/types"
import { GetStaticProps } from 'next'
import Image from "next/image"
import { Box, Typography } from "@mui/material"
import { useContext,useEffect } from "react";
import { UserContext } from "../../statemanagement/userContext";
const GamesID=({data}:typeGameDetail)=>{
  const context = useContext(UserContext)
  const loading = context.loading
  const setLoading=context.setLoading
  useEffect(()=>{
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
    return(
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
        </Box>
    )
}

export default GamesID;

export const getStaticPaths=async ()=>{
  const game = await getDataGames("_id")
  const paths=game?.data?.data?.fetchGames.map((item:typeID)=>({params:{gamesID:item._id}}))
  return{
      paths:paths,
      fallback:false
  }
}

export const getStaticProps:GetStaticProps=async(context)=>{
  let data={
    name:"",
    genre:"",
    image_url:"",
    singlePlayer:false,
    multiPlayer:false,
    platform:"",
    release:0,
    _id:""
  }
  if (typeof context?.params?.gamesID=="string"){
    const game = await getDataGame(context.params.gamesID, "name genre image_url singlePlayer multiPlayer platform release")
    data=game?.data?.data?.fetchOneGame
  }

  return{
      props:{
          data:data
      }
  }
}