import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "./models/User.js";

// Extracts the jwt token from request header and sets it to the options object along with jwt-secret.
let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

/**
 * Implements passport's JWT strategy to authenticate users.
 * If the token is verified and user is present in database, it will set user to the req object.
 *  */ 
export const customStrategies = (passport) => {
  passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      let user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));
}