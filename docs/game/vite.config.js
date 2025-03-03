import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // 这样才能正确加载资源
  build: {
    outDir: 'dist' // 确保 `vite build` 仍然生成 dist/
  }
});
