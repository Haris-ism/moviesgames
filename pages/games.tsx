import { useEffect,useState } from "react"
import { getDataGames } from '../utils'
import Card from '@mui/material/Card';

const Games=()=>{
  const [games, setGames] = useState([])

  const handleGet = async () => {
    // setLoader(true)
    try {
      const game = await getDataGames("_id name platform image_url")
      setGames(game.data.data.fetchGames)
      console.log(game)
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
          <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Games</h2>
          <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            {
              games.map((item, index) => {
                  return (
                    <div className="cards" >
                      <Card style={{ "borderRadius": "15px" }} bodyStyle={{ padding: "0px" }}>
                      <img src={item.image_url} />
                          <label>{item.name}</label>
                          <br />
                          <label>Platform : </label>
                          <br />
                          <label>{truncateString(item.platform, 25)}</label>
                      </Card>
                    </div>
                  )
              })
            }
          </div>
        </>
    )
}

export default Games;