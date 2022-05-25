export interface User {
  uid: string;
  username: string;
  email: string;
  avatar: string;
}

export interface InitialState {
  isAuth: boolean;
  token: string | null;
  user: User | null;
}
