
import {useEffect,useState} from 'react'
import { useFormik } from 'formik'
import { getDataGame,getDataGames,getDataMovies,getDataMovie } from "../../utils"
import {
    graphQLFetchGames,typePostDataGame
} from "../../utils/types"
import star from '../../public/star.png'

const MoviesID=({data}:any)=>{
  const [open, setOpen] = useState<boolean>(false);

    return(
      <div id="article-list">
      <div style={{ display: "flex", "margin-top": "20px" }}>
        <img src={data.image_url} style={{ width: "300px", height: "400px", objectFit: "cover", "borderRadius": "15px" }} />
        <div style={{ float: "left", "fontSize": "20px", padding: "10px", top: 0 }}>
          <h3 style={{ "fontSize": "30px" }}>{data.title} ({data.year})</h3>
          <div style={{ "fontSize": "23px" }}>({data.rating}) <img src="./star.png" style={{ width: "1.2em" }} />
            |  {data.duration} Minutes | {data.genre}</div><br />
          <div >Description:</div>
          <div>{data.description}</div>
          <br />
          <div>Review:</div>
          <div>{data.review}</div>
        </div>
      </div>
    </div>
    )
}

export default MoviesID;

export const getStaticPaths=async ()=>{
    const movie = await getDataMovies("_id")
    const paths=movie?.data?.data?.fetchMovies.map(item=>({params:{moviesID:item._id}}))
    console.log("paths:",movie?.data?.data)
    return{
        paths:paths,
        fallback:false
    }
}

export const getStaticProps=async(context)=>{
    const movie = await getDataMovie(context.params.moviesID, "_id title rating genre image_url duration year review description")
    return{
        props:{
            data:movie?.data?.data?.fetchOneMovie
        }
    }
}