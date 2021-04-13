import { randomBytes } from 'crypto';

const {
  CLIENT_URL,
  SECRET,
  PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_KEY,
  GITHUB_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = process.env;

const randomKey = randomBytes(32).toString('hex');

export default () => ({
  port: parseInt(PORT, 10) || 5000,
  secret: SECRET || randomKey,
  clientURL: CLIENT_URL || 'http://localhost:3000',
  googleOptions: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/v1/users/google/callback',
  },
  facebookOptions: {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/api/v1/users/facebook/callback',
    profileFields: ['emails', 'name'],
  },
  githubOptions: {
    clientID: GITHUB_KEY,
    clientSecret: GITHUB_SECRET,
    callbackURL: '/api/v1/users/github/callback',
    scope: ['user:email'],
  },
});
