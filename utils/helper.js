import { get, set } from "lodash";
import { RATE_LIMIT, RATE_LIMIT_TIME } from "./constants";
import axios from "axios";

export const getDiscountedPricePercentage = (
  originalPrice,
  discountedPrice
) => {
  const discount = originalPrice - discountedPrice;

  const discountPercentage = (discount / originalPrice) * 100;

  return discountPercentage.toFixed(2);
};

const rateLimit = RATE_LIMIT;
const rateLimiter = {};

export const rateLimiterMiddleware = (ip) => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_TIME;
  const requestTimestamps = get(rateLimiter, ip, []).filter(
    (timestamp) => timestamp > windowStart
  );
  requestTimestamps.push(now);
  set(rateLimiter, ip, requestTimestamps);
  return requestTimestamps.length <= rateLimit;
};

export const verifyCaptcha = async (captcha) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${"6Lf5AZ0pAAAAACWBsl2Ng5q0dr-kiSFMKYdewIEW"}&response=${captcha}`;

  const { data } = await axios.post(url);

  if (data.success) {
    return data.success;
  } else false;
};
