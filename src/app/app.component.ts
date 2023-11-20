import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tecnicos} from './models/tecnicos';
import { SystechService } from './shared/systech.service';
import { DatePipe } from '@angular/common';
import { Orden } from './models/ordens';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tecnicos:any;
  equipos:any;
  marcas:any;
  nuevaOrden: any;

  constructor(private systechService: SystechService) {
  }

   ngOnInit() {
   this.getTecnicos();
   this.getEquipos();
   this.getMarcas();
   this.nuevaOrden=new Orden();
  }
  getTecnicos() {
    this.systechService.get('tecnico').subscribe(
      (response) => {
        this.tecnicos = response;
    
      }
    
    );
  }
  getEquipos(){
    this.systechService.get('equipo').subscribe(
      (response) => {
        this.equipos=response;
       
      }
    );
  }
  getMarcas(){
    this.systechService.get('marca').subscribe(
      (response) => {
        this.marcas=response;
      
      }
    );
  }

  postOrden(){
    this.systechService.post('orden', this.nuevaOrden).subscribe(
      (reponse) => {
        if (reponse) {
          alert('You successfully added a new recipe');
          this.nuevaOrden = new Orden();
          console.log(reponse);
        }
      });
  }
}
