const express = require('express')
const conectarBD = require('./config/db')
const config = require('./config/global')
const cors = require('cors')

const app = express()

conectarBD()

app.use(cors())
app.use(express.json())

app.use('/api/usuario', require('./routes/usuario'))




app.listen(config.port, () =>{

    console.log(`el servidor esta corriendo en el puerto ${config.port}`)

})