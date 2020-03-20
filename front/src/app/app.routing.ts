import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductoIndexComponent } from './components/productos/producto-index/producto-index.component';
import { ProductoCreateComponent } from './components/productos/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/productos/producto-edit/producto-edit.component';
import { ClienteIndexComponent } from './components/clientes/cliente-index/cliente-index.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { UserIndexComponent } from './components/users/user-index/user-index.component';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserEditComponent } from './components/users/user-edit/user-edit.component';
import { VentaIndexComponent } from './components/ventas/venta-index/venta-index.component';
import { VentaCreateComponent } from './components/ventas/venta-create/venta-create.component';
import { VentaDetalleComponent } from './components/ventas/venta-detalle/venta-detalle.component';



const appRoute : Routes = [
    {path: '', component: LoginComponent},
    {path: 'dashboard',component: DashboardComponent},
    {path: 'productos',component: ProductoIndexComponent},
    {path: 'producto/registrar',component: ProductoCreateComponent},
    {path: 'producto/editar/:id',component: ProductoEditComponent},
    {path: 'clientes', component: ClienteIndexComponent},
    {path: 'cliente/registrar', component: ClienteCreateComponent},
    {path: 'cliente/editar/:id', component: ClienteEditComponent},
    {path: 'usuarios',component: UserIndexComponent},
    {path: 'usuarios/registrar', component: UserCreateComponent},
    {path: 'usuario/editar/:id', component: UserEditComponent},
    {path: 'ventas',component: VentaIndexComponent},
    {path: 'venta/registrar',component: VentaCreateComponent},
    {path: 'venta/:id',component: VentaDetalleComponent},
]


export const appRoutingProviders : any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoute);