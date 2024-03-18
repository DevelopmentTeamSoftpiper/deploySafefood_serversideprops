import { createRouter } from "next-connect";
import db from "../../../utils/db";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import applyCors from "@/middleware/cors";
import { RATE_LIMIT_TIME_MIN } from "@/utils/constants";
import { verifyCaptcha } from "@/utils/helper";
import { getIpAddress, rateLimiterMiddleware } from "@/utils/rate-limiter";
const router = createRouter();

router.post(async (req, res) => {
  const { emailId, password, captcha } = req.body;

  try {
    const verify = await verifyCaptcha(captcha);

    if (!verify)
      return res.status(400).json({
        error: "Your are not verified user",
      });

      const ip = await getIpAddress();
    if (ip !== null) {
      if (!rateLimiterMiddleware(ip)) {
        return res.status(400).json({
          error: `Too Many Requests. Try again ${RATE_LIMIT_TIME_MIN} after  minutes.`,
        });
      }
    }

    db.connectDb();
    const user = await User.findOne({ email: emailId });
    if (!user) {
      return res.status(400).json({
        error:
          "User with this email does not exist. Please sign up first to login",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Password is incorrect. Please try again",
      });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    const { _id, name, email, role } = user;
    return res.json({
      token: token,
      user: { _id, name, email, role },
      message: "Sign in successful",
    });
  } catch (error) {
    return res.json({
      message: "something went wrong",
    });
  }
});

export default applyCors(router.handler());
