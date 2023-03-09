var crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const salt = "1213141";

const userInfo = {
  email: "nangmanh89@gmail.com",
  password: "Manh123456",
  rePassword: "Manh123456",
};

let varlidate = () => {
  let email;
  let password;
  let rePassword;
  let mailPatt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passPatt = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  // Minimum eight characters, at least one letter and one number:

  let handleInfoUser = {
    getInfo: () => {
      return { email, password, rePassword };
    },

    setUser: (mail, pass, rePass) => {
      email = mail;
      password = pass;
      rePassword = rePass;
    },

    deleteUser: () => {
      email = undefined;
      password = undefined;
      rePassword = undefined;
    },

    checkUser: () => {
      let checkEmail = mailPatt.test(email);
      let checkPassWord = passPatt.test(password);

      if (!checkEmail) {
        console.log("Email Wrong");
        return false;
      } else if (!checkPassWord) {
        console.log(
          "Minimum eight characters, at least one letter and one number"
        );
        return false;
      } else if (password !== rePassword) {
        console.log("Please re-enter pass");
        return false;
      } else {
        console.log("SignUp success");
        return true;
      }
    },
  };
  return handleInfoUser;
};

let input = varlidate();
input.setUser(userInfo.email, userInfo.password, userInfo.rePassword);

let checkOutput = input.checkUser();
let saltPass = userInfo.password + salt;

if (checkOutput) {
  let hash = crypto.createHash("sha256").update(saltPass).digest("base64");
  console.log(hash);
}

// Email config
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.APP_PASS,
  },
});

let mailDetails = {
  from: process.env.EMAIL_USERNAME,
  to: userInfo.email,
  subject: "Test mail",
  text: "Node.js testing mail for GeeksforGeeks",
};

mailTransporter.sendMail(mailDetails, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("Email sent successfully");
  }
});
