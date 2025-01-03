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
  schadule: string;
  duration: number;
  score_per_question: number;
  type: "BE" | "FE" | "DO";
  difficulty: "easy" | "medium" | "hard";
  updatedAt: string;
  createdAt: string;
  __v: number;
  participants: number;
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

export interface group {
  
    _id: string;
    name: string;
    status: string;
    instructor: string;
    students: string[];
    max_students: number;
    updatedAt: string;
    createdAt: string;
    __v: number; }
  
//* students
export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: "Student";
  group: group
}

export interface TopStudent extends Student {
  avg_score: number;
}



