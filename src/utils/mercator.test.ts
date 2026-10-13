import { describe, expect, test } from "vitest";
import { fitHeight, project } from "./mercator";

const bounds = { west: -10, east: 30, north: 60, south: 35 };
const size = { width: 400, height: 250 };

describe("project", () => {
  test("places the north-west corner at the top left", () => {
    expect(project({ lat: 60, lon: -10 }, bounds, size)).toEqual({ x: 0, y: 0 });
  });

  test("places the south-east corner at the bottom right", () => {
    const point = project({ lat: 35, lon: 30 }, bounds, size);

    expect(point.x).toBeCloseTo(400);
    expect(point.y).toBeCloseTo(250);
  });

  test("spaces longitude evenly", () => {
    expect(project({ lat: 50, lon: 10 }, bounds, size).x).toBeCloseTo(200);
  });

  test("stretches latitude towards the north, like a Mercator map", () => {
    const halfway = project({ lat: 47.5, lon: 10 }, bounds, size);

    expect(halfway.y).toBeGreaterThan(125);
  });

  test("places Paris west and north of Ljubljana", () => {
    const paris = project({ lat: 48.8566, lon: 2.3522 }, bounds, size);
    const ljubljana = project({ lat: 46.0569, lon: 14.5058 }, bounds, size);

    expect(paris.x).toBeLessThan(ljubljana.x);
    expect(paris.y).toBeLessThan(ljubljana.y);
  });
});

describe("fitHeight", () => {
  test("keeps a small area at the equator square", () => {
    const equator = { west: 0, east: 1, north: 0.5, south: -0.5 };

    expect(fitHeight(equator, 100)).toBeCloseTo(100, 1);
  });

  test("makes Europe taller than its span in degrees", () => {
    expect(fitHeight(bounds, 400)).toBeGreaterThan(400 * (25 / 40));
  });
});
