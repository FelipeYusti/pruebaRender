const express = require("express");
// configuracion de .env
require("dotenv").config();

const cors = require("cors"); // activamos cors

const PORT = process.env.PORT || 4100; // CONFIGURAMOS EL PUERTO

const { config } = require("dotenv");

const app = express();
/* let permitidas = {
  origin: "http://127.0.0.1:5500"
}; */

app.use(cors());
app.use(express.json()); // esto es para serializar los request y los response

const port = process.env.PORT || 4100;
app.use("/", require("./src/aprendiz.js"));

app.listen(port, () => {
  
  console.log(`API rest encendida en el puerto ${PORT} `);
});


