export class Patent {
  id!: number;
  patent: string;

  user!: {
    nombreUsuario: string;
  };

  constructor(patent: string, number: string) {
    this.patent = patent;
    this.user = { nombreUsuario: number };
  }
}
