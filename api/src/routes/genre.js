const { Router } = require('express');
const {getGenres} = require("../controllers/genreController")

const router = Router();

router.get("/", getGenres)

module.exports = router;