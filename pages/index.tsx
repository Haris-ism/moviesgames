import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { useEffect, useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { getDataGames, getDataMovies } from '../utils';
import { fetchGames, fetchMovies } from '../utils/types';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Home=()=> {
  const [open, setOpen] = useState<boolean>(true);
  const [movies, setMovies] = useState<fetchMovies[]>([])
  const [games, setGames] = useState<fetchGames[]>([])
  const [activeStep, setActiveStep] = useState<number>(0);
  const theme = useTheme();
  const maxSteps = movies.length || 0;
  
  useEffect(() => {
    handleGet();
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleGet = async () => {
    try {
      const movie = await getDataMovies("_id genre image_url title year")
      setMovies(movie?.data?.data?.fetchMovies)
      const game = await getDataGames("_id name platform image_url")
      setGames(game?.data?.data?.fetchGames)
    }
    catch (err:any) {
      alert(err?.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    handleClose()
  }

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
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
    </Backdrop>
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
                <div key={index}>
                  <img className="carousel" src={item?.image_url}/>
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
        <Link href="/movies" style={{display:"flex",alignItems:"center"}}>
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
              <div key={item?._id} className="cards" >
                <Card style={{ borderRadius: "15px",padding: "0px" }}>
                  <img src={item?.image_url} />
                  <label >{truncateString(item?.title, 25)}</label>
                  <br />
                  <label>Genre : {truncateString(item?.genre, 20)}</label>
                  <br />
                  <label>Year : {item?.year}</label>
                </Card>
              </div>
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
        <Link href="/games" style={{display:"flex",alignItems:"center"}}>
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
                <div key={item?._id} className="cards" >
                  <Card style={{ borderRadius: "15px",padding: "0px" }}>
                  <img src={item?.image_url} />
                      <label>{truncateString(item?.name, 25)}</label>
                      <br />
                      <label>Platform : </label>
                      <br />
                      <label>{truncateString(item?.platform, 25)}</label>
                  </Card>
                </div>
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