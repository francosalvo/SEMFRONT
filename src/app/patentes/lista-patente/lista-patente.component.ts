import { Component, Input, OnInit } from '@angular/core';
import { Patente } from 'src/app/models/patente';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevaPatenteComponent } from '../nueva-patente/nueva-patente.component';
import { TimePriceDTO } from 'src/app/models/DTOTimePrice';
import { Parking } from 'src/app/models/Parking';
import { ParkingService } from 'src/app/service/parking.service';
import { EditPatentComponent } from '../edit-patente/edit-patente.component';

@Component({
  selector: 'app-lista-patente',
  templateUrl: './lista-patente.component.html',
  styleUrls: ['./lista-patente.component.css'],
})
export class ListaPatenteComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private patenteService: PatenteService,
    private modalService: NgbModal,
    private parkingService: ParkingService
  ) {}

  //@Input() name : any;
  mostrar = true;

  // variables de parking
  parkingOn = false;
  balance!: any;
  TimePrice: TimePriceDTO = new TimePriceDTO(0, 0, 0);
  interval: any;

  public datosPatente: Patente[] = [];

  pageSize = 5;

  public page = 1;

  ngOnInit(): void {
    this.getPatentes();
    this.getBalance();
    this.getTimePrice();
  }

  verifyParking(row: number) {
    let today = new Date();
    if (this.parkingOn) {
      this.endParking();
    } else {
      this.startParking(row, today);
    }
  }
  //obtengo la lista de las patentes del usuario iniciado
  getPatentes(): void {
    this.usuarioService.getPatentes().subscribe((data: any) => {
      console.log(data);
      this.datosPatente = data;
      if (data.length == 0) {
        this.mostrar = false;
      }
    });
  }
  // alertas y notificaciones de sweetAlert2
  errorStartParking(mensaje: string) {
    Swal.fire({
      title: 'No se inicio el estacionamiento',
      text: mensaje,
      icon: 'warning',
    });
  }

  errorEndParking(mensaje: string) {
    Swal.fire({
      title: 'No pudo finalizar el estacionamiento',
      text: mensaje,
      icon: 'warning',
    });
  }
  errorDelete(mensaje: string) {
    Swal.fire({
      title: 'No se puedo eliminar la patente',
      text: mensaje,
      icon: 'warning',
    });
  }

  alertaDelete(mensaje: string) {
    Swal.fire({
      title: mensaje,
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }

  eliminarPatente(row: number) {
    let patent = this.datosPatente[row - 1];
    console.log('patente: ', patent);
    this.patenteService.delete(patent.id).subscribe(
      (data) => {
        this.alertaDelete(data.mensaje);
      },
      (err) => {
        this.errorDelete(err.error.mensaje);
      }
    );

    ///modal registrar patente
  }
  registrarPatente() {
    this.modalService.open(NuevaPatenteComponent);
  }

  ///modal registrar patente
  savePatent() {
    this.modalService.open(NuevaPatenteComponent);
  }
  //editarPatente
  editPatent(row: number) {
    let patent = this.datosPatente[row - 1];
    console.log('patente a editar previa a envio: ', patent);
    const modalRef = this.modalService.open(EditPatentComponent);
    modalRef.componentInstance.patent = patent;
  }

  //verifica que se presione el boton "aceptar"
  //si se presiona aceptar -> se verifica que el saldo de la cuenta del usuario alcance para el minimo de una hora.
  //se crea un estacionamiento en la ddbb,
  startParking(row: number, today: Date): void {
    Swal.fire({
      title: 'Iniciando estacionamiento',
      text: 'Esta seguro que desea Iniciar estacionamiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      // si presionamos aceptar
    }).then((result) => {
      if (result.value) {
        let parking = new Parking(
          today.toString(),
          true,
          this.datosPatente[row - 1].patente
        );
        parking.username = this.tokenService.getUserName()!;
        //enviamos el estacionamiento-> si devuelve NULL entonces el estacionamiento no se pudo guardar
        // no se pudo guardar porque la patente ya se encuentra en un estacionamiento iniciado.
        this.parkingService.save(parking).subscribe(
          (data) => {
            this.parkingOn = true;
            window.location.reload();
          },
          (err) => {
            this.errorStartParking(err.error.mensaje);
          }
        );
      }
    });
  }

  //muestra un aviso.
  //si se presiona aceptar entonces se debita el saldo de la cuenta del usuario.
  //se vuelven a habilitar los botones de iniciar estacionamiento y se elimina el intervalo de "this.interval"
  //se invoca a la funcion "finalizar estacionamiento" del backend.
  endParking(): void {
    Swal.fire({
      title: 'Finalizando estacionamiento',
      text: 'Esta seguro que desea finalizar el estacionamiento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.parkingService.endParking().subscribe(
          (data) => {
            this.parkingOn = false;
            clearInterval(this.interval);
            window.location.reload();
          },
          (err) => {
            console.log('error: ', err);
            this.errorEndParking(err.error.mensaje);
          }
        );
      }
    });
  }

  //verificamos que haya una patente iniciada, si no hay ninguna iniciada se informa en la consola
  //sino se setea el intervalo de invocacion de esta funcion cada 1 minuto.
  getTimePrice() {
    this.parkingService.getParkingStartedByUser().subscribe((data: boolean) => {
      console.log('resultado de la consulta: ', data);
      if (data) {
        clearInterval(this.interval);
        this.interval = setInterval(() => this.getTimePrice(), 60000);
        this.parkingService.getTime().subscribe((data: TimePriceDTO) => {
          console.log('contenido de getHora: ', data);
          this.TimePrice.hours = data.hours;
          this.TimePrice.minutes = data.minutes;
          this.TimePrice.price = data.price;
          this.parkingOn = true;
        });
      }
    });
  }

  //obtenemos la cuenta corriente del usuario y seteamos nuestra variable "this.saldo" con "cuentaCorriente.saldo"
  getBalance(): void {
    let username = this.tokenService.getUserName()!;
    this.usuarioService.getCurrentAccount(username).subscribe((data: any) => {
      console.log(data);
      this.balance = data.balance;
    });
  }
}
