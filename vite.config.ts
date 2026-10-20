import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serves the Vercel function in api/ask.ts during `npm run dev`, so the
 * "Ask about Hamza" chat works locally without the Vercel CLI.
 */
function askApiDev(): Plugin {
  return {
    name: 'ask-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/ask', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        const body = await new Promise<string>((resolve, reject) => {
          let data = ''
          req.on('data', (chunk) => (data += chunk))
          req.on('end', () => resolve(data))
          req.on('error', reject)
        })
        const { POST } = await server.ssrLoadModule('/api/ask.ts')
        const response: Response = await POST(
          new Request('http://localhost/api/ask', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body,
          }),
        )
        res.statusCode = response.status
        res.setHeader('content-type', response.headers.get('content-type') ?? 'application/json')
        res.end(await response.text())
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // expose GEMINI_* from .env.local to the dev API route (never to the client bundle)
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'GEMINI_'))

  return {
    plugins: [react(), askApiDev()],
    build: {
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three'],
            r3f: ['@react-three/fiber', '@react-three/drei'],
            motion: ['framer-motion', 'gsap'],
          },
        },
      },
    },
  }
})
