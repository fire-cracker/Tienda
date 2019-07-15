import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import env from 'dotenv';
import bcrypt from 'bcrypt';

import { sequelize } from '../../../model/index';


env.config();

const salt = bcrypt.genSaltSync(10);
const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const {
  FACEBOOK_APP_ID: facebookAppID,
  FACEBOOK_APP_SECRET: facebookAppSecret,
  DOMAIN: domain
} = process.env;

const callbackURL = `${domain}/customers/facebook/redirect`;

const profileFields = ['id', 'displayName', 'name', 'gender', 'profileUrl', 'email', 'photos'];
const facebookCredentials = {
  clientID: facebookAppID,
  clientSecret: facebookAppSecret,
  callbackURL,
  profileFields
};

export const passportCallback = (accessToken, refreshToken, {
  id, displayName, emails: [{ value: email }],
}, done) => {
  const profile = {
    displayName,
    email
  };

  profile.password = bcrypt.hashSync(id.slice(0, 7), salt);
  done(null, profile);
};

const facebookStrategy = new FacebookStrategy(facebookCredentials, passportCallback);


passport.use(facebookStrategy);
passport.use(new JWTStrategy(options, async (payload, done) => {
  try {
    const customer = await sequelize.query(
      'CALL customer_get_login_info (:param)', {
        replacements: { param: payload.email }
      }
    );

    if (!customer) {
      return done('Unauthorized', false);
    }

    return done(null, customer);
  } catch (error) {
    return done(error, null);
  }
}));

export default passport;
