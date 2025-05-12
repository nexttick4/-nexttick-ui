'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ✅ Your actual Supabase credentials
const supabaseUrl = 'https://syxhyqgvtnkscrowukaq.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5eGh5cWd2dG5rc2Nyb3d1a2FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTQ2NzUsImV4cCI6MjA2MjM5MDY3NX0.8i_pzIAGrKfVL7woKgLVkm5W4AkYsxcoD9GiX3rC6QU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Signal = {
  id: number;
  headline: string;
  summary: string;
  confidence: number;
  sector: string;
  source: string;
  created_at: string;
};

export default function HomePage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('signals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching signals:', error.message);
      } else {
        setSignals(data || []);
      }
      setLoading(false);
    };

    fetchSignals();
  }, []);

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">📡 NextTick Signals</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading signals...</p>
      ) : signals.length === 0 ? (
        <p className="text-center text-gray-500">No signals available.</p>
      ) : (
        <div className="space-y-6">
          {signals.map((signal) => (
            <div key={signal.id} className="border p-4 rounded-xl shadow-sm bg-white">
              <h2 className="font-semibold text-lg mb-1">{signal.headline}</h2>
              <p className="text-gray-700 text-sm mb-2">{signal.summary}</p>
              <div className="flex flex-wrap text-xs text-gray-600 gap-4">
                <span>📊 Confidence: <strong>{signal.confidence}%</strong></span>
                <span>🏷️ Sector: {signal.sector}</span>
                <span>📰 Source: {signal.source}</span>
                <span>⏱️ {new Date(signal.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
