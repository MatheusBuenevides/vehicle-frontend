import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleCreateComponent } from './vehicle-create.component';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('VehicleCreateComponent', () => {
  let component: VehicleCreateComponent;
  let fixture: ComponentFixture<VehicleCreateComponent>;
  let vehicleService: jasmine.SpyObj<VehicleService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const vehicleServiceSpy = jasmine.createSpyObj('VehicleService', ['createVehicle']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [VehicleCreateComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleCreateComponent);
    component = fixture.componentInstance;
    vehicleService = TestBed.inject(VehicleService) as jasmine.SpyObj<VehicleService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call VehicleService.createVehicle when createVehicle is called', () => {
    const mockVehicle = {
      id: '',
      placa: 'ABC-1234',
      chassi: '1234567890',
      renavam: '12345678901',
      modelo: 'Model X',
      marca: 'Tesla',
      ano: 2021
    };

    component.vehicle = mockVehicle;
    vehicleService.createVehicle.and.returnValue(of(mockVehicle));

    component.createVehicle();

    expect(vehicleService.createVehicle).toHaveBeenCalledWith(mockVehicle);
  });

  it('should show success snackbar and navigate to /vehicles on successful vehicle creation', () => {
    const mockVehicle = {
      id: '',
      placa: 'ABC-1234',
      chassi: '1234567890',
      renavam: '12345678901',
      modelo: 'Model X',
      marca: 'Tesla',
      ano: 2021
    };

    component.vehicle = mockVehicle;
    vehicleService.createVehicle.and.returnValue(of(mockVehicle));

    component.createVehicle();

    expect(snackBar.open).toHaveBeenCalledWith('Veículo criado com sucesso!', 'Fechar', { duration: 3000 });
    expect(router.navigate).toHaveBeenCalledWith(['/vehicles']);
  });

  it('should show error snackbar on vehicle creation failure', () => {
    const mockVehicle = {
      id: '',
      placa: 'ABC-1234',
      chassi: '1234567890',
      renavam: '12345678901',
      modelo: 'Model X',
      marca: 'Tesla',
      ano: 2021
    };

    component.vehicle = mockVehicle;
    vehicleService.createVehicle.and.returnValue(throwError(() => new Error('Erro ao criar o veículo')));

    component.createVehicle();

    expect(snackBar.open).toHaveBeenCalledWith('Erro ao criar o veículo. Tente novamente.', 'Fechar', { 
      duration: 3000, 
      panelClass: ['snackbar-error'] 
    });
  });
});
