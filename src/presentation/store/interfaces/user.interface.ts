export interface IUser {
    email: string;
    name: string;
    token: string;
    isLogged: boolean;
  }
  
  export const defaultValueUser: IUser = {
    email: '',
    name: '',
    token: '',
    isLogged: false,
  };