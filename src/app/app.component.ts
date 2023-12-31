import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tecnicos} from './models/tecnicos';
import { SystechService } from './shared/systech.service';
import { Orden } from './models/ordens';
import { Dispositivo } from './models/devices';
import { Marca } from './models/marca';
import { Estado } from './models/estado';
import Swal from 'sweetalert2';
import { patchTest } from './models/patchtest.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /**templateUrl: './login/login.component.html',**/
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  seleccionarTecnico:any;
  seleccionarDispositivo: any;
  seleccionarMarca:any ;
  tecnicos:any;
  dispositivos:any;
  marcas:any;
  nuevaOrden: Orden | any;
  actualizarOrden: patchTest | any ;
  ordenSeleccionada:Orden| any ;
  Ordenes: Orden | any;
  OrdenEstado:Orden | any ;
  estado: Estado |any;
  currentDate = new Date();
  datatest:Orden| any;
  estados:Estado | any;
  archiveOrden: any;

  p:number =1;
  pb: number=1;
  pa: number =1;


  constructor(private systechService: SystechService) {
  }

   ngOnInit():void {

   this.getTecnicos();
   this.getEquipos();
   this.getMarcas();
   this.getOrdenes();
   this.getOrdenEstado();
   this.getEstados();
   this.seleccionarTecnico= new Tecnicos();
   this.seleccionarDispositivo= new Dispositivo();
   this.seleccionarMarca= new Marca;
   this.nuevaOrden=new Orden();
   this.ordenSeleccionada= new Orden();
   this.OrdenEstado =new Orden();
   this.estado = new Estado();
   this.actualizarOrden= new patchTest();
   this.datatest = new Orden();


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
        console.log(response)

      }

    )

  }

  getDispositivo(dispositivo: Dispositivo){
    this.seleccionarDispositivo.tipo = dispositivo.tipo;
    this.systechService.get('dispositivo?tipo='+ this.seleccionarDispositivo.tipo).subscribe(
      (response) =>{
        this.seleccionarDispositivo= response;

      }

    )

  }

  getMarca(marca: Marca){
    this.seleccionarMarca.marca = marca;
    this.systechService.get('marca?marca='+ this.seleccionarMarca.marca).subscribe(
      (response) =>{
        this.seleccionarMarca= response;

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
    this.nuevaOrden.estado = 'INGRESADO';
    this.nuevaOrden.fecha= this.currentDate;
    this.systechService.post('orden', this.nuevaOrden).subscribe(

      (response) => {
        if (response) {

          this.nuevaOrden = new Orden();
          this.getOrdenes();
          Swal.fire('Registro', 'Creado ', 'success')

        }
        else{
          Swal.fire('error ','error','error');
        }
      });
  }


/**  putOrden(actualizaOrden: Orden){
    this.actualizarOrden=actualizaOrden;
this.systechService.put('orden/' + this.actualizarOrden.id, this.actualizarOrden).subscribe(
  (response)=>{
    alert('ok mi panita mouse');
    console.log(response);
  }); */

patchOrden(ordenActualizada:patchTest){
this.actualizarOrden =ordenActualizada;
this.actualizarOrden.fechaactualizacion= this.currentDate;
this.systechService.patch('orden/'+ this.actualizarOrden.id , this.actualizarOrden).subscribe(
  (response)=>{
    if (response) {
      this.getOrdenes();
      Swal.fire('Registro', 'Actualizado ', 'success')

    }
    else{
      Swal.fire('error ','error','error');
    }

  });
  }



  getOrdenes(){
this.systechService.get('orden?estado=LISTO&estado=NOVEDAD&estado=INGRESADO&estado=REVISION&estado=PENDIENTE&estado=RETIRADO').subscribe(
  (response)=>{
this.Ordenes=response;


  }
)

  }

  getOrden(idseleccionada: Orden){
    this.ordenSeleccionada.idingreso= idseleccionada;
this.systechService.get('orden?idingreso='+ this.ordenSeleccionada.idingreso).subscribe(
  (response)=>{
    this.datatest=response;
console.log(response);
  })

  }


  getOrdenNombre(idseleccionada: Orden){
    this.ordenSeleccionada.nombres= idseleccionada;
this.systechService.get('orden?nombres='+ this.ordenSeleccionada.nombres).subscribe(
  (response)=>{
    this.datatest=response;
console.log(response);
  })

  }

  getOrdenCedula(idseleccionada: Orden){
    this.ordenSeleccionada.cedula= idseleccionada;
this.systechService.get('orden?cedula='+ this.ordenSeleccionada.cedula).subscribe(
  (response)=>{
    this.datatest=response;
console.log(response);
  })

  }
  getOrdenEstado(){
this.systechService.get('orden?estado=BODEGA').subscribe(
  (response)=>{
    this.OrdenEstado=response;

  })

}
getEstados(){
  this.systechService.get('estado').subscribe(
    (response)=>{
    this.estados=response;
    }
  )
}
getArchive(){
  this.systechService.get('orden?estado=ARCHIVADO').subscribe(
    (response)=>{
      this.archiveOrden=response;
    })

  }
}
