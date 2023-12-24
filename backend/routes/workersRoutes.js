const express = require("express")

const router = express.Router()
const workersController = require("../controllers/workersController")


router.get("/", workersController.getAllWorkers)
router.put("/:id", workersController.updateWorker)
router.get("/:id", workersController.getWorkerById)
router.delete("/:id", workersController.deleteWorker)
router.post("/", workersController.addWorker)

module.exports = router;
