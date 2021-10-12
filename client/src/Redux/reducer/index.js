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
    allGames:[],
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
                videogames: payload,
                allGames: payload
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
                    videogames: state.allGames,
                    filter: payload,
                }
            } else {
                const filteredGames = state.videogames.result.filter(v =>{
                    return v.genres.filter(g=>g.id === payload)
                })
                return {
                    ...state,
                    videogames:{  ...state.videogames,
                        result:filteredGames}
                    
                }
            };
        case FILTER_ORIGIN:
            
            if(payload === "api"){
            return{
                ...state,
                videogames:{
                    ...state.videogames,
                    result:state.allGames.result.filter(v =>{
                        return v.id < 10000000 })
                } 
            }}else if(payload=== "db"){return{
                ...state,
                videogames:{
                    ...state.videogames,
                    result:state.allGames.result.filter(v =>{
                        return v.id.length> 7})
                } 
            } }else{return{
                ...state,
                videogames:{
                    ...state.videogames,
                    result:state.allGames}}
                }
            ;


        default:
            return state
    }

}

