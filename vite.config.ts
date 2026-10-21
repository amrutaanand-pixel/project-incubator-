import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function geminiServerPlugin(): Plugin {
  return {
    name: 'gemini-server-plugin',
    configureServer(server) {
      server.middlewares.use('/api/gemini/advisor', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({error: 'Method not allowed'}));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const {idea, domain, targetEvent} = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                fallback: true,
                message: 'No GEMINI_API_KEY configured. Utilizing smart engine.'
              }));
              return;
            }

            const ai = new GoogleGenAI({
              apiKey: apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const prompt = `You are the lead startup & hackathon advisor at "Project Incubator - Where Ideas Find Teams".
Analyze this student innovation project:
Idea: "${idea}"
Domain: "${domain || 'Interdisciplinary Technology'}"
Target Event / Goal: "${targetEvent || 'Hackathon / Startup MVP'}"

Provide a structured JSON response with exactly this shape:
{
  "summary": "2-sentence executive summary of the innovation potential and multidisciplinary synergy",
  "roadmaps": [
    {"phase": "Phase 1: Ideation & Architecture (Week 1-2)", "deliverables": ["...", "..."], "keyMilestone": "..."},
    {"phase": "Phase 2: Multidisciplinary MVP (Week 3-4)", "deliverables": ["...", "..."], "keyMilestone": "..."},
    {"phase": "Phase 3: Integration & Testing (Week 5-6)", "deliverables": ["...", "..."], "keyMilestone": "..."}
  ],
  "requiredRoles": [
    {"role": "e.g. Lead Full-Stack Dev", "department": "Computer Science", "skills": ["React", "FastAPI"], "responsibilities": "..."},
    {"role": "e.g. Hardware / Embedded Engineer", "department": "Electronics / Mechatronics", "skills": ["ESP32", "Firmware"], "responsibilities": "..."},
    {"role": "e.g. Product & UI Designer", "department": "Design / Media", "skills": ["Figma", "User Journey"], "responsibilities": "..."}
  ],
  "recommendedTechStack": {
    "frontend": ["..."],
    "backend": ["..."],
    "aiOrHardware": ["..."],
    "cloudDatabase": ["..."]
  },
  "learningResources": [
    {"title": "...", "type": "Documentation / Course / Paper", "description": "..."}
  ],
  "hackathonTips": ["Tip 1 on pitching to judges", "Tip 2 on team synergy"]
}
Only output valid JSON, no markdown codeblocks.`;

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
            });

            let text = response.text || '';
            if (text.startsWith('```json')) {
              text = text.replace(/^```json/, '').replace(/```$/, '');
            } else if (text.startsWith('```')) {
              text = text.replace(/^```/, '').replace(/```$/, '');
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(text.trim());
          } catch (err: any) {
            console.error('Gemini advisor error:', err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({
              fallback: true,
              error: err?.message || 'Server error',
            }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
