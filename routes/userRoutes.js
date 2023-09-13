const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userControllers')

router.get("/:db/users",usersController.getAllUsers)
router.post("/:db/users",usersController.createNewUser)
router.patch("/:db/users",usersController.Patch)
router.put("/:db/users",usersController.Put)
router.delete("/:db/users",usersController.Delete)


router.get("/:db/datas",usersController.getAllUsers)
router.post("/:db/datas",usersController.createNewUser)
router.patch("/:db/datas",usersController.Patch)
router.put("/:db/datas",usersController.Put)
router.delete("/:db/datas",usersController.Delete)


router.get("/:db/devices",usersController.getAllUsers)
router.post("/:db/devices",usersController.createNewUser)
router.patch("/:db/devices",usersController.Patch)
router.put("/:db/devices",usersController.Put)
router.delete("/:db/devices",usersController.Delete)


// router.get("/:db/logsmodels",usersController.getAllUsers)
// router.post("/:db/homes",usersController.createNewUser)
// router.patch("/:db/homes",usersController.Patch)
// router.put("/:db/homes",usersController.Put)
// router.delete("/:db/homes",usersController.Delete)

module.exports = router