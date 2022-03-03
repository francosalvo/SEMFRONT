export class newPatent {
  id!: number;
  user_name!: string;
  patent!: string;
  constructor(patent: string, nameUser: string) {
    this.patent = patent;
    this.user_name = nameUser;
  }
}
