'use client';
import { useState, useRef, useEffect } from 'react';
import { Input } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LoadingOutlined } from '@ant-design/icons';
import './chat.css';

const { TextArea } = Input;
type Message = {
  role: 'user' | 'ai';
  content: string;
};

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function sendMessage() {
    if (!input.trim()) return;
    setLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: input }]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    // Add AI response
    setMessages((prev) => [...prev, { role: 'ai', content: data.reply }]);
    setInput('');
    setLoading(false);
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial layout: center textarea if no messages
  if (messages.length === 0) {
    return (
      <div
        style={{
          minHeight: '90vh',
          minWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#d4d4d4',
        }}
      >
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            maxWidth: '850px',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <h2
            style={{
              color: '#2a86a7',
              fontWeight: 'bold',
              fontSize: '2rem',
              marginBottom: '1rem',
            }}
          >
            What do you want to learn about investing?
          </h2>
          <TextArea
            className="ianepo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your investment question..."
            disabled={loading}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!loading && input.trim()) {
                  sendMessage();
                }
              }
            }}
          />
          {/* <CustomTextArea /> */}
          <button
            className="ianepo-submit-btn"
            type="submit"
            disabled={loading || !input.trim()}
          >
            {loading ? <LoadingOutlined spin /> : 'Send'}
          </button>
        </form>
      </div>
    );
  }

  // Chat layout: textarea fixed at bottom, messages above
  return (
    <div
      style={{
        minHeight: '90vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: '#1e1e1e',
        color: '#d4d4d4',
        position: 'relative',
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem 0 7rem 0',
          maxWidth: '850px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <h2
          style={{
            color: '#2a86a7',
            fontWeight: 'bold',
            fontSize: '2rem',
            marginBottom: '1rem',
          }}
        >
          Ia Nepo
        </h2>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                background: msg.role === 'user' ? '#2a86a7' : '#1e1e1e',
                color: msg.role === 'user' ? '#fff' : '#d4d4d4',
                borderRadius: '1rem',
                padding: '0.75rem 1.25rem',
                maxWidth: '70%',
                wordBreak: 'break-word',
                fontSize: '1.1rem',
                boxShadow:
                  msg.role === 'user'
                    ? '0 2px 8px rgba(42,134,167,0.08)'
                    : '0 2px 8px rgba(30,30,30,0.08)',
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input area fixed at bottom */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100vw',
          background: '#1e1e1e',
          boxShadow: '0 -2px 12px rgba(0,0,0,0.15)',
          padding: '1rem 0',
          zIndex: 10,
        }}
      >
        <form
          style={{
            display: 'flex',
            maxWidth: '850px',
            margin: '0 auto',
            width: '100%',
            gap: '1rem',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <TextArea
            className="ianepo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your investment question..."
            disabled={loading}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!loading && input.trim()) {
                  sendMessage();
                }
              }
            }}
          />
          <button
            className="ianepo-submit-btn"
            type="submit"
            disabled={loading || !input.trim()}
          >
            {loading ? <LoadingOutlined spin /> : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}
