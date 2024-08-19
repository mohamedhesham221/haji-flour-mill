import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "./models/User.js";

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

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