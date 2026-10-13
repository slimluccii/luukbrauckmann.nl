// Turns Natural Earth country outlines into the SVG paths behind the Europe map.
// Usage: node scripts/europe-outline.ts <ne_50m_admin_0_countries.geojson>
import { readFileSync, writeFileSync } from "node:fs";
import { bounds, euMembers } from "../src/data/europe-map.ts";
import { fitHeight, project } from "../src/utils/mercator.ts";

type Ring = Array<[number, number]>;
type Feature = {
  properties: { ADM0_A3: string };
  geometry:
    | { type: "Polygon"; coordinates: Ring[] }
    | { type: "MultiPolygon"; coordinates: Ring[][] };
};

const width = 1000;
const height = Math.round(fitHeight(bounds, width));
const minStep = 4;
const minRingSize = 6;

const source = process.argv[2];
if (!source) throw new Error("Pass the path to the Natural Earth GeoJSON file");

const { features } = JSON.parse(readFileSync(source, "utf8")) as { features: Feature[] };
const paths = { eu: "", other: "" };

for (const feature of features) {
  const polygons =
    feature.geometry.type === "Polygon"
      ? [feature.geometry.coordinates]
      : feature.geometry.coordinates;
  const group = euMembers.includes(feature.properties.ADM0_A3) ? "eu" : "other";

  for (const [outer] of polygons) {
    paths[group] += toPath(outer);
  }
}

writeFileSync(
  new URL("../src/data/europe-outline.json", import.meta.url),
  `${JSON.stringify({ width, height, ...paths })}\n`,
);

function toPath(ring: Ring) {
  const projected = ring.map(([lon, lat]) =>
    project({ lat: Math.min(lat, 84), lon }, bounds, { width, height }),
  );
  const xs = projected.map((p) => p.x);
  const ys = projected.map((p) => p.y);
  const outside =
    Math.max(...xs) < 0 ||
    Math.min(...xs) > width ||
    Math.max(...ys) < 0 ||
    Math.min(...ys) > height;
  const tiny =
    Math.max(...xs) - Math.min(...xs) < minRingSize &&
    Math.max(...ys) - Math.min(...ys) < minRingSize;
  if (outside || tiny) return "";

  const points: Array<{ x: number; y: number }> = [];
  for (const { x, y } of projected) {
    // Clamping to just outside the view clips a filled outline without changing what is visible.
    const point = { x: Math.round(clamp(x, width)), y: Math.round(clamp(y, height)) };
    const last = points.at(-1);
    if (last && Math.hypot(point.x - last.x, point.y - last.y) < minStep) continue;
    points.push(point);
  }
  if (points.length < 3) return "";

  return `M${points.map((p) => `${p.x} ${p.y}`).join(" ")}Z`;
}

function clamp(value: number, max: number) {
  return Math.min(Math.max(value, -10), max + 10);
}
