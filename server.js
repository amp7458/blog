const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const app = express();

const mongoURI = 'mongodb://localhost:27017/blog';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoURI
  })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

require('./passport');

app.use('/posts', require('./routes/posts'));
app.use('/auth', require('./routes/auth'));

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
