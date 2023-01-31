import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {CardActionArea,
  Typography,Box
} from '@mui/material'
import Card from '@mui/material/Card';
import { useEffect, useState } from "react";
import { getDataGames } from '../../utils';
import { fetchGames } from '../../utils/types';
import Image from 'next/image';
import Link from 'next/link';
const Games=({games}:any)=>{
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
                      <Link href={`/games/${item?._id}`}>
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

export async function getServerSideProps() {
  const game = await getDataGames("_id name platform image_url")
  return{
    props:{
      games:game?.data?.data?.fetchGames
    }
  }
}