import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import oester from "@oester/astro";
import { generate } from "@graphql-codegen/cli";
import codegenConfig from "./codegen.config";
import codegen from "./integrations/codegen";
import site from "./integrations/site";
import designTokens from "./integrations/design-tokens";
import { env } from "./config/env";
import { security } from "./config/security";

await generate({ ...codegenConfig, silent: true });

// Imported after codegen because they import the generated documents.
const { default: icons } = await import("./integrations/icons");
const { default: translations } = await import("./integrations/translations");
const { fonts } = await import("./config/fonts");

const shikiStub = fileURLToPath(new URL("./config/shiki-stub.ts", import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://luuk.dk",
  adapter: oester(),
  integrations: [
    codegen(codegenConfig),
    site(),
    translations(),
    icons(),
    designTokens(),
    sitemap(),
  ],
  devToolbar: {
    enabled: false,
  },
  prefetch: true,
  markdown: {
    syntaxHighlight: false,
  },
  vite: {
    resolve: {
      alias: {
        "@astrojs/internal-helpers/shiki": shikiStub,
        "shiki/langs": shikiStub,
      },
    },
  },
  security,
  fonts,
  env,
});
