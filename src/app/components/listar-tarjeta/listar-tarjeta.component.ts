import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  listTarjeta:tarjetaCredito[]=[];

  constructor(private tarjetaService:TarjetaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this.tarjetaService.obtenerTarjetas().subscribe(doc=>{
      this.listTarjeta=[];
      doc.forEach((element:any) => {
         this.listTarjeta.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
         })
      });
    })
  }

  eliminarTarjeta(id:any){
    this.tarjetaService.eliminarTarjeta(id).then(()=>{
        this.toastr.error('La tarjeta fue eliminada con exito!', 'Registro Eliminado');
     },error=>{ 
      this.toastr.error('Ooops.... ocurrio un error!', 'Error');
      console.log(error);
    })

  }

  editarTarjeta(tarjeta:tarjetaCredito){
      this.tarjetaService.addTarjetaEdit(tarjeta);
  }

}
