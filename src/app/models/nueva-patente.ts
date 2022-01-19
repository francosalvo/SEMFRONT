export class nuevaPatente {
    user_name!: string;
    patente!:string;
    constructor(patente: string, nombreUsuario: string) {
        this.patente = patente;
        this.user_name = nombreUsuario;
    }
    
}