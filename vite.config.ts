/// <reference types="vitest" />
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		name: "node",
		root: "./src",
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
