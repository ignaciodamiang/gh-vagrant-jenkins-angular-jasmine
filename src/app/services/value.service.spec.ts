import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    });
    service = TestBed.inject(ValueService);
  });

  describe('test init', () => {
    it('shoud be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('test for getValue', () => {
    it('should return value', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('test for setValue', () => {
    it('should set value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('new value');
      expect(service.getValue()).toBe('new value');
    });
  });

  describe('test for getPromiseValue', () => {
    it('should return "promise value" with then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        // assert
        expect(value).toBe('promise value');
        doneFn();
      });
    });

    it('should return "promise value" using async', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('promise value');
    });
  });

  describe('test for getObservableValue', () => {
    it('should return "observable value"', (doneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
        doneFn();
      });
    });
    it('should return "observable value" using async', async () => {
      const value = await service.getObservableValue().toPromise();
      expect(value).toBe('observable value');
    });
  });
});
