'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import { Voice } from "@/types/voice";
import Spinner from "@/components/ui/spinner";
import Range from "@/components/ui/range";

export default function Home() {
  const [search, setSearch] = useState('')
  const [voice, setVoice] = useState('')
  const [rate, setRate] = useState(0)
  const [pitch, setPitch] = useState(0)
  const [text, setText] = useState('')
  const [clips, setClips] = useState([] as any[])
  const [hello, setHello] = useState('')

  const fetcher = (options: string[]) => fetch(options[0] + `?search=${options[1]}`).then(async (r) => await r.json() as Voice[])

  const {data, error, isLoading} = useSWR(['/api/voices', search], fetcher);

  useEffect(() => {
    if (voice) {
      fetch(`/api/speak?text=Hello&voice=${voice}&rate=${rate}&pitch=${pitch}`).then(async (r) => {
        setHello(await r.text())
      })
    }
  }, [voice])

  const synthesizeSpeech = async () => {
    const params = new URLSearchParams()
    params.set('text', text)
    params.set('voice', voice)
    params.set('rate', String(rate))
    params.set('pitch', String(pitch))
    const base64: string = await fetch(`/api/speak?` + params.toString()).then(r => r.text())
    setClips(clips.concat([{
      audio: base64,
      text,
      voice,
      rate,
      pitch
    }]))
  }

  return (
    <div className="flex flex-row items-start pt-6 justify-start min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 content-start justify-start">
        <div className="flex gap-4 items-center flex-row sm:flex-row">
          <div className="flex gap-4 items-center flex-row sm:flex-row border-1 border-gray-300 px-4 py-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="text" className="border-none outline-none w-full" name="voiceSearch" onInput={(e) => setSearch(e.currentTarget.value)} placeholder="Search Voices..." />
          </div>

          <Range name="pitch" min={-20} max={20} defaultValue={0} onChange={(value: number) => setPitch(value)} />
          <Range name="rate" min={-50} max={50} defaultValue={0} onChange={(value: number) => setRate(value)} />

          <div>
            <button
              className="cursor-pointer font-semibold px-4 py-2 bg-blue-700 rounded-xl"
              onClick={synthesizeSpeech}
            >
              Generate
            </button>
          </div>
          
        </div>
        <textarea
          placeholder="Text to speak..."
          name="text"
          className="bg-white text-black px-2 py-1 border-1 outline-0 rounded-sm"
          onInput={(e) => setText(e.currentTarget.value)}
        />

        <div className="flex flex-col flex-wrap items-center">
          { isLoading && search ? (
            <Spinner />
          ):(
            <div className="flex flex-row flex-wrap items-center gap-4 w-max-[500px]">
              { data && data.map((v, i) => (
                <span
                  key={i}
                  onClick={() => setVoice(v.ShortName)}
                  className={ 'cursor-pointer px-2 py-1 rounded border-1' + (v.ShortName===voice ? ' border-gray-500' : ' border-gray-800')}
                >{v.ShortName} {v.Gender === 'Male' ? '♂' : '♀'}</span>
              ))}
            </div>
          )}
        </div>
        { hello && (
          <audio src={hello} autoPlay={true} />
        )}

      </main>
      <div className="flex flex-col gap-4">
        { clips.length > 0 && clips.map( (clip, i) => (
          <div key={i} className="flex flex-row">
            <div className="flex flex-col">
              <span>{clip.voice} - {clip.text}</span>
              <audio src={clip.audio} controls={true} />
            </div>
          </div>
        ))}
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
