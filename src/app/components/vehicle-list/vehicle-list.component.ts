import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleService, Vehicle } from '../../services/vehicle/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['placa', 'modelo', 'marca', 'ano', 'actions'];
  dataSource = new MatTableDataSource<Vehicle>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vehicleService: VehicleService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
