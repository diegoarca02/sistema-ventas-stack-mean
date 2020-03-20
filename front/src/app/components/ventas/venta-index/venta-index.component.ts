import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-index',
  templateUrl: './venta-index.component.html',
  styleUrls: ['./venta-index.component.css']
})
export class VentaIndexComponent implements OnInit {

  public identity;
  public ventas;

  constructor(
    private _userService : UserService,
    private _ventaService : VentaService,
    private _router : Router,
  ) { 
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    if(this.identity){
      //USUARIO AUTENTICADO
      this._ventaService.get_ventas().subscribe(
        response=>{
          this.ventas = response.ventas;
          console.log(this.ventas);
          
        },
        error=>{

        }
      );
    }else{
      this._router.navigate(['']);
    }
  }

}
