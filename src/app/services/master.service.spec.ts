import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './value-fake.service';

describe('MasterService', () => {
  it('should return "my value" from the real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value');
  });

  it('should return "other value" from the fake service', () => {
    const fakeValueService = new FakeValueService();
    const masterService = new MasterService(
      fakeValueService as unknown as ValueService
    );
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should return "other value" from the fake object', () => {
    const fake = { getValue: () => 'fake value from object' };
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake value from object');
  });

  // Metodo 3: Jasmine Spy
  it('should call to getValue from ValueService', () => {
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fake spying value');
    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake spying value');
    // spy 1
    expect(valueServiceSpy.getValue.calls.count()).toBe(1);
    // spy 2
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    // spy 3
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
