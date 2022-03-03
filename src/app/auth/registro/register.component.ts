import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { newUser } from 'src/app/models/newUser';

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  newUser!: newUser;
  name!: string;
  nameUser!: string;
  email!: string;
  password!: string;
  errMsj!: string;
  isLogged = false;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister(): void {
    this.newUser = new newUser(
      this.name,
      this.nameUser,
      this.email,
      this.password
    );
    this.authService.new(this.newUser).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        Swal.fire({
          width: 350,
          icon: 'error',
          title: err.error.mensaje,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
  }
}
