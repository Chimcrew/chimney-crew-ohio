import { SEO_CITIES } from "@/data/seo-cities";

const FEATURED_SERVICE_AREA_NAMES = [
  "Grandview Heights",
  "Upper Arlington",
  "Bexley",
  "Whitehall",
  "Gahanna",
  "Worthington",
  "Hilliard",
  "Grove City",
  "Westerville",
  "Reynoldsburg",
  "Groveport",
  "Obetz",
  "Urbancrest",
  "Valleyview",
  "Riverlea",
] as const;

export const FEATURED_SERVICE_AREAS = FEATURED_SERVICE_AREA_NAMES.map((name) => {
  const city = SEO_CITIES.find(
    (item) => item.name === name && item.region === "Columbus",
  );

  if (!city) {
    throw new Error(`Missing service-area city data for ${name}`);
  }

  return city;
});
