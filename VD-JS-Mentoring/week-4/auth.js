const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const userList = [];

module.exports.addUser = (username, password) => {
  userList.push({ username, password });
};

const fetchUser = (username) => userList.filter((i) => i.username === username)[0];

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const user = await fetchUser(username);
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

passport.use(new LocalStrategy((username, password, done) => {
  const user = fetchUser(username);
  if (username === user.username && password === user.password) {
    done(null, user);
  } else {
    done(null, false);
  }
}));

// const FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//   clientID: 'your-client-id',
//   clientSecret: 'your-secret',
//   callbackURL: `http://localhost:${process.env.PORT || 3000}/auth/facebook/callback`,
// },
// ((token, tokenSecret, profile, done) => {
//   // retrieve user ...
//   fetchUser().then((user) => done(null, user));
// })));
