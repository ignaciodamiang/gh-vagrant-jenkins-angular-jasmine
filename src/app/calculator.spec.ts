import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  it('#multiply should return nine', () => {
    // AAA
    // Arrange
    const calculator = new Calculator();
    // Act
    const rta = calculator.multiply(3, 3);
    // Assert
    expect(rta).toBe(9);
  });
});

describe('Test for Calculator', () => {
  it('#multiply should return a four', () => {
    // AAA
    // Arrange
    const calculator = new Calculator();
    // Act
    const rta = calculator.multiply(1, 4);
    // Assert
    expect(rta).toBe(4);
  });
});

describe('Test for Calculator', () => {
  it('#divide should return a two', () => {
    // AAA
    // Arrange
    const calculator = new Calculator();
    // Act
    // Assert
    expect(calculator.divide(6, 3)).toEqual(2);
    expect(calculator.divide(5, 2)).toEqual(2.5);
  });
});

describe('Test matchers', () => {
  it('#divide should return a two', () => {
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
