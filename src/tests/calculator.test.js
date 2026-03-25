const Calculator = require('../calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Addition', () => {
    test('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('should add positive and negative numbers', () => {
      expect(calculator.add(10, -4)).toBe(6);
    });

    test('should add two negative numbers', () => {
      expect(calculator.add(-5, -3)).toBe(-8);
    });

    test('should add zero to a number', () => {
      expect(calculator.add(7, 0)).toBe(7);
    });

    test('should add two zeros', () => {
      expect(calculator.add(0, 0)).toBe(0);
    });

    test('should add decimal numbers', () => {
      expect(calculator.add(2.5, 3.7)).toBeCloseTo(6.2);
    });

    test('should add large numbers', () => {
      expect(calculator.add(1000000, 2000000)).toBe(3000000);
    });
  });

  describe('Subtraction', () => {
    test('should subtract two positive numbers', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    test('should subtract when result is negative', () => {
      expect(calculator.subtract(5, 10)).toBe(-5);
    });

    test('should subtract two negative numbers', () => {
      expect(calculator.subtract(-3, -7)).toBe(4);
    });

    test('should subtract zero from a number', () => {
      expect(calculator.subtract(9, 0)).toBe(9);
    });

    test('should subtract a number from zero', () => {
      expect(calculator.subtract(0, 5)).toBe(-5);
    });

    test('should subtract decimal numbers', () => {
      expect(calculator.subtract(10.5, 3.2)).toBeCloseTo(7.3);
    });

    test('should subtract identical numbers resulting in zero', () => {
      expect(calculator.subtract(42, 42)).toBe(0);
    });
  });

  describe('Multiplication', () => {
    test('should multiply two positive numbers', () => {
      expect(calculator.multiply(45, 2)).toBe(90);
    });

    test('should multiply positive and negative numbers', () => {
      expect(calculator.multiply(6, -3)).toBe(-18);
    });

    test('should multiply two negative numbers', () => {
      expect(calculator.multiply(-4, -5)).toBe(20);
    });

    test('should multiply by zero', () => {
      expect(calculator.multiply(100, 0)).toBe(0);
    });

    test('should multiply by one', () => {
      expect(calculator.multiply(7, 1)).toBe(7);
    });

    test('should multiply decimal numbers', () => {
      expect(calculator.multiply(2.5, 4)).toBe(10);
    });

    test('should multiply large numbers', () => {
      expect(calculator.multiply(1000, 5000)).toBe(5000000);
    });

    test('should multiply fractional numbers', () => {
      expect(calculator.multiply(0.5, 0.5)).toBeCloseTo(0.25);
    });
  });

  describe('Division', () => {
    test('should divide two positive numbers', () => {
      expect(calculator.divide(20, 5)).toBe(4);
    });

    test('should divide positive and negative numbers', () => {
      expect(calculator.divide(10, -2)).toBe(-5);
    });

    test('should divide two negative numbers', () => {
      expect(calculator.divide(-20, -4)).toBe(5);
    });

    test('should divide resulting in decimal', () => {
      expect(calculator.divide(7, 2)).toBe(3.5);
    });

    test('should divide one by a number', () => {
      expect(calculator.divide(1, 4)).toBe(0.25);
    });

    test('should divide zero by a non-zero number', () => {
      expect(calculator.divide(0, 5)).toBe(0);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => {
        calculator.divide(10, 0);
      }).toThrow('Division by zero is not allowed');
    });

    test('should throw error when dividing zero by zero', () => {
      expect(() => {
        calculator.divide(0, 0);
      }).toThrow('Division by zero is not allowed');
    });

    test('should divide decimal numbers', () => {
      expect(calculator.divide(10.5, 2.1)).toBeCloseTo(5);
    });

    test('should divide large numbers', () => {
      expect(calculator.divide(1000000, 1000)).toBe(1000);
    });
  });

  describe('Edge Cases', () => {
    test('should handle very small decimal numbers', () => {
      expect(calculator.add(0.0001, 0.0002)).toBeCloseTo(0.0003);
    });

    test('should handle negative and positive zero results', () => {
      expect(calculator.subtract(5, 5)).toBe(0);
      // JavaScript's 0 * -100 results in -0, which is equal to 0 in value
      expect(Math.abs(calculator.multiply(0, -100))).toBe(0);
    });

    test('should maintain precision for common operations', () => {
      const result = calculator.divide(1, 3);
      expect(result).toBeCloseTo(0.333333, 5);
    });
  });

  describe('Modulo', () => {
    test('should return remainder of positive numbers', () => {
      expect(calculator.modulo(10, 3)).toBe(1);
    });

    test('should calculate modulo as shown in example: 5 % 2', () => {
      expect(calculator.modulo(5, 2)).toBe(1);
    });

    test('should handle negative dividend', () => {
      expect(calculator.modulo(-10, 3)).toBe(-1);
    });

    test('should handle negative divisor', () => {
      expect(calculator.modulo(10, -3)).toBe(1);
    });

    test('should return zero when evenly divisible', () => {
      expect(calculator.modulo(20, 4)).toBe(0);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => {
        calculator.modulo(10, 0);
      }).toThrow('Modulo by zero is not allowed');
    });

    test('should work with decimal numbers', () => {
      expect(calculator.modulo(7.5, 2)).toBeCloseTo(1.5);
    });

    test('should handle one as divisor', () => {
      expect(calculator.modulo(15, 1)).toBe(0);
    });

    test('should handle larger dividend with small divisor', () => {
      expect(calculator.modulo(100, 7)).toBe(2);
    });

    test('should handle same numbers', () => {
      expect(calculator.modulo(42, 42)).toBe(0);
    });

    test('should handle modulo with divisor greater than dividend', () => {
      expect(calculator.modulo(3, 10)).toBe(3);
    });
  });

  describe('Power', () => {
    test('should raise positive number to positive exponent', () => {
      expect(calculator.power(2, 8)).toBe(256);
    });

    test('should calculate power as shown in example: 2 ^ 3', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    test('should raise number to zero exponent', () => {
      expect(calculator.power(5, 0)).toBe(1);
    });

    test('should raise to negative exponent', () => {
      expect(calculator.power(2, -2)).toBe(0.25);
    });

    test('should raise negative number to even exponent', () => {
      expect(calculator.power(-3, 2)).toBe(9);
    });

    test('should raise negative number to odd exponent', () => {
      expect(calculator.power(-3, 3)).toBe(-27);
    });

    test('should handle decimal exponents', () => {
      expect(calculator.power(4, 0.5)).toBe(2);
    });

    test('should handle one raised to any power', () => {
      expect(calculator.power(1, 100)).toBe(1);
    });

    test('should handle zero raised to positive power', () => {
      expect(calculator.power(0, 5)).toBe(0);
    });

    test('should handle larger bases', () => {
      expect(calculator.power(10, 3)).toBe(1000);
    });

    test('should handle fractional base with integer exponent', () => {
      expect(calculator.power(0.5, 3)).toBe(0.125);
    });

    test('should handle negative base with fractional exponent', () => {
      expect(calculator.power(-4, 0.5)).toBe(NaN);
    });

    test('should raise negative one to even power', () => {
      expect(calculator.power(-1, 4)).toBe(1);
    });

    test('should raise negative one to odd power', () => {
      expect(calculator.power(-1, 3)).toBe(-1);
    });

    test('should handle very small exponents', () => {
      expect(calculator.power(2, 0.001)).toBeCloseTo(1.00069, 4);
    });
  });

  describe('Square Root', () => {
    test('should calculate square root of positive number', () => {
      expect(calculator.squareRoot(16)).toBe(4);
    });

    test('should calculate square root as shown in example: √16', () => {
      expect(calculator.squareRoot(16)).toBe(4);
    });

    test('should calculate square root of zero', () => {
      expect(calculator.squareRoot(0)).toBe(0);
    });

    test('should calculate square root of one', () => {
      expect(calculator.squareRoot(1)).toBe(1);
    });

    test('should calculate square root of decimal number', () => {
      expect(calculator.squareRoot(2.25)).toBe(1.5);
    });

    test('should calculate square root resulting in decimal', () => {
      expect(calculator.squareRoot(2)).toBeCloseTo(1.41421, 5);
    });

    test('should throw error for negative number', () => {
      expect(() => {
        calculator.squareRoot(-4);
      }).toThrow('Cannot calculate square root of a negative number');
    });

    test('should throw error for negative decimal', () => {
      expect(() => {
        calculator.squareRoot(-0.5);
      }).toThrow('Cannot calculate square root of a negative number');
    });

    test('should handle large numbers', () => {
      expect(calculator.squareRoot(1000000)).toBe(1000);
    });

    test('should calculate square root of 4', () => {
      expect(calculator.squareRoot(4)).toBe(2);
    });

    test('should calculate square root of 9', () => {
      expect(calculator.squareRoot(9)).toBe(3);
    });

    test('should calculate square root of 25', () => {
      expect(calculator.squareRoot(25)).toBe(5);
    });

    test('should calculate square root of 100', () => {
      expect(calculator.squareRoot(100)).toBe(10);
    });

    test('should calculate square root of very small positive number', () => {
      expect(calculator.squareRoot(0.0001)).toBe(0.01);
    });

    test('should calculate square root of pi', () => {
      expect(calculator.squareRoot(Math.PI)).toBeCloseTo(1.7724, 3);
    });

    test('should handle perfect square decimals', () => {
      expect(calculator.squareRoot(6.25)).toBe(2.5);
    });

    test('should throw error consistently for any negative value', () => {
      const negativeValues = [-1, -0.1, -100, -999.99];
      negativeValues.forEach(value => {
        expect(() => calculator.squareRoot(value)).toThrow('Cannot calculate square root of a negative number');
      });
    });
  });
});
