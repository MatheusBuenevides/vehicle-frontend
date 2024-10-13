import { Component, OnInit } from '@angular/core';
import { VehicleService, Vehicle } from '../../services/vehicle/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data;
    });
  }

  deleteVehicle(id: string): void {
    this.vehicleService.deleteVehicle(id).subscribe(
      () => {
        this.snackBar.open('Veículo excluído com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.loadVehicles();
      },
      (error) => {
        this.snackBar.open('Erro ao excluir o veículo. Tente novamente.', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      }
    );
  }
}
