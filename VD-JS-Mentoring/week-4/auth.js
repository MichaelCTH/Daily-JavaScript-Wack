const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const fetchUser = (() => {
  const user = { id: 1, username: 'test', password: 'test' };
  return async function () {
    return user;
  };
})();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await fetchUser();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy((username, password, done) => {
  fetchUser()
    .then((user) => {
      if (username === user.username && password === user.password) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch((err) => done(err));
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

// const TwitterStrategy = require('passport-twitter').Strategy;

// passport.use(new TwitterStrategy({
//   consumerKey: 'your-consumer-key',
//   consumerSecret: 'your-secret',
//   callbackURL: `http://localhost:${process.env.PORT || 3000}/auth/twitter/callback`,
// },
// ((token, tokenSecret, profile, done) => {
//   // retrieve user ...
//   fetchUser().then((user) => done(null, user));
// })));

// const GoogleStrategy = require('passport-google-auth').Strategy;

// passport.use(new GoogleStrategy({
//   clientId: 'your-client-id',
//   clientSecret: 'your-secret',
//   callbackURL: `http://localhost:${process.env.PORT || 3000}/auth/google/callback`,
// },
// ((token, tokenSecret, profile, done) => {
//   // retrieve user ...
//   fetchUser().then((user) => done(null, user));
// })));
