const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const recipeRoutes = require('./routes/recipe.js');
const userRoutes = require('./routes/user.js');
const { connectDB } = require('./config/db.js');
const path = require('path');


const port = process.env.PORT || 4000;

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json());
app.use(cors());
app.use("/recipe", recipeRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
    try {
        connectDB();
        console.log("Server is running at port", port);
    } catch (error) {
        console.error(error);
    }
});



// bharat - Bharat@123