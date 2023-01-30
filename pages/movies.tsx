import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import { getDataMovies } from '../utils';
import { fetchMovies } from '../utils/types';
import Image from 'next/image';

const Movies=({movies}:any)=>{
  // const [open, setOpen] = useState<boolean>(true);

  // const [movies, setMovies] = useState<fetchMovies[]>([])
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleGet = async () => {
  //   try {
  //     const movie = await getDataMovies("_id genre image_url title year")
  //     setMovies(movie?.data?.data?.fetchMovies)
  //   }
  //   catch (err:any) {
  //     alert(err?.response?.data?.errors[0]?.message || "Something Went Wrong Please Try Again Later.")
  //   }
  //   handleClose()
  // }
  // useEffect(() => {
  //   handleGet();
  // }, [])
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
            <h2 style={{ "fontSize": "30px", display: "flex", justifyContent: "center" }}>Latest Movies</h2>
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            {
                movies.map((item:fetchMovies, index:number) => {
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
                        <label>{truncateString(item?.title, 23)}</label>
                        <br />
                        <label>Genre : {truncateString(item?.genre, 20)}</label>
                        <br />
                        <label>Year : {item?.year}</label>
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

export async function getServerSideProps() {
  const movie = await getDataMovies("_id genre image_url title year")
  return{
    props:{
      movies:movie?.data?.data?.fetchMovies
    }
  }
}