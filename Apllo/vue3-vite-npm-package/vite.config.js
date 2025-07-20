import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "HvueUi",
    lib: {
      entry: path.resolve(__dirname, "./src/packages/index.js"),
      name: "HvueUi",
      fileName: "HvueUi",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
