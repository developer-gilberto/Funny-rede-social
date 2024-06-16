const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const authServices = require("./services/authServices");
const usersMiddleware = require("./middlewares/usersMiddleware");
const usersController = require("./controllers/usersController");

router.use(fileUpload());

// GET
router.get("/createAccount", 
    usersController.loadCreateAccount
);

router.get("/profile",
    authServices.authorizeUser,
    usersController.loadUserProfile
);

router.get("/home",
    authServices.authorizeUser,
    usersController.loadUserHome
);

router.get("/logout",
    authServices.logout
);

// POST
router.post("/registerAccount",
    usersMiddleware.checkIfEmailInUse,
    usersMiddleware.encryptPassword,
    usersController.registerAccountDB
);

router.post("/login",
    usersMiddleware.validateEmailAndPassword,
    usersMiddleware.checkIfAccountExist,
    usersMiddleware.checkIfPasswordTrue,
    authServices.authenticateUser,
    usersController.redirectUserHome
);

router.post("/publish",
    authServices.authorizeUser,
    usersMiddleware.uploadImgPub,
    usersMiddleware.registerPubDB,
    usersController.redirectUserHome
);

router.post("/sendProfilePic",
    usersMiddleware.uploadProfilePic,
    usersMiddleware.registerProfilePicDB,
    usersController.redirectUserProfile
);

module.exports = router;