import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Card from '@mui/material/Card';
import { useEffect, useState } from "react";
import { getDataGames } from '../utils';
import { fetchGames } from '../utils/types';
import Image from 'next/image';

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
          {/* <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
          </Backdrop> */}
          <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Games</h2>
          <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            {
              games.map((item:fetchGames, index:number) => {
                  return (
                    <div key={item?._id} className="cards" >
                      <Card style={{ borderRadius: "15px",padding: "0px" }}>
                      <Image 
                        // placeholder='blur'
                        loader={()=>item?.image_url} 
                        src={item?.image_url} 
                        alt="Failed To Get Image" 
                        width={220} 
                        height={300} 
                      />
                          <label>{item?.name}</label>
                          <br />
                          <label>Platform : </label>
                          <br />
                          <label>{truncateString(item?.platform, 25)}</label>
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

export async function getServerSideProps() {
  const game = await getDataGames("_id name platform image_url")
  return{
    props:{
      games:game?.data?.data?.fetchGames
    }
  }
}