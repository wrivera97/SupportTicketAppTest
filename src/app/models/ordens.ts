export  class Orden{
id:number;
idingreso:number;
nombres: string;
cedula: number;
telefono: number;
direccion: any;
tecnico: string;
equipo: string;
marca: string;
modelo: string;
comentario: string;
fallaReportada: string;
estado: boolean;
Diagnostico: any;


constructor(){
this.id = 0;
this.idingreso= 0;
this.nombres="";
this.cedula=0;
this.telefono=0;
this.direccion="";
this.tecnico="";
this.equipo="";
this.marca="";
this.modelo="";
this.comentario="";
this.fallaReportada = "";
this.estado=false;
this.Diagnostico="";
}
}