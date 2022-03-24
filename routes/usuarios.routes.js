const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),

    check("password")
      .isLength({ min: 6 })
      .withMessage("El password debe contener al menos seis caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/
      )
      .withMessage(
        "El password debe contener al menos: una mayúscula, una minúscula, un número y un caracter especial"
      ),

    check("correo", "El correo no es válido").isEmail(),
    check("rol", "No es un rol válido").isIn(['ADMIN_ROLE','USER_ROL']),
  ],
  usuariosPost
);

router.put("/:id", usuariosPut);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
