import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleEditComponent } from './vehicle-edit.component';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('VehicleEditComponent', () => {
  let component: VehicleEditComponent;
  let fixture: ComponentFixture<VehicleEditComponent>;
  let vehicleService: jasmine.SpyObj<VehicleService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['getVehicleById', 'updateVehicle']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [VehicleEditComponent],
      imports: [
        HttpClientTestingModule, 
        MatSnackBarModule, 
        RouterTestingModule, 
        MaterialModule, 
        BrowserAnimationsModule,
        FormsModule
      ],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '123'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleEditComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    
    vehicleService.getVehicleById.and.returnValue(of({
      id: '123',
      placa: 'ABC-1234',
      chassi: 'CH123456',
      renavam: 'RN123456',
      modelo: 'Model X',
      marca: 'Tesla',
      ano: 2021
    }));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicle data on init', () => {
    expect(vehicleService.getVehicleById).toHaveBeenCalledWith('123');
    expect(component.vehicle).toEqual({
      id: '123',
      placa: 'ABC-1234',
      chassi: 'CH123456',
      renavam: 'RN123456',
      modelo: 'Model X',
      marca: 'Tesla',
      ano: 2021
    });
  });

  it('should save vehicle and show success snackbar on saveVehicle', () => {
    const mockVehicle = {
      id: '123',
      placa: 'ABC-1234',
      chassi: '1234567890',
      renavam: '12345678901',
      modelo: 'Model X',
      marca: 'Tesla',
      ano: 2021,
    };

    component.vehicle = mockVehicle;
    vehicleService.updateVehicle.and.returnValue(of(mockVehicle));

    component.saveVehicle();

    expect(vehicleService.updateVehicle).toHaveBeenCalledWith('123', mockVehicle);
    expect(snackBar.open).toHaveBeenCalledWith('Veículo atualizado com sucesso!', 'Fechar', { duration: 3000 });
  });

  it('should show error snackbar if saveVehicle fails', () => {
    const mockVehicle = {
      id: '123',
      placa: 'ABC-1234',
      chassi: '1234567890',
      renavam: '12345678901',
      modelo: 'Model X',
      marca: 'Tesla',
      ano: 2021,
    };

    component.vehicle = mockVehicle;
    vehicleService.updateVehicle.and.returnValue(throwError(() => new Error('Erro ao atualizar o veículo')));

    component.saveVehicle();

    expect(vehicleService.updateVehicle).toHaveBeenCalledWith('123', mockVehicle);
    expect(snackBar.open).toHaveBeenCalledWith('Erro ao atualizar o veículo. Tente novamente.', 'Fechar', {
      duration: 3000,
      panelClass: ['snackbar-error'],
    });
  });

  it('should not call updateVehicle if vehicle is undefined', () => {
    component.vehicle = undefined;

    component.saveVehicle();

    expect(vehicleService.updateVehicle).not.toHaveBeenCalled();
    expect(snackBar.open).not.toHaveBeenCalled();
  });
});