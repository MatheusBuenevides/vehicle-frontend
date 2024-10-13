import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleCreateComponent } from './components/vehicle-create/vehicle-create.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { VehicleDeleteComponent } from './components/vehicle-delete/vehicle-delete.component';

const routes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },  // Rota padrão redireciona para /vehicles
  { path: 'vehicles', component: VehicleListComponent },      // Rota para listar veículos
  { path: 'create-vehicle', component: VehicleCreateComponent },  // Rota para criar veículo
  { path: 'edit-vehicle/:id', component: VehicleEditComponent },  // Rota para editar veículo
  { path: 'delete-vehicle/:id', component: VehicleDeleteComponent },  // Rota para deletar veículo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
