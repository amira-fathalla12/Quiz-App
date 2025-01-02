// login interface
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    profile: User;
  };
}
export type User = {
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: "Instructor" | "Learner";
};
// api error
export interface ApiError {
  data: {
    message: string;
  };
}

//* forget password
export interface forgetPasswordCredentials {
  email: string;
}

export interface forgetPasswordResponse {
  message: string; 
}

//* reset password
export interface resetPasswordCredentials {
  email: string;
  otp: string;
  password: string;
}

export interface resetPasswordResponse {
  message: string;
}