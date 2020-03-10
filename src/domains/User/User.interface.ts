export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}

export interface IUsers {
  [key: number]: IUser 
}