const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRoutes = require('./routes/productsRoutes');
const authenticateRoutes = require("./routes/authenticateRoutes")
const workersRoutes = require("./routes/workersRoutes")

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://anonymous2023:anonymous15552023@products.f08rdk3.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to the database'))
  .catch(error => console.error('Error connecting to the database', error));

app.use('/products', productsRoutes);
app.use('/user', authenticateRoutes);
app.use("/workers", workersRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
