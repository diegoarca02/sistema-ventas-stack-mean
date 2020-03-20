import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public productos;
  public url;
  public filtro;
  public categorias;
  public titulo_cat;
  public descripcion_cat;
  public producto_stock;
  public producto_id;
  public success_message;

  constructor(
    private _productoService : ProductoService,
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this._productoService.get_productos('').subscribe(
      response =>{
        this.productos = response.productos;
        console.log(this.productos);
        
      },
      error=>{

      }
    );

    this._productoService.get_categorias().subscribe(
      response=>{
        this.categorias = response.categorias;
      },
      error=>{

      }
    );
  }

  search(searchForm){
    this._productoService.get_productos(searchForm.value.filtro).subscribe(
      response =>{
        this.productos = response.productos;
      },
      error=>{

      }
    );
    
  }

  save_cat(categoriaForm){
    if(categoriaForm.valid){
      this._productoService.insert_categoria({
        titulo: categoriaForm.value.titulo_cat,
        descripcion: categoriaForm.value.descripcion_cat,
      }).subscribe(
        response=>{
          this._productoService.get_categorias().subscribe(
            response =>{
              this.categorias = response.categorias;
              $('#modal-save-categoria').modal('hide');
            },
            error=>{

            }
          );
        },
        error=>{

        }
      );
      
    }
  }

  eliminar(id){
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: "Eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Registro eliminado!',
          'Se elimino correctamente.',
          'success'
        )

        this._productoService.delete_producto(id).subscribe(
          response=>{
            this._productoService.get_productos('').subscribe(
              response=>{
                this.productos = response.productos;
              }
              ,erro=>{

              }
            );
          }
          ,error=>{

          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se cancelo la solicitud :)',
          'error'
        )
      }
    })
  }

  get_id(id){
    this.producto_id = id;
  }

  close_alert(){
    this.success_message = '';
  }

  aumentar_stock(stockForm){
    if(stockForm.valid){
      if(this.producto_id){
        this._productoService.stock_producto({
          _id: this.producto_id,
          stock: stockForm.value.producto_stock,
        }).subscribe(
          response=>{
            this.success_message = 'Se aumento el stock correctamente';
            this._productoService.get_productos('').subscribe(
              response =>{
                this.productos = response.productos;
                $('.modal').modal('hide');
              }
              ,error=>{

              }
            );
          },
          error=>{
            console.log(error);
            
          }
        );
      }
      
    }
  }

}
