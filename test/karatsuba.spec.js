const {karatsuba, split} = require('../karatsuba');

//karatsuba
describe('karatsuba function', () => {
  it('should return a correct multiplication result for 1234 * 5678', () => {
    const product = karatsuba(1234, 5678);

    expect(product).toBe(7006652);
  });

  it('should return a correct multiplication result for 12345 * 67890', () => {
    const product = karatsuba(12345, 67890);

    expect(product).toBe(838102050);
  });

  it('should return a correct multiplication result for 1234567890 * 5678901234', () => {
    const product = karatsuba(1234567890, 5678901234);

    expect(product).toBe(7010989113977776000);
  });

  it('should return correct multiplication results for 1-digit integers', () => {
    const product1 = karatsuba(1, 4);
    const product2 = karatsuba(9, 8);
    const product3 = karatsuba(0, 1);
    const product4 = karatsuba(0, 0);
    const product5 = karatsuba(3, 2);

    expect(product1).toBe(4);
    expect(product2).toBe(72);
    expect(product3).toBe(0);
    expect(product4).toBe(0);
    expect(product5).toBe(6);
  });
});

//split
describe('split helper function', () => {
  it('splits 4-digit number into two 2-digit numbers', () => {
    const number = 1234;

    const [num1, num2] = split(number);

    expect(num1).toBe(12);
    expect(num2).toBe(34);
  });

  it('splits 5-digit number into a 3- and 2-digit number', () => {
    const number = 12345;

    const [num1, num2] = split(number);

    expect(num1).toBe(123);
    expect(num2).toBe(45);
  });

  it('splits a 7-digit number into 4- and 3-digit number', () => {
    const number = 1234567;

    const [num1, num2] = split(number);

    expect(num1).toBe(1234);
    expect(num2).toBe(567);
  });

  it('throws an error, if unsplittable number is passed', () => {
    expect(() => split(1)).toThrow();
    expect(() => split(0)).toThrow();
    expect(() => split(Infinity)).toThrow();
    expect(() => split(-Infinity)).toThrow();
  });
});