import axios from "axios"
// import 'dotenv/config'
import { typePostDataGame,graphQLFetchGames,typePutDataGame, graphQLFetchMovies, graphQLUserInputData,graphQLLogin,typeRegister } from "./types"
export const getDataMovies = (input:string) => {
    console.log(process.env.NEXT_PUBLIC_GRAPHQL)
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            fetchMovies{
              ${input}
            }
          }`
    })
}
export const getDataGames = (input:string) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            fetchGames{
              ${input}
            }
          }`
    })
}
export const registration = (input:typeRegister) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `
        mutation{
            createUser(userInput:{
              email:"${input.email}",
              password:"${input.password}"
            }){
              email _id
            }
          }`
    })
}
export const login = (input:graphQLLogin) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            login(
                email:"${input.email}",
                password:"${input.password}"
            ){
              userId user token
            }
          }`
    })
}
export const changePassword = (input:typeRegister, token:string|null) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
        mutation{
            changePassword(
              email:"${input.email}",
              password:"${input.password}",
              confirmPassword:"${input.confirm}"
            ){
              password email
            }
          }
        `
    })
}
export const getDataGame = (id:string, input:string) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            fetchOneGame(id:"${id}"){
              ${input}
            }
          }`
    })
}
export const getDataMovie = (id:string, input:string) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        query: `{
            fetchOneMovie(id:"${id}"){
              ${input}
            }
          }`
    })
}
export const putDataGame = (id:string, input:typePutDataGame, token:string|null) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                editGames(id:"${id}",
                    inputGames:{
                        name: "${input.name}",
                        genre: "${input.genre}",
                        image_url: "${input.image_url}",
                        singlePlayer: ${input.singlePlayer},
                        multiPlayer: ${input.multiPlayer},
                        platform: "${input.platform}",
                        release: ${input.release}
                }){
                  name _id
                } 
              }`
    })
}
export const putDataMovie = (id:string, input:graphQLFetchMovies, token:string) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                editMovies(id:"${id}",
                    inputMovies:{
                        title: "${input.title}",
                        rating: ${input.rating},
                        image_url: "${input.image_url}",
                        genre: "${input.genre}",
                        duration: ${input.duration},
                        year: ${input.year},
                        review: "${input.review}",
                        description: "${input.description}"
                }){
                  title genre _id
                } 
              }`
    })
}
export const postDataGame = (input:typePostDataGame, token:string|null) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                createGames(inputGames:{
                    name: "${input.name}",
                    genre: "${input.genre}",
                    image_url: "${input.image_url}",
                    singlePlayer: ${input.singlePlayer},
                    multiPlayer: ${input.multiPlayer},
                    platform: "${input.platform}",
                    release: ${input.release}
                }){
                  name 
                } 
              }`
    })
}
export const postDataMovie = (input:graphQLFetchMovies, token:string|null) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                createMovies(inputMovies:{
                    title: "${input.title}",
                    rating: ${input.rating},
                    image_url: "${input.image_url}",
                    genre: "${input.genre}",
                    duration: ${input.duration},
                    year: ${input.year},
                    review: "${input.review}",
                    description: "${input.description}"
                }){
                  title _id
                } 
              }`
    })
}
export const deleteDataGame = (id:string, token:string|null) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                deleteGames(id:"${id}"){
                  name _id
                } 
              }`
    })
}
export const deleteDataMovie = (id:string, token:string) => {
    return axios.post(`${process.env.NEXT_PUBLIC_GRAPHQL}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        query: `
            mutation{
                deleteMovies(id:"${id}"){
                  title _id
                } 
              }`
    })
}