import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Este alias debe ser configurado para apuntar a la carpeta src
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split libraries into separate chunks
          'vendor': ['react', 'react-dom'], // Adjust based on your dependencies
        },
      },
    },
    // Configuración de optimización de la construcción para producción
    outDir: 'dist', // Directorio de salida
    assetsDir: 'assets', // Carpeta para recursos estáticos
    sourcemap: false, // No genera mapas de origen en producción
    minify: 'esbuild', // Usar esbuild para la minificación (rápido y eficiente)
    chunkSizeWarningLimit: 2000, // Limita el tamaño de los fragmentos antes de mostrar advertencias
    cssCodeSplit: true // Divide el CSS para que sea más eficiente,
  },
})
