# sunoreverse

> Give it a song. Get the Suno prompt that would recreate it.

A Gemini-powered tool that reverse-engineers any music file or URL into a structured Suno AI style prompt. Upload an audio file or paste a link, and get back genre, vocal style, instruments, production style, mood, and tempo — ready to paste into Suno.

## Features

- 🎧 Two input modes: file upload or URL
- 🔍 Extracts genre, vocal style, instruments, production, mood, tempo
- 📄 Exportable Markdown output
- ⚡ Powered by Gemini API (multimodal audio analysis)

## Stack

React · TypeScript · Vite · Gemini API

## Run locally

**Prerequisites:** Node.js, a Gemini API key

```bash
npm install
cp .env.local.example .env.local  # add your GEMINI_API_KEY
npm run dev
```

## Live demo

[Open in AI Studio](https://ai.studio/apps/de3db29d-ec41-47b2-aa00-a60fc452e964)
