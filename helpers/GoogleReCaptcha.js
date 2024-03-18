import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const GoogleReCaptcha = ({ setValue, className = "w-full" }) => {
  return (
    <ReCAPTCHA
      className={className}
      size="normal"
      sitekey={"6Lf5AZ0pAAAAAHbiNSmNYgrCjsamp6CvHGF8vfkL"}
      onChange={setValue}
    />
  );
};

export default GoogleReCaptcha;
