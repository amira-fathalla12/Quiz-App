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

//* quiz
export interface Quiz {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: "open" | "closed";
  instructor: string;
  group: string;
  questions_number: number;
  questions: QuizQuestion[];
  schadule: "2025-02-15T21:19:34.000Z";
  duration: 60;
  score_per_question: 5;
  type: "BE";
  difficulty: "medium";
  updatedAt: "2025-01-02T11:20:49.102Z";
  createdAt: "2025-01-02T11:20:49.102Z";
  __v: 0;
  participants: 0;
}

//* questions
export interface QuizQuestion {
  _id: string;
  title: string;
  options: Answers;
}

export interface Question extends QuizQuestion {
  description: string;
  answer: "A" | "B" | "C" | "D";
  status: string;
  instructor: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  type: "BE" | "FE" | "DO";
}

//* answers
export interface Answers {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}
