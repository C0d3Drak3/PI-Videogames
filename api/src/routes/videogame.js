const { Router } = require('express');
const router = Router();
const {addVideogame, getVideogameById, getVideogames } = require('../controllers/videogameController')

/* router.get("/", )
router.get("/:id", ) */
router.post("/videogame", addVideogame )
router.get("/videogame/:id", getVideogameById)
router.get("/videogames", getVideogames)


module.exports = router;