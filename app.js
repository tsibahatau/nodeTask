const express = require('express');
const port = process.env.PORT || 3000;
const userController = require('./controllers/UserController');
const articlesController = require('./controllers/ArticlesController');
const commentsController = require('./controllers/CommentsController');
const authController = require('./controllers/AuthController');
const databaseConfig = require('./config/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
mongoose.connect(databaseConfig.mongo.url);


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));


// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    const sessionUser = { _id: user._id,  email: user.email }
    done(null, sessionUser)
});

passport.deserializeUser(function(sessionUser, done) {
    done(null, sessionUser)
});


const router = express.Router();

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated,userController.getUsers);

router.route('/articles')
    .post(authController.isAuthenticated,articlesController.postArticle)
    .get(authController.isAuthenticated,articlesController.getArticles);

router.route('/articles/:uid')
    .delete(authController.isAuthenticated,articlesController.deleteArticle)
    .get(authController.isAuthenticated,articlesController.getArticle)
    .put(authController.isAuthenticated,articlesController.updateArticle);

router.route('/articles/:uid/comments')
    .post(authController.isAuthenticated,commentsController.addComment);


app.use('/api', router);
app.listen(port);
module.exports = app;