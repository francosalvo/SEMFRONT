import { Component, Input, OnInit } from '@angular/core';
import { Patente } from 'src/app/models/patente';
import { PatenteService } from 'src/app/service/patente.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';



@Component({
  selector: 'app-lista-patente',
  templateUrl: './lista-patente.component.html',
  styleUrls: ['./lista-patente.component.css']
})
export class ListaPatenteComponent implements OnInit {

  @Input() name : any;
  mostrar = true;
  datosPatente: Patente[] = [];


  constructor(
    private usuarioService : UsuarioService,
    private tokenService : TokenService,
    private patenteService : PatenteService,
   // private modalService: ngModal
  ) { }

  ngOnInit() : void {

   this.getPatentes();

    
  }


  //obtengo la lista de las patentes del usuario iniciado
  getPatentes():void{

    this.usuarioService.getPatentes().subscribe((data: any) =>{
      console.log(data);
      this.datosPatente = data;
      if(data.length == 0){
        this.mostrar = false;
      }
  })
  }

}
