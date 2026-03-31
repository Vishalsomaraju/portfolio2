export const R3F_CONFIG = {
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    position: [0, 0, 10]
  },
  perf: {
    maxPixelRatio: 2,
    particleCount: process.env.NODE_ENV === 'development' ? 5000 : 20000 
  }
}
