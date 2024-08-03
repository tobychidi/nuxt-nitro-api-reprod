// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().overrides({
   "nuxt/vue/single-root": {
      rules: {
         "vue/no-multiple-template-root": "off",
      },
   },
});
