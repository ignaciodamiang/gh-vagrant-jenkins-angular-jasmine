import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  // La inyección de dependencias se define en el constructor, que tiene un patrón singleton que crea una sola instancia y la comparte en toda la aplicación.
  constructor(private valueService: ValueService) {}

  getValue() {
    return this.valueService.getValue();
  }
}
