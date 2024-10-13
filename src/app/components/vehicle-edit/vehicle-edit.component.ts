import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService, Vehicle } from '../../services/vehicle/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.scss']
})
export class VehicleEditComponent implements OnInit {
  vehicle: Vehicle | undefined;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    const vehicleId = this.route.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.vehicleService.getVehicleById(vehicleId).subscribe((data) => {
        this.vehicle = data;
      });
    }
  }

  saveVehicle(): void {
    if (this.vehicle) {
      this.vehicleService.updateVehicle(this.vehicle.id, this.vehicle).subscribe(
        () => {
          this.snackBar.open('Veículo atualizado com sucesso!', 'Fechar', {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open('Erro ao atualizar o veículo. Tente novamente.', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      );
    }
  }
}
