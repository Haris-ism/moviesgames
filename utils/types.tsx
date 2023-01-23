export type fetchMovies={
    _id: string
    image_url: string
    title: string
    genre: string
    year: number
  }Boolean!
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