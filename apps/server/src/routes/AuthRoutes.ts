import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";

passport.use(new OAuth2Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: "/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    // Here you would typically find or create a user in your database
    done((null), profile);
  }
));