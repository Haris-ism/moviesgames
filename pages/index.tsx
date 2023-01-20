import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useEffect, useState, useContext } from "react"
import { getDataMovies, getDataGames } from '../utils'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper() {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [movies, setMovies] = useState([])
  const [games, setGames] = useState([])

  const handleGet = async () => {
    // setLoader(true)
    try {
      const movie = await getDataMovies("_id genre image_url title year")
      setMovies(movie.data.data.fetchMovies)
      const game = await getDataGames("_id name platform image_url")
      setGames(game.data.data.fetchGames)
      console.log(movie.data.data.fetchMovies)
    }
    catch (err:any) {
      alert(err.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
    }
    setOpen(false)
  }
  useEffect(() => {
    handleGet();
  }, [])
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = movies.length || 0;
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
          movies.map((item:any, index:number) => 
          {
              return (
                <>
                  <img className="carousel" src={item.image_url}/>
                  <div style={{ "textAlign": "center", "fontSize": "20px", color: "white" }}>{item.title}</div>
                </>
              )
          })
        }
        </AutoPlaySwipeableViews>
      </Grid>
      <Grid item sm={12} style={{display:"flex",justifyContent:"center"}}>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          />
      </Grid>
    </Grid>
    <br />
    <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Movies</h2>
    <Grid container justifyContent="center">
      <Grid item sm={8} display="flex" justifyContent="flex-end" alignItems="center">
        <Link href="/movies" style={{display:"flex",alignItems:"center"}}>
              More
          <KeyboardDoubleArrowRightIcon/>
        </Link>
      </Grid>
    </Grid>
    <Grid container display="flex" justifyContent="center">
      <Grid item sm={8} display="flex" justifyContent="space-between">
      {
        movies.map((item:any, index:number) => {
          if ((movies.length) - index < 7) {
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
          }
        })
      }
      </Grid>
    </Grid>
    <br />
    <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Games</h2>
    <Grid container justifyContent="center">
      <Grid item sm={8} display="flex" justifyContent="flex-end" alignItems="center">
        <Link href="/games" style={{display:"flex",alignItems:"center"}}>
              More
          <KeyboardDoubleArrowRightIcon/>
        </Link>
      </Grid>
    </Grid>
    <Grid container display="flex" justifyContent="center">
      <Grid item sm={8} display="flex" justifyContent="space-between">
        {
          games.map((item:any, index:number) => {
            if ((games.length) - index < 7) {
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
            }
          })
        }
      </Grid>
    </Grid>
    </>
  );
}

export default SwipeableTextMobileStepper;