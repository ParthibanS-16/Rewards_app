export const calculatePoints = (amount) => {
  if (typeof amount !== 'number' || amount <= 50) return 0;
  let points = 0;
  amount = Math.floor(amount);
  if (amount > 100) {
    points += (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    points += (amount - 50);
  }
  return points;
};