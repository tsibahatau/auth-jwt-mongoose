const AuthenticationController = require('./controllers/authentication'),
  articlesController = require('./controllers/articlesController'),
  express = require('express'),
  passportService = require('./config/passport'),
  passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

module.exports = function (app) {

  const apiRoutes = express.Router(),
        blogRoutes = express.Router(),
        authRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);

  apiRoutes.use('/posts', blogRoutes);


  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  apiRoutes.use('/posts', blogRoutes);

  blogRoutes
    .get('/', requireAuth, articlesController.getArticles)
    .post('/', requireAuth, articlesController.postArticle);

// Set url for API group routes
  app.use('/api', apiRoutes);
};
