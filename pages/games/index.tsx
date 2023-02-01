import { GetServerSideProps } from 'next';
import {CardActionArea,
  Typography,Box
} from '@mui/material'
import Card from '@mui/material/Card';
import { getDataGames } from '../../utils';
import { fetchGames,typePropsGames } from '../../utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { useContext,useEffect } from "react"
import { UserContext } from "../../statemanagement/userContext"
const Games=({games}:typePropsGames)=>{
  const context = useContext(UserContext)
  const setLoading=context.setLoading
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
            }
          </div>
        </>
    )
}

export default Games;

export const getServerSideProps:GetServerSideProps=async ()=> {
  const game = await getDataGames("_id name platform image_url")
  return{
    props:{
      games:game?.data?.data?.fetchGames
    }
  }
}