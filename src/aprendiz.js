const express = require("express");

const bcrypt = require("bcryptjs");

const bd = require("./bd.js"); //instanciamos la conexion a la bd

const aprendiz = express(); // invocamos el metodo constructor de la clase express
// rutas con consulta

aprendiz.get("/api/aprendiz/listartodos", (req, res) => {
  // hacemos las consultas
  let consulta = "SELECT * FROM aprendiz order by Apellido_APrendiz asc";
  bd.query(consulta, (error, aprendiz) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "Ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "Consulta Exitosa !",
        aprendiz: aprendiz
      });
    }
  });
});

//listar pot id
aprendiz.get("/api/aprendiz/listarporId/:id", (req, res) => {
  let id = req.params.id; // express : req -> request  params : extrae los parametros de la petecion = id.
  console.log(id);
  let consulta = "SELECT * FROM aprendiz WHERE id = ? ";

  bd.query(consulta, [id], (error, aprendiz) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "Ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "Consulta Exitosa !",
        aprendiz: aprendiz
      });
    }
  });
});

// listar por aprendizellido.
aprendiz.get("/api/aprendiz/listarporApellido/:apellido", (req, res) => {
  let apellido = req.params.apellido; // express : req -> request
  let consulta = "SELECT * FROM aprendiz WHERE Apellido_Aprendiz = ? ";

  bd.query(consulta, [apellido], (error, aprendiz) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "Ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "Consulta Exitosa !",
        aprendiz: aprendiz
      });
    }
  });
});

// ELIMINAR
aprendiz.delete("/api/aprendiz/borrarPorId/:id", (req, res) => {
  let id = req.params.id;

  let consulta = "DELETE FROM aprendiz WHERE id = ? ";
  bd.query(consulta, [id], (error, aprendiz) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "Ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "Registro borrado con exito !",
        aprendiz: aprendiz
      });
    }
  });
});

// crear un aprendiz
aprendiz.post("/api/aprendiz/crearAprendiz", (req, res) => {
  
  let fomrsDatos = {
    Nombre_Aprendiz: req.body.Nombre_Aprendiz,
    Apellido_Aprendiz: req.body.Apellido_Aprendiz,
    Email: req.body.Email,
    Password: bcrypt.hashSync(req.body.Password,'')
  };
  console.log(fomrsDatos);
  let consulta = "INSERT INTO aprendiz SET ? ";

  bd.query(consulta, [fomrsDatos], (error, respuesta) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "Ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "Consulta Exitosa !",
        respuesta: respuesta
      });
    }
  });
});

// Editar un aprendiz
aprendiz.put("/api/aprendiz/editarPorId/:id", (req, res) => {
  let id = req.params.id;
  let fomrsDatos = {
    Nombre_Aprendiz: req.body.Nombre_Aprendiz,
    Apellido_Aprendiz: req.body.Apellido_Aprendiz,
    Email: req.body.Email,
    Password: req.body.Pass
  };
  console.log(fomrsDatos);
  let consulta = "UPDATE aprendiz SET ? WHERE id = ?";

  bd.query(consulta, [fomrsDatos, id], (error, aprendiz /* resultado de la consulta*/) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "Ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "Actualizacion Exitosa !",
        aprendiz: aprendiz
      });
    }
  });
});

module.exports = aprendiz;
