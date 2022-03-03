import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Patent } from 'src/app/models/patent';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-patent',
  templateUrl: './edit-patente.component.html',
  styleUrls: ['./edit-patente.component.css'],
})
export class EditPatentComponent implements OnInit {
  @Input() patent!: Patent;
  number!: any;
  namePatent!: string;

  expression = {
    type1: /([a-zA-Z]{3}\d{3})|([a-zA-Z]{2}\d{3}[a-zA-Z]{2})/,
  };

  constructor(
    private patentService: PatenteService,
    public activeModal: NgbActiveModal,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.findById();
  }

  editPatent() {
    this.number = this.namePatent;
    console.log(this.number);

    console.log('asarasa ', this.namePatent);
    //if(this.number == this.patent.number){
    //Swal.fire('No se ha realizado ningun cambio','','info')
    //}else{
    if (this.validateExpression(this.number)) {
      let patenteEdit = new Patent(
        this.namePatent,
        this.tokenService.getUserName()
      );
      patenteEdit.id = this.patent.id;
      this.patentService.update(patenteEdit).subscribe(
        (data) => {
          this.notificacionSaved();
        },
        (err) => {
          console.log('error de editado: ', err);
          this.errorEdit(err.error.mensaje);
        }
      );
      // }
    }
  }
  closeWindow() {
    this.activeModal.close('Close click');
  }

  findById() {
    this.patentService.get(this.patent.id).subscribe({
      next: (data: Patent) => {
        console.log('dato de la patente obtenida: ', data);
        this.namePatent = data.user.nombreUsuario;
        this.patent = data;
      },
      error: (err) => {
        console.log('se produjo un error');
      },
    });
  }

  validateExpression(patent: any): boolean {
    //valida que la patente ingresada cumpla con el formato tipo1
    // si no lo cumple lo informa en pantalla.
    //en validation[0] se almacena el valor que hizo coincidencia con la expresion.
    //si el valor almacenado es distinto de la patente entonces la patente ingresada contiene mas caracteres que los pedidos en la expresion. Por lo tanto es incorrecta
    console.log('aca patente neuva ', patent);
    const validation1 = patent.match(this.expression.type1);
    console.log(' aca esta la validacion ', validation1);
    if (validation1 != null) {
      if (validation1[0] == patent) {
        return true;
      } else {
        this.errorExpressionNotification();
        return false;
      }
    }
    //emitir alerta de que formato debe cumplir.
    this.errorExpressionNotification();
    return false;
  }

  errorExpressionNotification() {
    Swal.fire(
      'El formato ingresado es invalido',
      'Ejemplos de formatos aceptados: "AAA999" - "AA000AA"',
      'error'
    );
  }
  errorEdit(mensaje: string) {
    Swal.fire({
      width: 350,
      icon: 'error',
      title: mensaje,
      showConfirmButton: true,
    });
  }

  notificacionSaved() {
    Swal.fire({
      width: 350,
      icon: 'success',
      title: 'patente editada correctamente',
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }
}
