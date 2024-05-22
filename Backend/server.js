const express = require('express');
const connectDB = require('./connection');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    if (req.originalUrl.includes("/undefined")) {
      req.url = req.originalUrl.replace("/undefined", "");
      req.originalUrl = req.url;
    }
    if (req.originalUrl.includes("//")) {
      req.url = req.originalUrl.replace("//", "/");
      req.originalUrl = req.url;
    }
    next();
  });

app.use(cors());
app.use(logger("dev"));
connectDB();

const router = require('./router')
app.use('/auth', router)
// app.get('/', (req, res) =>{
//     res.status(200).json({
//         message: 'Welcome to the'
//     })
// })

//------------Deployment-------------
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/Frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "Frontend", "build", "index.html"));
  });

//------------Deployment-------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));