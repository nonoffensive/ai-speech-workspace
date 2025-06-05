import { EdgeTTS } from '@andresaya/edge-tts';

type Query = {
    rate: number|undefined,
    pitch: number|undefined,
    voice: string,
    text: string
}

export async function GET(request: Request) {
  const tts = new EdgeTTS();
  const query = new URLSearchParams(request.url.split('?')[1])
  const {rate, pitch, voice, text} = Object.fromEntries(query.entries())

  await tts.synthesize(text, voice, {
    rate: (rate || 0) + '%',
    pitch: (pitch || 0) + 'Hz',
    volume: '0%'
  })

  const raw = tts.toBase64()

  return new Response('data:audio/wav;base64,' + raw, {
    status: 200,
    headers: {'Content-Type': 'text/base64'},

  })
}