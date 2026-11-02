// Replaces Shiki in the server bundle: its grammars and themes are about 10 MB, the whole
// Edge Script budget. It only enters through the default code node of `@datocms/astro`,
// which `src/components/StructuredText.astro` replaces with `CodeBlock.astro`.
export const bundledLanguages = {};
export const clearShikiHighlighterCache = () => {};
export const createShikiHighlighter = () => {
  throw new Error("Shiki is not bundled; render code blocks with src/components/CodeBlock.astro");
};
