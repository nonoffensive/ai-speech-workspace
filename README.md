# AI Speech Workspace

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## About

This project is a simple, web-based UI to generate small samples of text to speech using Microsoft's Edge-TTS.
It uses React components to render a limited set of controls for configuring the voice and will output a
growing list of audio samples that can be previewed and downloaded.

This is a proof of concept for other projects I am planning that more heavily integrate AI tools in the future.

## Getting Started

First, install the prequisite dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the text to speech workspace.

## Learn More

To generate Speech with Edge TTS, this project uses SchneeHertz's node-edge-tts project:

https://github.com/SchneeHertz/node-edge-tts/tree/master

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
