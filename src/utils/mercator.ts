export type Coordinates = { lat: number; lon: number };
export type Bounds = { west: number; east: number; north: number; south: number };
export type Size = { width: number; height: number };

const mercatorY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

export function project({ lat, lon }: Coordinates, bounds: Bounds, size: Size) {
  const top = mercatorY(bounds.north);
  const bottom = mercatorY(bounds.south);

  return {
    x: ((lon - bounds.west) / (bounds.east - bounds.west)) * size.width,
    y: ((top - mercatorY(lat)) / (top - bottom)) * size.height,
  };
}

export function fitHeight(bounds: Bounds, width: number) {
  const span = mercatorY(bounds.north) - mercatorY(bounds.south);
  return (width * span) / (((bounds.east - bounds.west) * Math.PI) / 180);
}
