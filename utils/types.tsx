import React from 'react'
export type fetchMovies={
  _id: string
  image_url: string
  title: string
  genre: string
  year: number
}
export type fetchGames={
  _id: string
  image_url: string
  name: string
  platform: string
}
export type graphQLUserInputData={
  email: string
  password: string
  newPassword: string
  confirmPassword: string
}
export type graphQLLogin={
  email: string
  password: string
}
export type graphQLFetchMovies={
  title:string
  rating:number
  image_url:string
  genre:string
  duration:number
  year:number
  review:string
  description:string
  _id:string
  createdAt:string
  updatedAt:string
}
export type graphQLFetchGames={
  name:string
  genre:string
  image_url:string
  singlePlayer:boolean
  multiPlayer:boolean
  platform:string
  release:number
  _id:string
  createdAt:string
  updatedAt:string
}

export type contextStates={
  user:string|null
  setUser:React.Dispatch<React.SetStateAction<string | null>>
  token:string|null
  setToken:React.Dispatch<React.SetStateAction<string | null>>
}

export type typeProps={
  children:React.ReactNode
}

export type typeRegister={
  email:string|null
  password:string
  confirm:string
}
export type typeLogin={
  email:string
  password:string
}
export type typeGamesTable ={
  id: 'no' | 'img_url' | 'name' | 'genre' | 'type' | 'platform' | 'release' | 'action';
  label: string;
  minWidth?: number;
}

export type typeMoviesTable ={
  id: 'no' | 'img_url' | 'title' | 'genre' | 'rating' | 'description' | 'year' | 'review' |'duration' |'action';
  label: string;
  minWidth?: number;
}
export type typePostDataMovie={
  title:string
  rating:number
  image_url:string
  genre:string
  duration:number
  year:number
  review:string
  description:string
}
export type typePostDataGame={
  name:string
  genre:string
  image_url:string
  singlePlayer:boolean
  multiPlayer:boolean
  platform:string
  release:number
}
export type typePutDataGame={
  name:string
  genre:string
  image_url:string
  singlePlayer:boolean
  multiPlayer:boolean
  platform:string
  release:number
}
export type typeModalProps={
  formik:any
  open:boolean
  handleClose:()=>void
  handleSubmit:(e:any)=>void
  mode:"create"|"edit"
  setSnackBar:React.Dispatch<React.SetStateAction<typeSnackBar>>
}

export type typeSnackBar={
  trigger:boolean
  severity:"success"|"error"|"warning"|"info"
  message:string
}