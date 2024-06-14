const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const usersMiddleware = require("./middlewares/usersMiddleware");
const usersController = require("./controllers/usersController");

router.use(fileUpload());

// GET
router.get("/createAccount", 
    usersController.renderCreateAccount
);

router.get("/profile/:userName", //
    usersMiddleware.checkTokenValid,
    usersController.renderUserProfile
);

router.get("/home",
    usersMiddleware.checkTokenValid,
    usersController.renderUserHome
);

router.get("/logout/:userName",
    usersController.logout //EXCLUIR O TOKEN
);

// POST
router.post("/registerAccount",
    usersMiddleware.checkEmailInUse,
    usersMiddleware.encryptPassword,
    usersController.registerAccountDB
);

router.post("/login",
    usersMiddleware.validateUserEmailAndPassword,
    usersMiddleware.checkAccountExist,
    usersMiddleware.checkPassword,
    usersMiddleware.generateToken,
    usersController.redirectUserHome
);

router.post("/publish/:userName",
    usersMiddleware.checkTokenValid,
    usersMiddleware.uploadImgPub,
    usersMiddleware.registerPubDB,
    usersController.redirectUserHome
    // usersController.publish
);

module.exports = router;