const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStore = {}; // Temporary OTP store

const sendOTP = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = otp;

  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });

  return 'OTP sent successfully';
};

const verifyOTP = (phone, otp) => {
  if (otpStore[phone] === otp) {
    delete otpStore[phone];
    return true;
  }
  return false;
};

module.exports = { sendOTP, verifyOTP };
