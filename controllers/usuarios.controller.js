const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario"); //La 'U' mayúscula porque voy a crear instancias.


const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No Name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - Controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = async (req, res) => {
  

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Verificar si el correo existe
  const correoExiste = await Usuario.findOne({ correo });
  
  if (correoExiste) {
    return res.status(400).json({
      msg: `El correo ${correo} ya está registrado.`,
    });
  }
  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = (req, res) => {
  const { id } = req.params;
  res.json({
    msg: "put API - Controlador",
    id,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - Controlador",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - Controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
