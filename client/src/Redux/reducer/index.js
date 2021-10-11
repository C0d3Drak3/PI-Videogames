import {
    GET_ALL_GAMES,
    GET_ALL_GENRES,
    SET_NAME,
    SET_ORDER,
    SET_PAGE,
    GET_GAME,
    CREATE_GAME,
    REMOVE_GAME,
    FILTER_GENRE,
    FILTER_ORIGIN
    }from '../actions/index.js'


const initialState ={
    videogames:[],
    videogame:{},
    newVideogame: [],
    filteredGames: [],
    genres:[],
    name:"",
    order:"",
    page:1,
    filter: "all",
    }


export default function reducer (state = initialState, {type, payload}){
    switch (type) {
       
        case GET_ALL_GAMES:
            return {
               ...state,
                videogames: payload
            }
        case GET_ALL_GENRES:
            return{
                ...state,
                genres: payload
            }
        case GET_GAME:
            return{
                ...state,
                videogame: payload
            }
        case CREATE_GAME:
            return {
                ...state,
                newVideogame: payload
            };
        case REMOVE_GAME:
            return{
                ...state,
                videogame:payload
            }
        case SET_NAME:
            return{
                ...state,
                name: payload
            }
        case SET_PAGE:
            return{
                ...state,
                page: payload
            }
        case SET_ORDER:
            return{
                ...state,
                order: payload
            }
        case FILTER_GENRE:
            if (payload === "all") {
                return {
                    ...state,
                    filteredGames: state.videogames,
                    filter: payload,
                }
            } else {
                return {
                    ...state,
                    filteredGames: state.videogames.map((f) => {
                       return f.genres.id === payload}
                    ),
                    filter: payload,
                }
            };
        case FILTER_ORIGIN:
            const filteredGames = state.videogames.result.filter(c =>{
                return c.id === payload
            })
            return{
                ...state,
                videogames:{
                    ...state.videogames,
                    result:filteredGames
                } 
            }
        default:
            return state
    }

}

