import { Component, OnInit } from '@angular/core';
import { PatenteService } from 'src/app/service/patente.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TokenService } from 'src/app/service/token.service';
import { nuevaPatente } from 'src/app/models/nueva-patente';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nueva-patente',
  templateUrl: './nueva-patente.component.html',
  styleUrls: ['./nueva-patente.component.css'],
})
export class NuevaPatenteComponent implements OnInit {
  isLogged = false;
  numero!: any;
  usuarioPatente!: nuevaPatente;
  expresiones = {
    tipo1: /([a-zA-Z]{3}\d{3})|([a-zA-Z]{2}\d{3}[a-zA-Z]{2})/,
  };

  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private patenteService: PatenteService,
    private authService: AuthService
  ) //private activeModal : NgbActiveModal,

  {}

  ngOnInit(): void {}

  registrarPatente() {
    if (this.validarExpresiones(this.numero)) {
      this.usuarioPatente = new nuevaPatente(
        this.numero,
        this.tokenService.getUserName()!
      );
      this.patenteService
        .create(this.numero, this.tokenService.getUserName()!)
        .subscribe(
          (data: any) => {
            this.notificacionGuardado();
          },
          (err) => {
            this.errorEnGuardado(err.error.mensaje);
          }
        );
    }
  }

  validarExpresiones(patente: any): boolean {
    //valida que la patente ingresada cumpla con el formato tipo1
    // si no lo cumple lo informa en pantalla.
    //en validation[0] se almacena el valor que hizo coincidencia con la expresion.
    //si el valor almacenado es distinto de la patente entonces la patente ingresada contiene mas caracteres que los pedidos en la expresion. Por lo tanto es incorrecta
    const validation1 = patente.match(this.expresiones.tipo1);
    if (validation1 != null) {
      if (validation1[0] == patente) {
        return true;
      } else {
        this.errorNotificationExpresion();
        return false;
      }
    }
    //emitir alerta de que formato debe cumplir.
    this.errorNotificationExpresion();
    return false;
  }

  errorNotificationExpresion() {
    Swal.fire(
      'El formato ingresado es invalido',
      'Ejemplos de formatos aceptados: "AAA999" - "AA000AA"',
      'error'
    );
  }

  errorEnGuardado(mensaje: string) {
    console.log(mensaje);
    Swal.fire({
      width: 350,
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 2500,
    });
  }

  notificacionGuardado() {
    Swal.fire({
      width: 350,
      icon: 'success',
      title: 'patente registrada correctamente',
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }
}
