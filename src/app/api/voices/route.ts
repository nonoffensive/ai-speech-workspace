import { Voice } from '@/types/voice';
import { EdgeTTS } from '@andresaya/edge-tts';

export async function GET(request: Request) {
  const tts = new EdgeTTS();
  const voices = await tts.getVoices() as Voice[]
  // For example, fetch data from your DB here

  console.log(request.url)
  const query = new URLSearchParams(request.url.split('?')[1])
  console.log(query)
  const search = (query.get('search') || '').toLowerCase()
  const terms = search.length > 0 ? search.split(' ') : [] as string[]

  const matches = [] as Voice[]

  if (terms.length > 0) {
    for (const voice of voices) {
      const compare = Object.values(voice).join(' ').toLowerCase()
      console.log(compare)
      const hasMatch = terms.reduce((match, term) => {
        if (term === 'male') {
          return voice.Gender === 'Male' ? 1 : 0
        } else if (term === 'female') {
          return match + voice.Gender === 'Female' ? 1 : 0
        } else {
          return match + (compare.includes(term) ? 1 : 0)
        }
      }, 0)

      if (hasMatch === terms.length) matches.push(voice)
    }
  }

  console.log(terms.join(' '), matches.length)

  return new Response(JSON.stringify(matches), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}