export class newUser {
  name: string;
  nameUser: string;
  email: string;
  password: string;
  user_rol: string;

  constructor(name: string, nameUser: string, email: string, password: string) {
    this.name = name;
    this.nameUser = nameUser;
    this.email = email;
    this.password = password;
    this.user_rol = '2';
  }
}
