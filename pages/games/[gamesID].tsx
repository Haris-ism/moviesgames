import { useRouter } from "next/router"
import {useEffect,useState} from 'react'
import { useFormik } from 'formik'
import { getDataGame,getDataGames } from "../../utils"
import {
    graphQLFetchGames,typePostDataGame
} from "../../utils/types"
const GamesID=({data}:any)=>{
  const [open, setOpen] = useState<boolean>(false);

    return(
        <div id="article-list">
        <div style={{ display: "flex", marginTop: "20px" }}>
          <img src={data.image_url} style={{ width: "300px", height: "400px", objectFit: "cover", "borderRadius": "15px" }} />
          <div style={{ float: "left", "fontSize": "20px", padding: "10px", top: 0, display: "inline-block" }}>
            <h3 style={{ "fontSize": "30px" }}>{data.name} ({data.release})</h3>
            <div>{data.singlePlayer ? `Singleplayer` : ''} {data.multiPlayer ? `Multiplayer` : ''}</div><br />
            <div>Genre:</div>
            <div>{data.genre}</div><br />
            <div>Platform:</div>
            <div>{data.platform}</div>
          </div>
        </div>
      </div>
    )
}

export default GamesID;

export const getStaticPaths=async ()=>{
    const game = await getDataGames("_id")
    const paths=game?.data?.data?.fetchGames.map(item=>({params:{gamesID:item._id}}))
    return{
        paths:paths,
        fallback:false
    }
}

export const getStaticProps=async(context)=>{
    const game = await getDataGame(context.params.gamesID, "name genre image_url singlePlayer multiPlayer platform release")

    return{
        props:{
            data:game?.data?.data?.fetchOneGame
        }
    }
}