import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  describe('Test for multiply', () => {
    it('should return nine', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(3, 3);
      // Assert
      expect(rta).toBe(9);
    });

    it('should return a four', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      const rta = calculator.multiply(1, 4);
      // Assert
      expect(rta).toBe(4);
    });
  });

  describe('Test for Divide', () => {
    it('should return a two', () => {
      // AAA
      // Arrange
      const calculator = new Calculator();
      // Act
      // Assert
      expect(calculator.divide(6, 3)).toEqual(2);
      expect(calculator.divide(5, 2)).toEqual(2.5);
    });
    it('should return null', () => {
      const calculator = new Calculator();
      expect(calculator.divide(3, 0)).toBeNull();
    });
  });

  describe('Test for sum', () => {
    it('should return 4', () => {
      const calculator = new Calculator();
      expect(calculator.add(1, 3)).toBe(4);
      expect(calculator.add(2, 2)).toBe(4);
      expect(calculator.add(3, 1)).toBe(4);
    });
  });

  describe('Test for substract', () => {
    it('should return 4', () => {
      const calculator = new Calculator();
      expect(calculator.substract(6, 2)).toBe(4);
      expect(calculator.substract(8, 4)).toBe(4);
      expect(calculator.substract(12, 8)).toBe(4);
    });
  });
});

describe('Test matchers', () => {
  it('should match everything', () => {
    const name = 'Javier';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect(1 + 3 === 3).toBeFalsy();
    expect(1 + 3 === 4).toBeTruthy();

    expect(1 + 3).toBeGreaterThan(3);
    expect(1 + 3).toBeGreaterThanOrEqual(4);
    expect(1 + 3).toBeLessThan(5);
    expect(1 + 3).toBeLessThanOrEqual(4);

    // String
    expect(name).toMatch(/avi/);

    // Array
    const arr = ['oranges', 'apples', 'bananas'];
    expect(arr).toContain('oranges');
  });
});
