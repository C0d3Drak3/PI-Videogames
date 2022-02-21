const { Videogame, Genre, Op} = require("../db");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const {apiKey} = process.env;


//Posteo
const addVideogame = (req,res, next)=>{
    const { name, description, released, rating, platforms, genre } = req.body;
    let videogame= {
        name,
        background_image: "https://cdn.vox-cdn.com/thumbor/vkdYvfcM_2BU6lMw5tLrwfQ0ovQ=/0x0:1020x680/920x613/filters:focal(429x259:591x421):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/64915557/2013-11-22_13-13-07.0.jpg",
        description,
        released,
        rating,
        platforms,
        genre
    }

    Videogame.create({...videogame})
    .then((e)=>{e.addGenre(videogame.genre)
    })
    .then((created)=>{return res.json(created).send(created)})
/*     Videogame.create(videogame)
    .then(videogame=>{
        videogame.addGenre(genre)
      res.json({...videogame, genre})
    }) */
    .catch((error)=> next(error))
    
   
}

//Get por nombre y general
async function getVideogames(req, res, next){
    try {
        let {name, order, page, genero} = req.query
        
        
        let apiVideogames
        let dbVideogames
        let allGames=[]
        page = page ? page : 1 
        const charXPage = 15;
        //Busco por nombre
        if(name && name !== ""){
            let apiVideogames1 = (await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page_size=40&page=1`)).data.results
            let apiVideogames2 = (await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page_size=40&page=2`)).data.results
            let apiVideogames3 = (await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page_size=40&page=3`)).data.results
            apiVideogames=apiVideogames1.concat(apiVideogames2, apiVideogames3)
            
            dbVideogames= await Videogame.findAll({
                where:{
                    name:{
                        [Op.iLike]: `%${name}%`
                    }
                },
                include: [{
                    model: Genre, 
                    attributes: ['name', 'id'],
                    through: {
                      attributes: []
                    }
                }]
            })
            allGames= dbVideogames.concat(apiVideogames)
            let infoGames =  allGames.map((e)=>(
                {
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                rating: e.rating,
                genres: e.genres,
                genresId: e.genres.map(g=>g.id)
                }))
                allGames= infoGames
        }
        //Busco los primeros 120 + DB
        else{
            let apiVideogames1 = (await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=1`)).data.results
            let apiVideogames2 = (await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=2`)).data.results
            let apiVideogames3 = (await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=3`)).data.results
            apiVideogames=apiVideogames1.concat(apiVideogames2, apiVideogames3)
            
            dbVideogames= await Videogame.findAll({include: [{
                model: Genre, 
                attributes: ['name', 'id'],
                through: {
                  attributes: []
                }
            }]})

            allGames= dbVideogames.concat(apiVideogames)
            let infoGames =  allGames.map((e)=>(
            {
            id: e.id,
            name: e.name,
            background_image: e.background_image,
            rating: e.rating,
            genres: e.genres,
            genresId: e.genres.map(g=>g.id)
            }))
            allGames= infoGames
        }
        
        
        //Orden por Rating y Alfabetico
        if(order === "ratingDes"){
            allGames = allGames.sort((a,b) =>{
                if(a.rating > b.rating) return -1 
            })
        }else if(order === "ratingAsc"){
            allGames = allGames.sort((a,b) =>{
                if(a.rating < b.rating) return -1 
            })
        }else if(order === "asc" || !order || order === ""){
            allGames = allGames.sort((a,b) =>{
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            })
        }else{
            allGames = allGames.sort((a,b) =>{
                return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            })
        }
        
        //filtrado por genero en back para un mejor resultado
        /* if (genero === "all") {
            allGames= allGames
        } else {
            console.log("todos los juegos", allGames)
            console.log( "id a buscar",genero)
            var filterGames = allGames.filter(v =>v.genresId.includes(parseInt(genero)))
            console.log( "Juegos Filtrados", filterGames)
            allGames = filterGames}
                 */
             
        

        //Resultados a mostrar por página
            let videogames = allGames.slice((charXPage * (page -  1)) , (charXPage * (page -  1)) + charXPage )
        
        
        return res.send(videogames)

    } catch (error) {
        next(error)
    }
}
 
//Los obtengo por ID
async function getVideogameById(req,res,next){
    try {
        const { id } = req.params
        let videogame;
        //DB
        if(isNaN(id)){
            videogame = await Videogame.findOne({
                where: {id:id},
                include: [{
                    model: Genre, 
                    attributes: ['name', 'id'],
                    through: {
                      attributes: []
                    }
                }],
            })
            let videogameDetail =  
                {
                name: videogame.name,
                background_image: videogame.background_image,
                description: videogame.description,
                rating: videogame.rating,
                released: videogame.released,
                platforms: videogame.platforms,
                genres: videogame.genres.map((e)=>e.name)

                }
            videogame = videogameDetail
        }else{
        //API
            videogame = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)).data
            let videogameDetail =  
                {
                name: videogame.name,
                background_image: videogame.background_image,
                description: videogame.description,
                rating: videogame.rating,
                released: videogame.released,
                platforms: videogame.platforms.map((e)=> e.platform.name),
                genres: videogame.genres.map((e)=>e.name)
                }
            videogame = videogameDetail
            
        }

        return res.json(videogame)
    } catch (error) {
        next(error)
    }
} 

module.exports={
   addVideogame,
   getVideogames, 
   getVideogameById
}

