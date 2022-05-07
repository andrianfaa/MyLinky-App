export interface User {
  uid: string;
  photo: string;
  name: string;
  email: string;
}

export interface InitialState {
  isAuth: boolean;
  token: string | null;
  user: User | null;
}