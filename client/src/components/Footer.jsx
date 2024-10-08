import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Container from "./Container";

const Footer = () => {
  return (
    <Container bgColor={"#0C4A6E"}>
      <div className="min-h-[40vh] py-[10px] w-full bg-sky-900 flex flex-col md:flex-row px-2 md:px-0 text-white items-center justify-between">
        <div>
          <div className="flex gap-[20px]">
            <div className="w-[80px] flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dcj2gzytt/image/upload/v1710332234/avaters/yeixhkqcfb4t15gxgqzh.jpg"
                className="w-[60px]"
                alt="Company Logo"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[17px] font-semibold">
                Follow us on social media
              </p>
              <div className="flex items-center mt-2 gap-4 text-[20px]">
                <a href="https://www.facebook.com/profile.php?id=61553922564770&mibextid=ZbWKwL">
                <FaFacebookSquare />

                </a>
                <FaTwitter />
                <FaLinkedin />
                <a
                  href="https://www.instagram.com/satisfied.job?igsh=MWh1bTNkOGZjdmoyaQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <FaYoutube />
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-white mt-5"></div>
          <div className="flex gap-[70px] text-[10px] my-[10px]">
            <p>© 2024 Satisfide | All rights reserved</p>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>

        <div className="md:w-[450px] flex items-center justify-center gap-6 rounded-lg md:min-h-[25vh] text-black bg-white py-[10px] px-[10px] md:px-[10px] md:py-[20px]">
          <div className="flex flex-col items-start gap-2 justify-start">
            <a
              href="https://play.google.com/store/search?q=satisfied+job&c=apps"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-[16px] md:text-[22px] font-semibold">
                Apply on the go
              </p>
              <p>Get real-time job updates on our App</p>

              <img
                src="playstore.png"
                className="w-[120px] md:w-[150px] -mx-2"
                alt="Google Play Store"
              />
            </a>
          </div>
          <a href="https://play.google.com/store/search?q=satisfied+job&c=apps">
            <img
              src="./qr.png"
              className="w-[100px] md:w-[120px]"
              alt="QR Code"
            />
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
