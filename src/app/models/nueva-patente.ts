export class nuevaPatente {
  id!: number;
  user_name!: string;
  patente!: string;
  constructor(patente: string, nombreUsuario: string) {
    this.patente = patente;
    this.user_name = nombreUsuario;
  }
}
