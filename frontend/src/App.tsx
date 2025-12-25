import { useState, useEffect, useRef } from 'react'
import './App.css'

const API_URL = 'http://localhost:3001'

// matrix effect for output block
function MatrixRain({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateSize = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }
    updateSize()

    const chars = 'アイウエオカキクケコ01サシスセソ10タチツテト01ナニヌネノ10<>{}[]/*-+='
    const charArray = chars.split('')
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -50
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        const brightness = Math.random()
        if (brightness > 0.95) {
          ctx.fillStyle = '#ffffff'
        } else if (brightness > 0.7) {
          ctx.fillStyle = '#00ff41'
        } else {
          ctx.fillStyle = 'rgba(0, 255, 65, 0.3)'
        }

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0
        }
        drops[i] += 0.5
      }
    }

    const interval = setInterval(draw, 50)

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(container)

    return () => {
      clearInterval(interval)
      resizeObserver.disconnect()
    }
  }, [containerRef])

  return <canvas ref={canvasRef} className="matrix-canvas-output" />
}

const POPULAR_LANGUAGES = [
  'auto', 'javascript', 'typescript', 'python', 'java', 'cpp', 'csharp',
  'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'sql', 'html', 'css',
  'json', 'xml', 'bash', 'markdown'
]

function App() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('auto')
  const [highlightedHtml, setHighlightedHtml] = useState('')
  const [detectedLanguage, setDetectedLanguage] = useState('')
  const [languages, setLanguages] = useState<string[]>(POPULAR_LANGUAGES)
  const [isLoading, setIsLoading] = useState(false)
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const [copySuccess, setCopySuccess] = useState(false)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    checkBackendHealth()
  }, [])

  const checkBackendHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/health`)
      if (response.ok) {
        setBackendStatus('online')
        // load language list
        const langResponse = await fetch(`${API_URL}/api/languages`)
        if (langResponse.ok) {
          const data = await langResponse.json()
          setLanguages(['auto', ...data.languages])
        }
      } else {
        setBackendStatus('offline')
      }
    } catch {
      setBackendStatus('offline')
    }
  }

  const handleHighlight = async () => {
    if (!code.trim()) return
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/highlight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      })
      if (response.ok) {
        const data = await response.json()
        setHighlightedHtml(data.html)
        setDetectedLanguage(data.language || 'unknown')
      }
    } catch (error) {
      console.error('Highlight error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setCode('')
    setHighlightedHtml('')
    setDetectedLanguage('')
    setLanguage('auto')
  }

  const handleCopy = async () => {
    if (!highlightedHtml) return
    try {
      await navigator.clipboard.writeText(code)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  // sync line numbers scroll with textarea
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  const lineCount = code ? code.split('\n').length : 1
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1)

  const outputContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="terminal">
      <div className="scanline"></div>
      
      <header className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn-close"></span>
          <span className="btn-minimize"></span>
          <span className="btn-maximize"></span>
        </div>
        <div className="terminal-title">
          <span className="blink">▊</span> SYNTAX_HIGHLIGHTER.exe
        </div>
        <div className={`connection-status ${backendStatus}`}>
          [{backendStatus === 'checking' ? 'CONNECTING...' : 
            backendStatus === 'online' ? 'CONNECTED' : 'OFFLINE'}]
        </div>
      </header>

      <main className="terminal-body">
        <div className="ascii-title">
{`
 ███████╗██╗   ██╗███╗   ██╗████████╗ █████╗ ██╗  ██╗
 ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝██╔══██╗╚██╗██╔╝
 ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║   ███████║ ╚███╔╝ 
 ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║   ██╔══██║ ██╔██╗ 
 ███████║   ██║   ██║ ╚████║   ██║   ██║  ██║██╔╝ ██╗
 ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
`}
        </div>

        <div className="command-line">
          <span className="prompt">root@highlighter:~$</span>
          <span className="command"> ./highlight --lang=</span>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="lang-select"
            data-testid="language-select"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {lang === 'auto' ? 'auto-detect' : lang}
              </option>
            ))}
          </select>
        </div>

        <div className="main-layout">
          {/* code input */}
          <div className="input-block">
            <div className="block-header">
              <span className="label">INPUT</span>
              <span className="line-count">[{lineCount} lines]</span>
            </div>
            <div className="code-container">
              <div className="line-numbers" ref={lineNumbersRef}>
                {lineNumbers.map(num => (
                  <div key={num} className="line-number">{String(num).padStart(3, '0')}</div>
                ))}
              </div>
              <div className="input-area">
                {!code && (
                  <div className="empty-input" onClick={() => textareaRef.current?.focus()}>
                    <span className="cursor-blink">_</span>
                    <p>Awaiting input...</p>
                  </div>
                )}
                <textarea
                  ref={textareaRef}
                  className="code-input"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={handleScroll}
                  placeholder="// Enter your code here..."
                  spellCheck={false}
                  data-testid="code-input"
                />
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="action-bar">
            <button 
              className="terminal-btn primary"
              onClick={handleHighlight}
              disabled={!code.trim() || isLoading || backendStatus !== 'online'}
              data-testid="btn-execute"
            >
              {isLoading ? '[WAIT...]' : '[EXECUTE]'}
            </button>
            <button 
              className="terminal-btn"
              onClick={handleClear}
              disabled={!code && !highlightedHtml}
              data-testid="btn-clear"
            >
              [CLEAR]
            </button>
            <button 
              className="terminal-btn"
              onClick={handleCopy}
              disabled={!highlightedHtml}
              data-testid="btn-copy"
            >
              {copySuccess ? '[COPIED!]' : '[COPY]'}
            </button>
          </div>

          {/* result */}
          <div className="output-block">
            <div className="block-header">
              <span className="label">OUTPUT</span>
              {detectedLanguage && (
                <span className="language-badge" data-testid="language-badge">
                  [{detectedLanguage.toUpperCase()}]
                </span>
              )}
              {highlightedHtml && <span className="success-badge">✓</span>}
            </div>
            <div 
              ref={outputContainerRef}
              className={`output-container ${highlightedHtml ? 'has-content' : ''}`}
              data-testid="output-container"
            >
              {highlightedHtml ? (
                <pre>
                  <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
                </pre>
              ) : (
                <>
                  <MatrixRain containerRef={outputContainerRef} />
                  <div className="empty-output">
                    <p>Ready for output...</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="terminal-footer">
        <span>SYS: React + TypeScript + Express</span>
        <span>VER: 1.0.0</span>
        <span>MEM: {Math.floor(Math.random() * 100) + 400}KB</span>
      </footer>
    </div>
  )
}

export default App
