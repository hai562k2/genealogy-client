export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  email: string;
  name: string;
};

export type EmailExists = {
  email: string;
};

export type FormAddClan = {
  name: string;
  information: string;
  image?: string[];
};
