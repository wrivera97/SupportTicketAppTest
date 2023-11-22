import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tecnicos} from './models/tecnicos';
import { SystechService } from './shared/systech.service';
import { Orden } from './models/ordens';
import { Dispositivo } from './models/devices';
import { Marca } from './models/marca';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  seleccionarTecnico:any;
  seleccionarDispositivo: any;
  seleccionarMarca:any ;
  tecnicos:any;
  dispositivos:any;
  marcas:any;
  nuevaOrden: Orden | any;
  ordenSeleccionada: Orden | any;
  Ordenes: Orden | any;
  OrdenEstado:Orden | any ;
  

  constructor(private systechService: SystechService) {
  }

   ngOnInit() {
   this.getTecnicos();
   this.getEquipos();
   this.getMarcas();
   this.getOrdenes();
   this.seleccionarTecnico= new Tecnicos();
   this.seleccionarDispositivo= new Dispositivo();
   this.seleccionarMarca= new Marca;
   this.nuevaOrden=new Orden();
   this.ordenSeleccionada= new Orden();
   this.OrdenEstado =new Orden();
  }
  getTecnicos() {
    this.systechService.get('tecnico').subscribe(
      (response) => {
        this.tecnicos = response;

      }

    );
  }
  getTecnico(tecnico: Tecnicos){
    this.seleccionarTecnico.nombres = tecnico;
    this.systechService.get('tecnico?nombre'+ this.seleccionarTecnico.nombres).subscribe(
      (response) =>{
        this.seleccionarTecnico= response;
        console.log(response);
      }

    )

  }

  getDispositivo(dispositivo: Dispositivo){
    this.seleccionarDispositivo.tipo = dispositivo;
    this.systechService.get('dispositivo?tipo='+ this.seleccionarDispositivo.tipo).subscribe(
      (response) =>{
        this.seleccionarDispositivo= response;
        console.log(response);
      }

    )

  }

  getMarca(marca: Marca){
    this.seleccionarMarca.marca = marca;
    this.systechService.get('marca?marca='+ this.seleccionarMarca.marca).subscribe(
      (response) =>{
        this.seleccionarMarca= response;
        console.log(response);
      }

    )

  }
  getEquipos(){
    this.systechService.get('dispositivo').subscribe(
      (response) => {
        this.dispositivos=response;

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
        else{
          alert('error mi panita maus');
        }
      });
  }

  getOrdenes(){
this.systechService.get('orden').subscribe(
  (response)=>{
this.Ordenes=response;
    console.log(response);
  }
)

  }

  getOrden(idseleccionada: Orden){
    this.ordenSeleccionada.idingreso= idseleccionada;
this.systechService.get('orden?idingreso='+ this.ordenSeleccionada.idingreso).subscribe(
  (response)=>{
    this.ordenSeleccionada.idingreso=response;
    console.log(response);

  })

  }
  getOrdenEstado(){
this.systechService.get('orden?estado=BODEGA').subscribe(
  (response)=>{
    this.OrdenEstado.estado=response;
    console.log(response);

  })

  }
}
