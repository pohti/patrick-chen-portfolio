'use client';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    setLoading(true);
    setReply('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  }

  return (
    <div
      className="p-4 border rounded max-w-lg"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        background: '#23272a',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        color: '#d4d4d4',
      }}
    >
      <h2 className="text-lg font-bold mb-2">Ia Nepo</h2>
      <textarea
        className="w-full p-2 border mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about stocks or ETFs..."
        style={{
          background: '#1e1e1e',
          color: '#d4d4d4',
          borderColor: '#444',
        }}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={sendMessage}
        disabled={loading}
        style={{ marginTop: '0.5rem' }}
      >
        {loading ? 'Thinking...' : 'Ask AI'}
      </button>
      {reply && <p className="mt-4 whitespace-pre-wrap">{reply}</p>}
    </div>
  );
}
