import { useEffect,useState } from "react"
import { getDataMovies } from '../utils'
import Card from '@mui/material/Card';

const Movies=()=>{
  const [movies, setMovies] = useState([])
  const handleGet = async () => {
    // setLoader(true)
    try {
      const movie = await getDataMovies("_id genre image_url title year")
      setMovies(movie.data.data.fetchMovies)
    }
    catch (err) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    // setLoader(false)
  }
  useEffect(() => {
    handleGet();
  }, [])
    const truncateString = (str, num) => {
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
            <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Movies</h2>
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            {
                movies.map((item, index) => {
                    return (
                    <div className="cards" >
                        <Card style={{ "borderRadius": "15px" }} bodyStyle={{ padding: "0px" }}>
                        <img src={item.image_url} />
                        <label>{truncateString(item.title, 23)}</label>
                        <br />
                        <label>Genre : {truncateString(item.genre, 20)}</label>
                        <br />
                        <label>Year : {item.year}</label>
                        </Card>
                    </div>
                    )
                })
            }
            </div>
        </>
    )
}

export default Movies;
