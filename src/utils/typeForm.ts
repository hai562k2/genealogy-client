export type LoginForm = {
  email: string;
  password: string;
};

export type EmailExists = {
  email: string;
};

export type FormAddClan = {
  name: string;
  information: string;
  image?: string[];
};
