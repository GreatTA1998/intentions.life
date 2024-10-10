// vite.config.js
import { sentrySvelteKit } from "file:///Users/maryus/code_for_fun/intentions.life/node_modules/@sentry/sveltekit/build/cjs/index.server.js";
import { sveltekit } from "file:///Users/maryus/code_for_fun/intentions.life/node_modules/@sveltejs/kit/src/exports/vite/index.js";
var vite_config_default = {
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: "explain-inc",
        project: "javascript-sveltekit"
      }
    }),
    // viteCommonjs(),
    sveltekit()
  ]
  // Fixes known issue with v9 Firebase and SvelteKit
  // https://kit.svelte.dev/faq
  // https://github.com/benmccann/sveltekit-firebase/blob/9e3097fd859e4f81e4775885ecb584561f098fd3/svelte.config.js#L11
  // ssr: {
  //   external: ['whatwg-url', 'node-fetch']
  // }	
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFyeXVzL2NvZGVfZm9yX2Z1bi9pbnRlbnRpb25zLmxpZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9tYXJ5dXMvY29kZV9mb3JfZnVuL2ludGVudGlvbnMubGlmZS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWFyeXVzL2NvZGVfZm9yX2Z1bi9pbnRlbnRpb25zLmxpZmUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzZW50cnlTdmVsdGVLaXQgfSBmcm9tIFwiQHNlbnRyeS9zdmVsdGVraXRcIjtcbmltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gJ0BzdmVsdGVqcy9raXQvdml0ZSc7XG4vLyBpbXBvcnQgeyB2aXRlQ29tbW9uanMgfSBmcm9tICdAb3JpZ2luanMvdml0ZS1wbHVnaW4tY29tbW9uanMnXG4vLyBGaXhlcyBgcmVxdWlyZSBpcyB1bmRlZmluZWRgIFxuLy8gaHR0cHM6Ly9raXQuc3ZlbHRlLmRldi9kb2NzXG4vLyBCZWxvdyBpcyBWaXRlJ3MgY29uZmlnLCBzZWUgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9yL3N2ZWx0ZWpzL2NvbW1lbnRzL256aTkzNC9jb21tZW50L2gxcHBvdDIvP3V0bV9zb3VyY2U9c2hhcmUmdXRtX21lZGl1bT13ZWIyeCZjb250ZXh0PTNcbi8vIHZpdGU6IHtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwbHVnaW5zOiBbc2VudHJ5U3ZlbHRlS2l0KHtcbiAgICBzb3VyY2VNYXBzVXBsb2FkT3B0aW9uczoge1xuICAgICAgb3JnOiBcImV4cGxhaW4taW5jXCIsXG4gICAgICBwcm9qZWN0OiBcImphdmFzY3JpcHQtc3ZlbHRla2l0XCJcbiAgICB9XG4gIH0pLCAvLyB2aXRlQ29tbW9uanMoKSxcbiAgXG4gIHN2ZWx0ZWtpdCgpXSxcblxuICAvLyBGaXhlcyBrbm93biBpc3N1ZSB3aXRoIHY5IEZpcmViYXNlIGFuZCBTdmVsdGVLaXRcbiAgLy8gaHR0cHM6Ly9raXQuc3ZlbHRlLmRldi9mYXFcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlbm1jY2Fubi9zdmVsdGVraXQtZmlyZWJhc2UvYmxvYi85ZTMwOTdmZDg1OWU0ZjgxZTQ3NzU4ODVlY2I1ODQ1NjFmMDk4ZmQzL3N2ZWx0ZS5jb25maWcuanMjTDExXG4gIC8vIHNzcjoge1xuICAvLyAgIGV4dGVybmFsOiBbJ3doYXR3Zy11cmwnLCAnbm9kZS1mZXRjaCddXG4gIC8vIH1cdFxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1QsU0FBUyx1QkFBdUI7QUFDaFYsU0FBUyxpQkFBaUI7QUFPMUIsSUFBTyxzQkFBUTtBQUFBLEVBQ2IsU0FBUztBQUFBLElBQUMsZ0JBQWdCO0FBQUEsTUFDeEIseUJBQXlCO0FBQUEsUUFDdkIsS0FBSztBQUFBLFFBQ0wsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGLENBQUM7QUFBQTtBQUFBLElBRUQsVUFBVTtBQUFBLEVBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRYjsiLAogICJuYW1lcyI6IFtdCn0K
