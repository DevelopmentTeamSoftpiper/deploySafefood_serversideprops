
import { get, set } from "lodash";
import { RATE_LIMIT, RATE_LIMIT_TIME } from "./constants";


const rateLimit = RATE_LIMIT;
const rateLimiter = {};


export const rateLimiterMiddleware = (ip) => {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_TIME;
    const requestTimestamps = get(rateLimiter, ip, []).filter(
        (timestamp) => timestamp > windowStart,
    );
    requestTimestamps.push(now);

    set(rateLimiter, ip, requestTimestamps);

    return requestTimestamps.length <= rateLimit;
};

export const getIpAddress = async () => {
    try {
        const response = await fetch("https://api.ipify.org");
        const result = await response.text();
        return result;
    } catch (error) {
        throw error;
    }
};