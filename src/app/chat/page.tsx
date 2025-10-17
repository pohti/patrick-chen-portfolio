'use client';
import { useState, useRef, useEffect } from 'react';
import { Input } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { StopOutlined, SendOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './Chat.module.css';

const { TextArea } = Input;
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const examplePrompts = [
    'Is it better to invest in S&P 500 index funds or pick individual stocks?',
    'Should I invest in rental property or REITs?',
    'Is Bitcoin a good hedge against inflation?',
    'What are the risks of government bonds?',
    'How should a beginner diversify their portfolio?',
    'What do you think about this article? [insert URL here]',
  ];

  async function sendMessage(customMessage?: string) {
    const messageToSend = customMessage ?? input;
    if (!messageToSend.trim()) return;
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    setAbortController(controller);

    // Add user message
    const newUserMessage = { role: 'user' as const, content: messageToSend };
    const updatedMessages = [...messages, newUserMessage];
    setMessages((prev) => [...prev, newUserMessage]);
    // Add placeholder AI message
    // necessary to provide immediate visual feedback, loading state indication and prevents UI jump
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
        signal: controller.signal, // attach abort signal
      });

      if (res.status === 429) {
        const data = await res.json();
        setError(
          data.error || 'Daily request limit reached. Try again tomorrow.'
        );
        setLoading(false);
        return;
      }

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiContent = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          aiContent += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: 'assistant',
              content: aiContent,
            };
            return updated;
          });
        }
      }

      setInput('');
      setLoading(false);
      setAbortController(null);
      textAreaRef.current?.focus();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User canceled
        setError('Request was stopped.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong.');
      }
      setLoading(false);
      setAbortController(null);
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!loading) {
      textAreaRef.current?.focus();
    }
  }, [messages, loading]);

  function stopRequest() {
    if (abortController) {
      abortController.abort();
    }
  }

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
          padding: '1rem',
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
              color: 'var(--font-color-primary)',
              fontWeight: 'bold',
              fontSize: '2rem',
              marginBottom: '1rem',
            }}
          >
            What do you want to learn about investing?
          </h2>

          {/* Example Prompts */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            {examplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(prompt)}
                className={styles.examplePromptBtn}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
            <TextArea
              className={styles.textArea}
              ref={(el) => {
                if (
                  el &&
                  'resizableTextArea' in el &&
                  el.resizableTextArea?.textArea
                ) {
                  textAreaRef.current = el.resizableTextArea.textArea;
                }
              }}
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
              className={styles.warrenSubmitBtn}
              type="submit"
              disabled={loading || !input.trim()}
            >
              {loading ? <LoadingOutlined spin /> : <SendOutlined />}
            </button>
          </div>
          {error && (
            <div
              style={{
                color: '#ff4d4f',
                background: 'var(--background)',
                border: '1px solid #ff4d4f',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                marginTop: '1rem',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {error}
            </div>
          )}
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
        background: 'var(--background)',
        color: '#d4d4d4',
        position: 'relative',
        padding: '1rem',
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
                background:
                  msg.role === 'user' ? '#2a86a7' : 'var(--background)',
                color: msg.role === 'user' ? '#fff' : '#d4d4d4',
                borderRadius: '1rem',
                padding: '0.75rem 1.25rem',
                maxWidth: '100%',
                wordBreak: 'break-word',
                fontSize: '1.1rem',
                boxShadow:
                  msg.role === 'user'
                    ? '0 2px 8px rgba(42,134,167,0.08)'
                    : '0 2px 8px rgba(30,30,30,0.08)',
              }}
            >
              {msg.role === 'assistant' && msg.content === '' && loading ? (
                <div className={styles.typing}>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                </div>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              )}
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
          background: 'var(--background)',
          // boxShadow: '0 -2px 12px rgba(0,0,0,0.15)',
          padding: '1rem 0.5rem',
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
            className={styles.textArea}
            ref={(el) => {
              if (
                el &&
                'resizableTextArea' in el &&
                el.resizableTextArea?.textArea
              ) {
                textAreaRef.current = el.resizableTextArea.textArea;
              }
            }}
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
          {loading ? (
            <button
              className={styles.warrenSubmitBtn}
              type="button"
              onClick={stopRequest}
            >
              <StopOutlined />
            </button>
          ) : (
            <button
              className={styles.warrenSubmitBtn}
              type="submit"
              disabled={!input.trim()}
            >
              <SendOutlined />
            </button>
          )}
        </form>
        {error && (
          <div
            style={{
              color: '#ff4d4f',
              background: 'var(--background)',
              border: '1px solid #ff4d4f',
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              marginTop: '1rem',
              textAlign: 'center',
              fontWeight: 'bold',
              maxWidth: '850px',
              margin: '1rem auto 0 auto',
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
