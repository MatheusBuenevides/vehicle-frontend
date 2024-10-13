import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleListComponent } from './vehicle-list.component';
import { VehicleService, Vehicle } from '../../services/vehicle/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let vehicleService: jasmine.SpyObj<VehicleService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getVehicles', 'deleteVehicle']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [VehicleListComponent],
      imports: [
        HttpClientTestingModule, 
        MatSnackBarModule, 
        NoopAnimationsModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    vehicleService.getVehicles.and.returnValue(of([
      { id: '1', placa: 'ABC-1234', modelo: 'Model X', marca: 'Tesla', ano: 2021, chassi: 'CH123', renavam: 'RN123' },
      { id: '2', placa: 'DEF-5678', modelo: 'Model S', marca: 'Tesla', ano: 2020, chassi: 'CH456', renavam: 'RN456' }
    ]));

    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles and set dataSource', async () => {
    const mockVehicles: Vehicle[] = [
      { id: '1', placa: 'ABC-1234', modelo: 'Model X', marca: 'Tesla', ano: 2021, chassi: 'CH123', renavam: 'RN123' },
      { id: '2', placa: 'DEF-5678', modelo: 'Model S', marca: 'Tesla', ano: 2020, chassi: 'CH456', renavam: 'RN456' }
    ];

    vehicleService.getVehicles.and.returnValue(of(mockVehicles));

    component.loadVehicles();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.dataSource.data).toEqual(mockVehicles);
  });

  it('should apply filter to the dataSource', () => {
    const event = { target: { value: 'ABC' } } as unknown as Event;
    component.dataSource = new MatTableDataSource<Vehicle>([
      { id: '1', placa: 'ABC-1234', modelo: 'Model X', marca: 'Tesla', ano: 2021, chassi: 'CH123', renavam: 'RN123' },
      { id: '2', placa: 'DEF-5678', modelo: 'Model S', marca: 'Tesla', ano: 2020, chassi: 'CH456', renavam: 'RN456' }
    ]);

    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('abc');
  });

  it('should delete a vehicle and reload the list on success', () => {
    vehicleService.deleteVehicle.and.returnValue(of(void 0));  // Retorna um Observable void
    const mockVehicles: Vehicle[] = [
      { id: '1', placa: 'ABC-1234', modelo: 'Model X', marca: 'Tesla', ano: 2021, chassi: 'CH123', renavam: 'RN123' }
    ];
    vehicleService.getVehicles.and.returnValue(of(mockVehicles));

    component.deleteVehicle('1');

    expect(vehicleService.deleteVehicle).toHaveBeenCalledWith('1');
    expect(vehicleService.getVehicles).toHaveBeenCalled();
    expect(snackBar.open).toHaveBeenCalledWith('Veículo excluído com sucesso!', 'Fechar', { duration: 3000 });
  });

  it('should show error snackbar if deleteVehicle fails', () => {
    vehicleService.deleteVehicle.and.returnValue(throwError(() => new Error('Erro ao excluir o veículo')));

    component.deleteVehicle('1');

    expect(snackBar.open).toHaveBeenCalledWith('Erro ao excluir o veículo. Tente novamente.', 'Fechar', {
      duration: 3000,
      panelClass: ['snackbar-error']
    });
  });
});
