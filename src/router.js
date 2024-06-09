const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const usersMiddleware = require("./middlewares/usersMiddleware");
const usersController = require("./controllers/usersController");

router.use(fileUpload());

router.get("/createAccount", (req, res) => {
    res.render("pages/createAccount");
});

router.post(
    "/registerAccount",
    usersMiddleware.checkEmailInUse,
    usersMiddleware.encryptPassword,
    usersController.registerAccountDB
);

router.post(
    "/login",
    usersMiddleware.checkAccountExist,
    usersMiddleware.validatePassword,
    usersMiddleware.checkPassword,
    usersMiddleware.generateToken,
    usersController.redirectUserHome
);

router.get("/home",
    usersMiddleware.checkTokenValid,
    usersController.renderUserHome
);

router.post("/publish", usersController.pub);

module.exports = router;