import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

function SwipeableTextMobileStepper() {
  const movies={
    "data": {
      "fetchMovies": [
        {
          "_id": "62f79cb91b43ee8dc46235b6",
          "genre": "Musical/Drama",
          "image_url": "https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_.jpg",
          "title": "Bohemian Rhapsody",
          "year": 2018
        },
        {
          "_id": "62f79cd71b43ee8dc46235b9",
          "genre": "Crime/Drama",
          "image_url": "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
          "title": "Joker",
          "year": 2019
        },
        {
          "_id": "62f79cf31b43ee8dc46235bc",
          "genre": "Thriller/Action",
          "image_url": "https://m.media-amazon.com/images/M/MV5BYmViZGM0MGItZTdiYi00ZDU4LWIxNDYtNTc1NWQ5Njc2N2YwXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg",
          "title": "Limitless",
          "year": 2011
        },
        {
          "_id": "62f79d101b43ee8dc46235bf",
          "genre": "Sci-fi/Action",
          "image_url": "data:image/jpeg;base64,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",
          "title": "Men in Black III",
          "year": 2012
        },
        {
          "_id": "62f79d281b43ee8dc46235c2",
          "genre": "Adventure/Action",
          "image_url": "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fscottmendelson%2Ffiles%2F2017%2F05%2Fpirates_of_the_caribbean_dead_men_tell_no_tales_by_mintmovi3-db23j4w.jpg",
          "title": "Pirates of the Caribbean: Dead Man Tell No Tales",
          "year": 2017
        },
        {
          "_id": "62f79d421b43ee8dc46235c5",
          "genre": "Sci-fi/Action",
          "image_url": "https://pbs.twimg.com/profile_images/643858917198561281/Ljv0CRns_400x400.jpg",
          "title": "Pixels",
          "year": 2015
        },
        {
          "_id": "62f79d5f1b43ee8dc46235c8",
          "genre": "Romance/Drama",
          "image_url": "https://ramajanisinaga.files.wordpress.com/2015/06/appleofmyeye.jpg",
          "title": "You Are the Apple of My Eye",
          "year": 2011
        }
      ]
    }
  }
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
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
            images.map((step, index) => {
            if ((images.length) - index < 6) {
              return (
                <div>
                  <img className="carousel" src={step.imgPath} />
                  <div style={{ borderRadius: "15px",marginTop:"0",textAlign: "center", fontSize: "20px", color: "white",backgroundColor:"#0288d1" }}>{step.label}</div>
                 
                </div>
              )
            }
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
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        {
          movies.data.fetchMovies.map((item, index) => {
            if ((movies.data.fetchMovies.length) - index < 7) {
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
      </div>
    </>
  );
}

export default SwipeableTextMobileStepper;