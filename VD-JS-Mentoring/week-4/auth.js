const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const userList = [];

module.exports.addUser = (username, password) => {
  userList.push({ username, password, githubId: '' });
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

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
},
((accessToken, refreshToken, profile, done) => {
  const user = fetchUser(profile.username);
  if (!user) {
    userList.push({ username: profile.username, password: '', githubId: profile.id });
  }
  done(null, fetchUser(profile.username));
})));
