export interface User {
  uid: string;
  username: string;
  email: string;
}

export interface InitialState {
  isAuth: boolean;
  token: string | null;
  user: User | null;
}
