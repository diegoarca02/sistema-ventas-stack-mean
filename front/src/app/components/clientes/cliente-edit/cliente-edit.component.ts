import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {

  public id;
  public cliente : any = {};
  public success_message;

  constructor(
    private _route : ActivatedRoute,
    private _clienteService :ClienteService
  ) { }

  ngOnInit() {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];

        this._clienteService.get_cliente(this.id).subscribe(
          response =>{
            console.log(response);
            this.cliente = response.cliente;
          },
          error=>{

          }
        );
      }
    );
  }

  close_alert(){
    this.success_message = '';
  }

  onSubmit(clienteForm){
    if(clienteForm.valid){
      
      this._clienteService.update_cliente({
        _id: this.id,
        nombres: clienteForm.value.nombres,
        correo: clienteForm.value.correo,
        dni: clienteForm.value.dni,
      }).subscribe(
        response=>{
          this.success_message = 'Se actualizo los datos del cliente';
        },
        error=>{

        }
      );
      
    }
  }

}
