#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (*)
 * - Division (/)
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
}

module.exports = Calculator;

// CLI Interface - only run if this file is executed directly
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error('Usage: calculator.js <operation> <number1> <number2>');
    console.error('Operations: add, subtract, multiply, divide');
    console.error('Example: calculator.js add 5 3');
    process.exit(1);
  }

  const operation = args[0].toLowerCase();
  const num1 = parseFloat(args[1]);
  const num2 = parseFloat(args[2]);

  if (isNaN(num1) || isNaN(num2)) {
    console.error('Error: Both arguments must be valid numbers');
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
      default:
        console.error(`Error: Unknown operation '${operation}'`);
        console.error('Supported operations: add, subtract, multiply, divide');
        process.exit(1);
    }

    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
