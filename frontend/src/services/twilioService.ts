
// This is a frontend service for interacting with Twilio OTP functionality
// In a production environment, these API calls should be proxied through a backend

interface SendOTPResponse {
  success: boolean;
  message: string;
  sid?: string;
}

interface VerifyOTPResponse {
  success: boolean;
  message: string;
}

/**
 * In a production app, this would call your backend API, which would then use Twilio SDK
 * For demo purposes, we're simulating the API calls
 */
export const sendOTP = async (phoneNumber: string): Promise<SendOTPResponse> => {
  try {
    // Simulate an API call to your backend
    // In a real app, this would call your backend which uses Twilio SDK
    console.log(`Sending OTP to ${phoneNumber}`);
    
    // For demo, we'll simulate a successful response
    // In production, this would be handled by a backend API
    return {
      success: true,
      message: "OTP sent successfully",
      sid: "SM" + Math.random().toString(36).substring(2, 15),
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      message: "Failed to send OTP. Please try again.",
    };
  }
};

export const verifyOTP = async (phoneNumber: string, otp: string): Promise<VerifyOTPResponse> => {
  try {
    // Simulate API call to verify OTP
    console.log(`Verifying OTP ${otp} for ${phoneNumber}`);
    
    // For demo purposes, let's validate any 6-digit code
    // In production, this would call your backend API which uses Twilio to verify
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      return {
        success: true,
        message: "OTP verified successfully",
      };
    } else {
      return {
        success: false,
        message: "Invalid OTP. Please try again.",
      };
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return {
      success: false,
      message: "Failed to verify OTP. Please try again.",
    };
  }
};
