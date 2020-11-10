const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { get, set } = require('./db');

module.exports.addUser = async (username, password) => {
  await set(username, JSON.stringify({ username, password, githubId: '' }));
};

const fetchUser = async (username) => {
  const res = await get(username);
  return JSON.parse(res);
};

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

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await fetchUser(username);
  if (user && username === user.username && password === user.password) {
    done(null, user);
  } else {
    done(null, false);
  }
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `http://127.0.0.1:${process.env.SERVER_PORT}/auth/github/callback`,
},
(async (accessToken, refreshToken, profile, done) => {
  const user = await fetchUser(profile.username);
  if (!user) {
    await set(profile.username, JSON.stringify({ username: profile.username, password: '', githubId: profile.id }));
  }
  done(null, await fetchUser(profile.username));
})));
