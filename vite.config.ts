import { defineConfig } from "@natsuneko-laboratory/kiana/vite";
import react from "@vitejs/plugin-react";
import type {
  NormalizedOutputOptions,
  OutputAsset,
  OutputBundle,
  OutputChunk,
  OutputOptions,
  PluginContext,
  RenderedChunk,
} from "rollup";
import type { Plugin } from "vite";

function directive(): Plugin[] {
  const useServer: string[] = [];
  const useClient: string[] = [];
  const plugins: Plugin[] = [];

  plugins.push(
    {
      name: "Directive Preprocess",
      enforce: "pre",
      transform: (code: string, id) => {
        if (code.startsWith('"use client";')) {
          useClient.push(id);
          return {
            code: code.substring('"use client";'.length),
            map: null,
          };
        }

        if (code.startsWith('"use server";')) {
          useServer.push(id);
          return {
            code: code.substring('"use server";'.length),
            map: null,
          };
        }

        return { code };
      },
    },
    {
      name: "Directive Postprocess",
      enforce: "post",
      async generateBundle(
        this: PluginContext,
        options: NormalizedOutputOptions,
        bundle: { [fileName: string]: OutputAsset | OutputChunk },
        isWrite: boolean
      ) {
        for (const filename in bundle) {
          const file = bundle[filename];
          if (file.type === "chunk") {
            if (file.code.startsWith('"use strict";')) {
              continue;
            }

            if (useServer.includes(file.facadeModuleId)) {
              file.code = `"use server";\n${file.code}`;
            }

            if (useClient.includes(file.facadeModuleId)) {
              file.code = `"use client";\n${file.code}`;
            }
          }
        }
      },
    }
  );

  return plugins;
}

export default defineConfig({
  plugins: [react(), ...directive()],
  externals: ["next/headers", "react", "react/jsx-runtime", "react-dom"],
});
