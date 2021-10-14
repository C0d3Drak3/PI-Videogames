import axios from 'axios'
export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const SET_NAME = "SET_NAME"
export const SET_ORDER = "SET_ORDER"
export const SET_PAGE = "SET_PAGE"
export const GET_GAME = "GET_GAME"
export const CREATE_GAME = "CREATE_GAME"
export const REMOVE_GAME = "REMOVE_GAME"
export const FILTER_GENRE = "FILTER_GENRE"
export const FILTER_ORIGIN = "FILTER_ORIGIN"


//acción de postear un juego
export const createVideogame = (videogame)=> {
    return (dispatch)=>{
        axios.post(`http://localhost:3001/videogame`,videogame)
        .then(response =>{
            return dispatch({
                type: CREATE_GAME
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}


//acción de obtener los generos de la BD
export const getGenres = ()=> {
    return (dispatch)=>{
        axios.get(`http://localhost:3001/genres`)
        .then(genres =>{
            return dispatch({
                type: GET_ALL_GENRES,
                payload: genres.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}


//acción de obtener juego por id
export const getGame = (id)=>{
    return (dispatch)=>{
        axios.get(`http://localhost:3001/videogame/${id}`)
         .then((result)=>{
            return dispatch({
                type: GET_GAME,
                payload: result.data
            })
         })
         .catch((error)=>{
             console.log(error)
         })
        
    }
}

//acción de obtener todos los juegos
export const getGames = ({page, order, name})=>{
    return (dispatch)=>{
        axios.get(`http://localhost:3001/videogames?page=${page?page:1}&order=${order?order:""}&name=${name?name:""}`)
        .then(videogames =>{
            return dispatch({
                type: GET_ALL_GAMES,
                payload: videogames.data
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}


//acciones para setear pagina, orden y nombre a buscar
export const setName = (name)=>{
    return{
        type: SET_NAME,
        payload: name
    }
}
export const setPage = (page)=>{
    return{
        type: SET_PAGE,
        payload: page
    }
}
export const setOrder = (order)=>{
    return{
        type: SET_ORDER,
        payload: order
    }
}

//accion de quitar juego
export const removeGame = ()=>{
    return{
        type: REMOVE_GAME,
        payload: {}
    }
}

//acciones de filtros
 export const genreFilter =(genero)=>{
     console.log("me traigo los generos", genero)
    return{
        type: FILTER_GENRE,
        payload: genero
    }
} 

/* export function genreFilter(genero) {
    return async function (dispatch) {
        return dispatch({
            type: FILTER_GENRE,
            payload: genero,
        });
    };
} */

export const originFilter =(origin)=>{
    return{
        type: FILTER_ORIGIN,
        payload: origin
    }
}