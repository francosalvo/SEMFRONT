export class Patente {
  id!: number;
  patente: string;

  user!: {
    nombreUsuario: string;
  };

  constructor(patente: string, number: string) {
    this.patente = patente;
    this.user = { nombreUsuario: number };
  }
}
