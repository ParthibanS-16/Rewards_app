import { calculatePoints } from './calculatePoints'

test('No points for amount below $50', () => {
    expect(calculatePoints(30)).toBe(0);
});

test('Points for amount between $50 and $100', () => {
    expect(calculatePoints(75)).toBe(25);
});

test('Points for amount over $100', () => {
    expect(calculatePoints(120)).toBe(90);
});

test('Points with exact $100', () => {
    expect(calculatePoints(100)).toBe(50);
});

test('Fractional value', () => {
    expect(calculatePoints(120.99)).toBe(90);
});

test('Negative value', () => {
    expect(calculatePoints(-20)).toBe(0);
});

test('Invalid value', () => {
    expect(calculatePoints(null)).toBe(0);
});