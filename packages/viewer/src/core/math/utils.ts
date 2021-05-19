export function epsilon(value: number): number {
  return Math.abs(value) < 1e-10 ? 0 : value;
}
