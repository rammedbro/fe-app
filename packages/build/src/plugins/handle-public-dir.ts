import { suppressViteLoggerWarn } from '@/utils';
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

export function handlePublicDir(options: {
  outDir: string;
  publicDir: string;
}): Plugin {
  const { outDir, publicDir } = options;

  return {
    name: 'fe-app-handle-public-dir',
    enforce: 'post',
    config(config) {
      suppressViteLoggerWarn(
        config.customLogger!,
        msg => msg.includes('Files in the public directory are served at the root path'),
      );
    },
    configureServer({ middlewares }) {
      middlewares.use(`/${ publicDir }`, (req, res) => {
        const filePath = path.join(publicDir, req.url!.slice(1));

        return res.end(fs.readFileSync(filePath));
      });
    },
    buildEnd() {
      if (fs.existsSync(publicDir)) {
        fs.cpSync(publicDir, path.join(outDir, publicDir), { recursive: true });
      }
    },
  };
}
