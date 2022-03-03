import { Component, OnInit } from '@angular/core';
import { CurrentAccount } from 'src/app/models/CurrentAccount';
import { CurrentAccountDataDTO } from 'src/app/models/CurrentAccountDataDTO';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class accountComponent implements OnInit {
  currentAccountData!: CurrentAccountDataDTO;
  show = false;
  amount!: number; // monto a cargar

  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  //obtenemos los datos del usuario + su cuenta corriente.
  public loadUserData() {
    this.userService
      .getData(this.tokenService.getUserName()!)
      .subscribe((data: any) => {
        this.currentAccountData = new CurrentAccountDataDTO(
          data.name,
          data.username,
          data.email,
          data.currentAccount
        );
      });
  }

  //los metodos debitar y cargar deberian ser implementados en un service para cuenta corriente.
  public chargeBalance() {
    if (+this.amount < 0) {
      this.errorNegativeAmount();
    } else {
      if (this.amount == undefined) {
        this.errorInputEmpty();
      } else {
        if (this.amount < 100) {
          this.errorMinAmount();
        } else {
          this.succesfulCharge();
        }
      }
    }
  }

  public succesfulCharge() {
    //Si se presiona aceptar entonces se realiza la carga del saldo.
    //sino se cancela la operacion.
    Swal.fire({
      title: 'Cargando saldo',
      text: 'Usted cargará $' + this.amount + ' a su cuenta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        let currentAccount = new CurrentAccount(
          +this.amount,
          this.tokenService.getUserName()
        );
        currentAccount.id = this.currentAccountData.currentAccount.id;
        this.userService.chargeBalance(currentAccount).subscribe(
          (data) => {
            this.show = false;
            window.location.reload();
          },
          (err) => {
            Swal.fire({
              width: 350,
              icon: 'error',
              title: err.error.errors[err.error.errors.length - 1],
              showConfirmButton: false,
              timer: 2500,
            });
          }
        );
      }
    });
  }

  private errorNegativeAmount() {
    Swal.fire(
      'El monto ingresado es invalido',
      'Debe ingresar un monto mayor a 0'
    );
  }

  private errorInputEmpty() {
    Swal.fire('El monto ingresado es invalido', 'Debe ingresar un monto');
  }

  private errorMinAmount() {
    Swal.fire('El monto ingresado es invalido', 'El monto minimo es de $100');
  }
}
