const {Router} = require('../controllers/allExports')
const {Get,Post,Put,Patch,Delete,GetById,Login} = require("../controllers/orderController")
const {authenticateToken}=require('../controllers/allExports')


Router.get("/:db/user/",Get)
.post("/:db/user/",Post)
.patch("/:db/user/:id",Patch)
.put("/:db/user/:id",Put)
.get("/:db/user/:id",authenticateToken,GetById)
.delete("/:db/user/:id",Delete)

.get("/:db/data/",Get)
.post("/:db/data/",Post)
.patch("/:db/data/:id",Patch)
.put("/:db/data/:id",Put)
.get("/:db/data/:id",GetById)
.delete("/:db/data/:id",Delete)

.get("/:db/table/",Get)
.post("/:db/table/",Post)
.patch("/:db/table/:id",Patch)
.put("/:db/table/:id",Put)
.get("/:db/table/:id",GetById)
.delete("/:db/table/:id",Delete)

.get("/:db/login/",Login)
.post("/:db/login/",Post)
.patch("/:db/login/:id",Patch)
.put("/:db/login/:id",Put)
.get("/:db/login/:id",GetById)
.delete("/:db/login/:id",Delete)

.get("/:db/menu/",Get)
.post("/:db/menu/",Post)
.patch("/:db/menu/:id",Patch)
.put("/:db/menu/:id",Put)
.get("/:db/menu/:id",GetById)
.delete("/:db/menu/:id",Delete)

.get("/:db/inventory/",Get)
.post("/:db/inventory/",Post)
.patch("/:db/inventory/:id",Patch)
.put("/:db/inventory/:id",Put)
.get("/:db/inventory/:id",GetById)
.delete("/:db/inventory/:id",Delete)

.get("/:db/logs/",Get)
exports.routes = Router