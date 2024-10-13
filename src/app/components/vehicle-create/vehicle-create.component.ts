import { Component } from '@angular/core';
import { VehicleService, Vehicle } from '../../services/vehicle/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.scss']
})
export class VehicleCreateComponent {
  vehicle: Vehicle = {
    id: '',
    placa: '',
    chassi: '',
    renavam: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear()
  };

  constructor(
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  createVehicle(): void {
    this.vehicleService.createVehicle(this.vehicle).subscribe(
      () => {
        this.snackBar.open('Veículo criado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/vehicles']);
      },
      (error) => {
        this.snackBar.open('Erro ao criar o veículo. Tente novamente.', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }
}
