'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Signal = {
  id: number
  headline: string
  summary: string
  source: string
  confidence: number
  created_at: string
}

export default function Home() {
  const [signals, setSignals] = useState<Signal[]>([])

  useEffect(() => {
    const fetchSignals = async () => {
      const { data, error } = await supabase
        .from('signals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) console.error('Error fetching signals:', error)
      else setSignals(data || [])
    }

    fetchSignals()
  }, [])

  return (
    <div>
      <h1>Live Signals</h1>
      <ul>
        {signals.map(signal => (
          <li key={signal.id}>
            <strong>{signal.headline}</strong> - {signal.summary} ({signal.confidence}%)
          </li>
        ))}
      </ul>
    </div>
  )
}
