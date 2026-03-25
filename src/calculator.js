#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
 * - Modulo (%)
 * - Power (^)
 * - Square Root (√)
 */

class Calculator {
  /**
   * Addition: Add two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum of a and b
   */
  add(a, b) {
    return a + b;
  }

  /**
   * Subtraction: Subtract two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Difference of a and b
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * Multiplication: Multiply two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Product of a and b
   */
  multiply(a, b) {
    return a * b;
  }

  /**
   * Division: Divide two numbers
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number} Quotient of a divided by b
   * @throws {Error} If attempting to divide by zero
   */
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  /**
   * Modulo: Calculate the remainder of division
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number} Remainder of a divided by b
   * @throws {Error} If attempting modulo by zero
   */
  modulo(a, b) {
    if (b === 0) {
      throw new Error('Modulo by zero is not allowed');
    }
    return a % b;
  }

  /**
   * Power: Raise a number to an exponent
   * @param {number} base - The base number
   * @param {number} exponent - The exponent
   * @returns {number} base raised to the exponent
   */
  power(base, exponent) {
    return Math.pow(base, exponent);
  }

  /**
   * Square Root: Calculate the square root of a number
   * @param {number} n - The number
   * @returns {number} The square root of n
   * @throws {Error} If attempting to calculate square root of a negative number
   */
  squareRoot(n) {
    if (n < 0) {
      throw new Error('Cannot calculate square root of a negative number');
    }
    return Math.sqrt(n);
  }
}

module.exports = Calculator;

// CLI Interface - only run if this file is executed directly
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage:');
    console.error('  Binary operations: calculator.js <operation> <number1> <number2>');
    console.error('  Unary operations: calculator.js <operation> <number>');
    console.error('');
    console.error('Binary operations: add, subtract, multiply, divide, modulo, power');
    console.error('Unary operations: sqrt');
    console.error('');
    console.error('Examples:');
    console.error('  calculator.js add 5 3');
    console.error('  calculator.js power 2 8');
    console.error('  calculator.js sqrt 16');
    process.exit(1);
  }

  const operation = args[0].toLowerCase();
  const isUnaryOp = operation === 'sqrt';

  if (!isUnaryOp && args.length < 3) {
    console.error(`Error: Operation '${operation}' requires two numbers`);
    process.exit(1);
  }

  const num1 = parseFloat(args[1]);

  if (!isUnaryOp && args.length < 3) {
    console.error('Error: Binary operations require two arguments');
    process.exit(1);
  }

  const num2 = isUnaryOp ? undefined : parseFloat(args[2]);

  if (isNaN(num1) || !isFinite(num1)) {
    console.error('Error: First argument must be a valid finite number');
    process.exit(1);
  }

  if (!isUnaryOp && (isNaN(num2) || !isFinite(num2))) {
    console.error('Error: Second argument must be a valid finite number');
    process.exit(1);
  }

  const calculator = new Calculator();

  try {
    let result;

    switch (operation) {
      case 'add':
        result = calculator.add(num1, num2);
        break;
      case 'subtract':
        result = calculator.subtract(num1, num2);
        break;
      case 'multiply':
        result = calculator.multiply(num1, num2);
        break;
      case 'divide':
        result = calculator.divide(num1, num2);
        break;
      case 'modulo':
        result = calculator.modulo(num1, num2);
        break;
      case 'power':
        result = calculator.power(num1, num2);
        break;
      case 'sqrt':
        result = calculator.squareRoot(num1);
        break;
      default:
        console.error(`Error: Unknown operation '${operation}'`);
        console.error('Supported operations: add, subtract, multiply, divide, modulo, power, sqrt');
        process.exit(1);
    }

    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
