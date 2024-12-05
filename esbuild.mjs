import esbuild from 'esbuild';
import cssModulesPlugin from 'esbuild-css-modules-plugin';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = process.env.NODE_ENV === 'development';
let watch = false;
let platform = 'browser';
for (var i = 0; i < process.argv.length; i++) {
  switch (process.argv[i]) {
    case '--watch':
      watch = true;
      break;
    case '--platform':
      i++;
      platform = process.argv[i];
      break;
  }
}

let entryPoints = [];
const root = join(cwd(), 'src');

const allProjects = readdirSync(root);

entryPoints = allProjects.reduce(
  /** @param { {in: string; out: string; }[] } acc */ (acc, dir) => {
    for (const filename of ['index.ts', 'index.js', 'index.mjs']) {
      if (existsSync(join(root, dir, filename))) {
        return [...acc, { in: join(root, dir, filename), out: dir }];
      }
    }
    return acc;
  },
  [],
);

const options = {
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  target: 'es2020',
  platform: platform,
  entryPoints,
  outdir: `dist/${isDev ? 'dev' : 'prod'}`,
  bundle: true,
  minify: !isDev,
  format: platform == 'browser' ? 'iife' : 'cjs',
  sourcemap: isDev,
  plugins: [cssModulesPlugin()],
};
if (watch) {
  options.plugins.push({
    name: 'on-end',
    setup: ({ onEnd }) =>
      onEnd(() => {
        console.log('watch build succeeded.');
      }),
  });
  const context = await esbuild.context(options);
  context.watch();
} else {
  esbuild.build(options).catch((err) => console.error(err));
}
