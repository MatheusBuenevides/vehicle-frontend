import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleService, Vehicle } from './vehicle.service';

describe('VehicleService', () => {
  let service: VehicleService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/vehicles/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService]
    });

    service = TestBed.inject(VehicleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes após cada teste
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all vehicles from the API via GET', () => {
    const mockVehicles: Vehicle[] = [
      { id: '1', placa: 'ABC-1234', chassi: 'CH123', renavam: 'RN123', modelo: 'Model X', marca: 'Tesla', ano: 2021 },
      { id: '2', placa: 'DEF-5678', chassi: 'CH456', renavam: 'RN456', modelo: 'Model S', marca: 'Tesla', ano: 2020 }
    ];

    service.getVehicles().subscribe(vehicles => {
      expect(vehicles.length).toBe(2);
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles); // Simula o retorno do backend
  });

  it('should create a new vehicle via POST', () => {
    const newVehicle: Vehicle = {
      id: '3',
      placa: 'GHI-9012',
      chassi: 'CH789',
      renavam: 'RN789',
      modelo: 'Model 3',
      marca: 'Tesla',
      ano: 2022
    };

    service.createVehicle(newVehicle).subscribe(vehicle => {
      expect(vehicle).toEqual(newVehicle);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newVehicle);
    req.flush(newVehicle);
  });

  it('should update an existing vehicle via PUT', () => {
    const updatedVehicle: Vehicle = {
      id: '1',
      placa: 'ABC-1234',
      chassi: 'CH123',
      renavam: 'RN123',
      modelo: 'Model X',
      marca: 'Tesla',
      ano: 2021
    };

    service.updateVehicle('1', updatedVehicle).subscribe(vehicle => {
      expect(vehicle).toEqual(updatedVehicle);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedVehicle);
    req.flush(updatedVehicle);
  });

  it('should delete a vehicle via DELETE', () => {
    service.deleteVehicle('1').subscribe(response => {
      expect(response).toBeNull();  // Verifica que a resposta é undefined
    });
  
    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
  
    req.flush(null);  // Não envia nenhum corpo na resposta
  });
  
  

  it('should retrieve a vehicle by ID via GET', () => {
    const mockVehicle: Vehicle = {
      id: '1',
      placa: 'ABC-1234',
      chassi: 'CH123',
      renavam: 'RN123',
      modelo: 'Model X',
      marca: 'Tesla',
      ano: 2021
    };

    service.getVehicleById('1').subscribe(vehicle => {
      expect(vehicle).toEqual(mockVehicle);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicle);
  });
});
