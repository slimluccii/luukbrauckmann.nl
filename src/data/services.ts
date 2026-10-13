import type { Coordinates } from "~/utils/mercator";

type Copy = { en: string; nl: string };

export type Service = {
  name: string;
  href: string;
  role: Copy;
  company: string;
  place: Copy;
  coordinates: Coordinates;
  runsOn: Copy;
};

export type Exception = {
  name: string;
  role: Copy;
  impact: Copy;
};

export const services: ReadonlyArray<Service> = [
  {
    name: "Deploybase",
    href: "https://deploybase.eu",
    role: { en: "Hosting", nl: "Hosting" },
    company: "TwanIT",
    place: { en: "Netherlands", nl: "Nederland" },
    coordinates: { lat: 52.1, lon: 5.3 },
    runsOn: {
      en: "Scaleway in Paris and Bunny.net in Ljubljana",
      nl: "Scaleway in Parijs en Bunny.net in Ljubljana",
    },
  },
  {
    name: "DatoCMS",
    href: "https://www.datocms.com",
    role: { en: "Content, images and fonts", nl: "Content, afbeeldingen en fonts" },
    company: "Dato Srl",
    place: { en: "Milan, Italy", nl: "Milaan, Italië" },
    coordinates: { lat: 45.4642, lon: 9.19 },
    runsOn: {
      en: "European servers, behind Cloudflare",
      nl: "Europese servers, achter Cloudflare",
    },
  },
  {
    name: "Lettermint",
    href: "https://lettermint.co",
    role: { en: "Email from the contact form", nl: "E-mail van het contactformulier" },
    company: "Lettermint",
    place: { en: "Zwolle, Netherlands", nl: "Zwolle, Nederland" },
    coordinates: { lat: 52.5168, lon: 6.083 },
    runsOn: { en: "UpCloud in Amsterdam", nl: "UpCloud in Amsterdam" },
  },
  {
    name: "Friendly Captcha",
    href: "https://friendlycaptcha.com",
    role: { en: "Spam protection", nl: "Spambescherming" },
    company: "Friendly Captcha GmbH",
    place: { en: "Wörthsee, Germany", nl: "Wörthsee, Duitsland" },
    coordinates: { lat: 48.0723, lon: 11.2072 },
    runsOn: { en: "Hetzner in Germany", nl: "Hetzner in Duitsland" },
  },
];

export const exceptions: ReadonlyArray<Exception> = [
  {
    name: "Identity Digital",
    role: { en: "Registry of the .network domain", nl: "Register van het .network-domein" },
    impact: {
      en: "Can suspend luuk.network, wherever the domain is registered.",
      nl: "Kan luuk.network blokkeren, waar het domein ook geregistreerd is.",
    },
  },
  {
    name: "Cloudflare",
    role: { en: "Network in front of DatoCMS", nl: "Netwerk voor DatoCMS" },
    impact: {
      en: "Can cut off the content and images while the site is running.",
      nl: "Kan de content en afbeeldingen afsluiten terwijl de site draait.",
    },
  },
  {
    name: "GitHub",
    role: { en: "Code and builds", nl: "Code en builds" },
    impact: {
      en: "Can stop new deploys. The live site keeps running.",
      nl: "Kan nieuwe deploys stoppen. De live site blijft draaien.",
    },
  },
  {
    name: "npm",
    role: { en: "Packages", nl: "Packages" },
    impact: {
      en: "Can stop new builds. The live site keeps running.",
      nl: "Kan nieuwe builds stoppen. De live site blijft draaien.",
    },
  },
];
