const mongooseHidden = require("mongoose-hidden")();
const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio."],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria."],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, "El rol es obligatorio."],
    enum: ["ADMIN_ROL", "USER_ROL"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria."],
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.plugin(mongooseHidden, {
  hidden: { _id: false, password: true },
});

module.exports = model("Usuario", usuarioSchema); // Mongoose le agrega la 's' al final del nombre a la colección.
