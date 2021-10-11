const { Router } = require('express');
const genres = require('./genre')
const videogames = require('./videogame')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/genres", genres )
router.use("/", videogames)

module.exports = router;
