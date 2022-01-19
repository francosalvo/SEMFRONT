import { Component, OnInit } from '@angular/core';
import { PatenteService } from 'src/app/service/patente.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TokenService } from 'src/app/service/token.service';



@Component({
  selector: 'app-nueva-patente',
  templateUrl: './nueva-patente.component.html',
  styleUrls: ['./nueva-patente.component.css']
})
export class NuevaPatenteComponent implements OnInit {


  

  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private patenteService: PatenteService,
    //private modalService: NgbModal,
    
    ) { }

  ngOnInit() {
  }

}
