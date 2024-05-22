const router = require("express")
    .Router()
const controller = require('./controller')
const verifyToken = require('./middleware')
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Backend/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });


router
    .post("/signup", controller.signup)
    .post('/login', controller.login)
    .post('/addRecipe',upload.single('image'), controller.addRecipe)
    .post('/getRecipe', controller.getRecipe)
    .post('/getUserRecipe', controller.getRecipesForUser)
    .put('/recipes/:recipeId', controller.editRecipe)
    .delete('/recipes/:recipeId', controller.deleteRecipe)
    .get('/protected', verifyToken, (req, res) => {
        res.json({ message: 'Protected route', userId: req.userId });
    });
    

module.exports = router