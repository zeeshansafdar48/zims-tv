import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { readFileSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { Plugin } from "vite";

// Get package.json version
const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));
const now = new Date();
const buildDate = now.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
}); // DD-MM-YYYY format
const buildTime = now.toLocaleTimeString("en-US", {
  timeZone: "Asia/Kolkata",
  hour12: false
}); // IST time format

function copyPlatformFilesPlugin(platform: string): Plugin {
  return {
    name: "copy-platform-files",
    closeBundle() {
      const distDir = resolve(__dirname, "dist");
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }
      if (platform === "tizen") {
        const tizenConfig = resolve(__dirname, "platform/tizen/tizen.xml");
        if (existsSync(tizenConfig)) {
          copyFileSync(tizenConfig, resolve(distDir, "tizen.xml"));
        }
      } else if (platform === "webos") {
        const webosConfig = resolve(__dirname, "platform/webos/appinfo.json");
        if (existsSync(webosConfig)) {
          copyFileSync(webosConfig, resolve(distDir, "appinfo.json"));
        }
      } else if (platform === "vida") {
        const vidaaConfig = resolve(__dirname, "platform/vida/vida.manifest");
        if (existsSync(vidaaConfig)) {
          copyFileSync(vidaaConfig, resolve(distDir, "vida.manifest"));
        }
      } else if (platform === "xbox") {
        const xboxConfig = resolve(__dirname, "platform/xbox/appxmanifest.xml");
        if (existsSync(xboxConfig)) {
          copyFileSync(xboxConfig, resolve(distDir, "appxmanifest.xml"));
        }
      }
    }
  };
}

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  const platform = env["VITE_PLATFORM"] || "webos";
  const platformHtmlFile = resolve(__dirname, `platform/${platform}.html`);
  console.log("==> ~ platformHtmlFile:", platformHtmlFile);
  const indexHtmlPath = resolve(__dirname, "index.html");
  console.log("==> ~ indexHtmlPath:", indexHtmlPath);

  return {
    plugins: [
      react(),
      legacy({
        targets: ["chrome 47"],
        additionalLegacyPolyfills: ["core-js/stable", "whatwg-fetch"],
        renderLegacyChunks: true,
        polyfills: [
          "es.promise",
          "es.array.iterator",
          "es.symbol",
          "es.symbol.iterator",
          "es.object.assign",
          "es.array.from",
          "es.promise.finally",
          "es.array.includes",
          "es.array.find",
          "es.array.find-index",
          "es.string.includes",
          "es.string.starts-with",
          "es.string.ends-with",
          "es.number.is-nan",
          "es.number.is-finite",
          "es.weak-map",
          "es.map",
          "es.set"
        ]
      }),
      copyPlatformFilesPlugin(platform),
      // Bundle analyzer - only enabled for production builds
      ...(command === "build"
        ? [
            visualizer({
              filename: `dist/bundle-analysis-${platform}.html`,
              open: false,
              gzipSize: true,
              brotliSize: true,
              template: "treemap",
              title: `Starzplay TV App - ${platform.toUpperCase()} Bundle Analysis`
            })
          ]
        : []),
      {
        name: "platform-html",
        transformIndexHtml(html) {
          if (command.includes("build")) {
            // Read platform-specific HTML
            const platformHtml = readFileSync(platformHtmlFile, "utf-8");

            // Extract script and link tags from Vite's processed HTML
            const viteScripts =
              html.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
            const viteLinks = html.match(/<link[^>]*>/gi) || [];

            // Extract the body content from the platform HTML
            const bodyMatch = platformHtml.match(
              /<body[^>]*>([\s\S]*)<\/body>/i
            );
            const platformBody = bodyMatch ? bodyMatch[1] : "";

            // Extract the head content from the platform HTML
            const headMatch = platformHtml.match(
              /<head[^>]*>([\s\S]*)<\/head>/i
            );
            const platformHead = headMatch ? headMatch[1] : "";

            // Create new HTML with platform content and Vite assets
            const newHtml = platformHtml
              .replace(
                /<body[^>]*>[\s\S]*<\/body>/i,
                `<body>${platformBody}</body>`
              )
              .replace(
                /<head[^>]*>([\s\S]*)<\/head>/i,
                (_match, _headContent) => {
                  // Keep platform head content and append Vite's script and link tags
                  return `<head>${platformHead}${viteScripts.join(
                    "\n"
                  )}${viteLinks.join("\n")}</head>`;
                }
              );

            return newHtml;
          }
          // For development, add React DevTools script
          return html.replace(
            "</head>",
            '<script src="http://localhost:8097"></script></head>'
          );
        }
      },
      tailwindcss()
    ],
    base: "./",
    build: {
      outDir: "dist",
      rollupOptions: {
        input: {
          main: indexHtmlPath
        },
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("core-js")) return "vendor_corejs";
              if (id.includes("styled-components")) return "vendor_styled";
              // Add more libraries as needed
              return "vendor";
            }
            return undefined;
          }
        }
      },
      emptyOutDir: true,
      publicDir: false
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src")
      }
    },
    esbuild: {
      jsxInject: undefined
    },
    define: {
      "process.env": {
        VITE_PLATFORM: env["VITE_PLATFORM"],
        VITE_THEME: env["VITE_THEME"],
        VITE_APP_ENV: env["VITE_APP_ENV"],
        VITE_API_URL: env["VITE_API_URL"],
        VITE_BASEURL: env["VITE_BASEURL"],
        VITE_SECRET_KEY: env["VITE_SECRET_KEY"],
        VITE_ACTIVATION_LINK_URL: env["VITE_ACTIVATION_LINK_URL"],
        VITE_ACTIVATION_LINK_LABEL: env["VITE_ACTIVATION_LINK_LABEL"],
        VITE_API_KEY: env["VITE_API_KEY"],
        VITE_HELP_LINK_URL: env["VITE_HELP_LINK_URL"],
        VITE_MEDIASERVICE_BASEURL: env["VITE_MEDIASERVICE_BASEURL"],
        VITE_STATICPAGE_BASEURL: env["VITE_STATICPAGE_BASEURL"],
        VITE_STATIC_BASEURL_V2: env["VITE_STATIC_BASEURL_V2"],
        VITE_PINLOGIN_BASEURL: env["VITE_PINLOGIN_BASEURL"],
        VITE_DEFAULT_CDN_URL: env["VITE_DEFAULT_CDN_URL"],
        VITE_PLAYER_FETCH_PRODUCT_URL: env["VITE_PLAYER_FETCH_PRODUCT_URL"],
        VITE_APP_VERSION: JSON.stringify(packageJson.version),
        VITE_BUILD_DATE: JSON.stringify(`${buildDate} ${buildTime}`),
        VITE_DEBUG_BUILD: env["VITE_DEBUG_BUILD"],
        VITE_DEBUG_OVERLAY: env["VITE_DEBUG_OVERLAY"],
        VITE_PLAYER_ANALYTICS_URL: env["VITE_PLAYER_ANALYTICS_URL"],
        VITE_PLAYER_ENTITLEMENT_URL: env["VITE_PLAYER_ENTITLEMENT_URL"],
        VITE_SECRETKEY_PLAYER: env["VITE_SECRETKEY_PLAYER"],
        VITE_BITMOVIN_LICENSE_KEY: env["VITE_BITMOVIN_LICENSE_KEY"],
        VITE_SEARCH_API_URL: env["VITE_SEARCH_API_URL"],
        VITE_PROFILE_SCREEN_CONFIG_URL: env["VITE_PROFILE_SCREEN_CONFIG_URL"]
      }
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test-setup.ts"],
      include: [
        "src/**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"
      ],
      exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
      coverage: {
        reporter: ["text", "json", "html"],
        exclude: ["node_modules/", "src/test-setup.ts"]
      }
    }
  };
});
