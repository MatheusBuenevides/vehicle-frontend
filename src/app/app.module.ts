import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleCreateComponent } from './components/vehicle-create/vehicle-create.component';
import { VehicleEditComponent } from './components/vehicle-edit/vehicle-edit.component';
import { VehicleDeleteComponent } from './components/vehicle-delete/vehicle-delete.component';

import { AppRoutingModule } from './app-routing.module';  // Certifique-se de que o módulo de rotas foi importado
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    VehicleListComponent,
    VehicleCreateComponent,
    VehicleEditComponent,
    VehicleDeleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,  // Aqui o módulo de rotas é importado
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
