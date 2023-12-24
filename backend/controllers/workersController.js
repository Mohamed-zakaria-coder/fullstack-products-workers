const Workers = require("../models/Workers");

const workersController = {


  getAllWorkers: async (req, res) => {
    try {
      const products = await Workers.find();
      res.json(products);
    } catch (err) {
      console.error("Error fetching products", err);
      res.status(500).json({ err: "Internal server error" });
    }
  },
  addWorker: async(req,res) => {
    const newWorker = req.body
    const {email} = newWorker

    try{
        const existingWorker = await Workers.findOne(email)
        if(existingWorker){
           return res.status(400).json({error: "Worker with the same email exists"})
        }
        const addedWorker = await Workers.create(newWorker)
        res.status(201).json(addedWorker)
    } catch(err){
        console.error("Error adding new worker", err)
        res.status(500).json({err: "Internal server error"})
    }
  },
  getWorkerById: async (req, res) => {
    const workerId = req.params.id;
    try {
      const worker = await Workers.findById(workerId);
      if (worker) {
        res.json(worker);
      } else {
        res.status(404).json({ err: "Worker not found" });
      }
    } catch (err) {
      console.error("Error fetching worker by id", err);
      res.status(500).json({ err: "Internal server error" });
    }
  },

  updateWorker: async (req, res) => {
    const workerId = req.params.id;
    try {
      const worker = await Workers.findByIdAndUpdate(workerId, req.body, {
        new: true,
      });
      if (worker) {
        res.json(worker);
      } else {
        res.status(404).json({ err: "Worker not found" });
      }
    } catch (err) {
      console.error("Erorr updating the worker", err);
      res.status(500).json({ err: "Internal server error" });
    }
  },

  deleteWorker: async (req, res) => {
    const workerId = req.params.id;
    try {
      const result = await Workers.findByIdAndDelete(workerId);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ err: "Worker not found" });
      }
    } catch (err) {
      console.log("Error deleting a worker", err);
      res.status(500).json({ err: "Internal server error" });
    }
  },
};

module.exports = workersController