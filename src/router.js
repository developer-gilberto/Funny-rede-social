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

router.get("/myProfile",
    authServices.authorizeUser,
    usersController.loadMyProfile
);

router.get("/home",
    authServices.authorizeUser,
    usersMiddleware.checkFriendRequest,
    usersController.loadUserHome
);

router.get("/logout",
    authServices.authorizeUser,
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

router.post("/editProfile",
    authServices.authorizeUser,
    usersMiddleware.uploadProfilePic,
    usersMiddleware.updateNewProfilePicDB,
    usersMiddleware.updateNewProfileNameDB,
    usersController.redirectMyProfile
);

router.get("/userProfile",
    authServices.authorizeUser,
    usersMiddleware.getUserProfileDB,
    usersMiddleware.getUserProfilePubsDB,
    usersMiddleware.getDataFriendship,
    usersController.renderUserProfile
);

router.post("/searchProfile",
    authServices.authorizeUser,
    usersMiddleware.searchAllUsersDB,
    usersController.renderFoundProfiles
);

router.get("/addFriend",
    authServices.authorizeUser,
    usersMiddleware.sendRequestFriendship,
    usersController.redirectUserProfile
);

router.get("/acceptFriend",
    authServices.authorizeUser,
    usersMiddleware.acceptRequestFriendship,
    usersController.redirectUserHome
);

module.exports = router;