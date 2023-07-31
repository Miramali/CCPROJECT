// const express = require("express");
// const router = express.Router();
// const downloadController = require('../Controllers/downloadController')
// const auth = require("../middleware/auth")
// const upload = require('../middleware/upload')



// router.use(auth)

// // Define the route for mentee to upload CV
// router.post("/cv/upload/:id", upload.single("cv"), downloadController.uploadCV);

// // Define the route for mentor to download CV
// router.get("/cv/download/name", downloadController.downloadcv);



// module.exports = router;


const express = require("express");
const router = express.Router();
const downloadController = require('../Controllers/downloadController')
const auth = require("../middleware/auth")
const upload = require('../middleware/upload')



router.use(auth)

// Define the route for mentee to upload CV
router.post("/cv/upload/:id", upload.single("cv"), downloadController.uploadCV);
router.post("/cv/upload/avatar/:id", upload.single("avatar"), downloadController.uploadAV)

// Define the route for mentor to download CV
router.get("/cv/download/name", downloadController.downloadcv);



module.exports = router;