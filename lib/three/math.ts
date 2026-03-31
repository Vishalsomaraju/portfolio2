export const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

export const clamp = (min: number, max: number, val: number) => {
  return Math.min(Math.max(val, min), max);
};
