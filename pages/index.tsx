import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import {  useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { getDataGames, getDataMovies } from '../utils';
import { fetchGames, fetchMovies,typePropsHome } from '../utils/types';
import Image from 'next/image';
import { useContext,useEffect } from "react"
import { UserContext } from "../statemanagement/userContext"
import {
  Card,
  Box,
  Grid,
  CardActionArea,
  Typography,
  MobileStepper,
} from '@mui/material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Home=({movies,games}:typePropsHome)=> {
  const context = useContext(UserContext)
  const setLoading=context.setLoading
  const [activeStep, setActiveStep] = useState<number>(0);
  const theme = useTheme();
  const maxSteps:number = movies?.length || 0;
  useEffect(()=>{
    setLoading(false)
  },[])
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

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
  return (
    <>
    <Grid container >
      <Grid item sm={12} style={{backgroundColor:"#0288d1",borderRadius: "15px"}}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          >
          {
          movies.map((item:fetchMovies, index:number) => 
           (    
            <div>
                <div key={index} style={{borderRadius:"15px",width: '100%', height: '330px', position: 'relative'}}>
                  <Image 
                      // placeholder='blur'
                      loader={()=>item?.image_url} 
                      src={item?.image_url} 
                      alt="Failed To Get Image" 
                      fill
                      objectFit='cover'
                      />
                  </div>
                  <div style={{ "textAlign": "center", "fontSize": "20px", color: "white" }}>{item?.title}</div>
              </div>
            )
          )
        }
        </AutoPlaySwipeableViews>
      </Grid>
      <Grid item sm={12} style={{display:"flex",justifyContent:"center"}}>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={null}
          backButton={null}
          />
      </Grid>
    </Grid>
    <br />
    <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Movies</h2>
    <Grid container justifyContent="center">
      <Grid item sm={10} display="flex" justifyContent="flex-end" alignItems="center">
        <Link href="/movies" style={{display:"flex",alignItems:"center"}} onClick={()=>setLoading(true)}>
              More
          <KeyboardDoubleArrowRightIcon/>
        </Link>
      </Grid>
    </Grid>
    <Grid container display="flex" justifyContent="center">
      <Grid item sm={10} display="flex" justifyContent="space-between">
      {
        movies.map((item:fetchMovies, index:number) => {
          if ((movies.length) - index < 7) {
            return (
              <Box key={item?._id} className="cards" >
                <Link href={`/movies/${item?._id}`} onClick={()=>setLoading(true)}>
                  <Card style={{ borderRadius: "15px",padding: "0px" }}>
                    <CardActionArea>
                      <Image 
                        loader={()=>item?.image_url} 
                        src={item?.image_url} 
                        alt="Failed To Get Image" 
                        width={220} 
                        height={300} 
                        />
                      <Typography gutterBottom component="label">{truncateString(item?.title, 23)}</Typography>
                      <br />
                      <Typography gutterBottom component="label">Genre : {truncateString(item?.genre, 20)}</Typography>
                      <br />
                      <Typography gutterBottom component="label">Year : {item?.year}</Typography>
                    </CardActionArea>
                  </Card>
                </Link>
            </Box>
            )
          }
        })
      }
      </Grid>
    </Grid>
    <br />
    <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Games</h2>
    <Grid container justifyContent="center">
      <Grid item sm={10} display="flex" justifyContent="flex-end" alignItems="center">
        <Link href="/games" style={{display:"flex",alignItems:"center"}} onClick={()=>setLoading(true)}>
              More
          <KeyboardDoubleArrowRightIcon/>
        </Link>
      </Grid>
    </Grid>
    <Grid container display="flex" justifyContent="center">
      <Grid item sm={10} display="flex" justifyContent="space-between">
        {
          games.map((item:fetchGames, index:number) => {
            if ((games.length) - index < 7) {
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
            }
          })
        }
      </Grid>
    </Grid>
    </>
  );
}

export default Home;

export const getServerSideProps:GetServerSideProps=async ()=> {
  const movie = await getDataMovies("_id genre image_url title year")
  const game = await getDataGames("_id name platform image_url")
  return{
    props:{
      movies:movie?.data?.data?.fetchMovies,
      games:game?.data?.data?.fetchGames
    }
  }
}