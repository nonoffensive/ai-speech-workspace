import { Voice } from '@/types/voice';
import { EdgeTTS } from '@andresaya/edge-tts';

export async function GET(request: Request) {
  const genders = ['male', 'female']
  const tts = new EdgeTTS();
  const voices = await tts.getVoices() as Voice[]

  const query = new URLSearchParams(request.url.split('?')[1])
  const search = (query.get('search') || '').toLowerCase()
  const terms = search.length > 0 ? search.split(' ') : [] as string[]

  const matches = [] as Voice[]

  if (terms.length > 0) {
    for (const voice of voices) {
      const compare = Object.values(voice).join(' ').toLowerCase()

      const hasMatch = terms.reduce((match, term) => {
        if (genders.includes(term) ) {
          return match + (voice.Gender.toLowerCase() === term ? 1 : 0)
        } else {
          return match + (compare.includes(term) ? 1 : 0)
        }
      }, 0)

      if (hasMatch === terms.length) matches.push(voice)
    }
  }

  return new Response(JSON.stringify(matches), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}