import React, { useState, useRef, useEffect } from 'react'
import { animate as anime, stagger } from 'animejs'
import Keyboard from './Keyboard'

const testTexts = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  "Technology is rapidly changing the way we live and work. From smartphones to artificial intelligence, innovation continues to shape our future in unprecedented ways.",
  "Learning to type efficiently is a valuable skill in today's digital world. Practice regularly and focus on accuracy before speed to develop proper muscle memory.",
  "The art of programming requires patience, logic, and creativity. Good code is not just about making things work, but writing clean and maintainable solutions.",
  "Success comes from consistent effort and dedication. Small daily improvements lead to significant results over time. Never underestimate the power of persistence.",
  "The sun always shines above the clouds. Keep your face to the sunshine and you cannot see a shadow. The future belongs to those who believe in the beauty of their dreams.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. The only way to do great work is to love what you do.",
  "Life is a journey, not a destination. It is not in the stars to hold our destiny but in ourselves. The purpose of our lives is to be happy."
]

const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')

const TypingTest = () => {
  const [testText, setTestText] = useState(testTexts[0])
  const [userInput, setUserInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [errors, setErrors] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [isFinished, setIsFinished] = useState(false)
  
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [correctChars, setCorrectChars] = useState(0)
  
  const [activeKey, setActiveKey] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    // Animate stats when they change
    try {
      if (wpm > 0) {
        const wpmEl = document.querySelector('[data-wpm]')
        if (wpmEl) {
          const current = parseInt(wpmEl.innerHTML) || 0
          if (current !== wpm) {
            anime({
              targets: wpmEl,
              innerHTML: [current, wpm],
              round: 1,
              duration: 800,
              easing: 'easeOutExpo'
            })
          }
        }
      }
      
      const accEl = document.querySelector('[data-accuracy]')
      if (accEl) {
        const currentText = accEl.innerHTML
        const current = parseInt(currentText.replace('%', '')) || 100
        if (Math.abs(current - accuracy) > 1) {
          anime({
            targets: accEl,
            innerHTML: [current, accuracy],
            round: 1,
            duration: 800,
            easing: 'easeOutExpo',
            update: function(anim) {
              const val = Math.round(anim.animatables[0].target.innerHTML)
              if (accEl) {
                accEl.innerHTML = val + '%'
              }
            }
          })
        }
      }
      
      const errEl = document.querySelector('[data-errors]')
      if (errEl) {
        const current = parseInt(errEl.innerHTML) || 0
        if (current !== errors.length) {
          anime({
            targets: errEl,
            innerHTML: [current, errors.length],
            round: 1,
            duration: 600,
            easing: 'easeOutBounce'
          })
          
          // Shake animation on error
          if (errEl.parentElement) {
            anime({
              targets: errEl.parentElement,
              translateX: [-5, 5, -5, 5, 0],
              duration: 400,
              easing: 'easeInOutQuad'
            })
          }
        }
      }
    } catch (error) {
      console.error('Stats animation error:', error)
    }
  }, [wpm, accuracy, errors])

  useEffect(() => {
    // Celebrate on completion
    if (isFinished) {
      try {
        const completeEl = document.querySelector('.test-complete')
        if (completeEl) {
          anime({
            targets: completeEl,
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutElastic(1, .8)'
          })
        }
        
        // Confetti-like animation for stats
        const statCards = document.querySelectorAll('.stat-card')
        if (statCards.length > 0) {
          anime({
            targets: statCards,
            scale: [1, 1.1, 1],
            duration: 800,
            delay: stagger(100),
            easing: 'easeOutElastic(1, .8)'
          })
        }
      } catch (error) {
        console.error('Completion animation error:', error)
      }
    }
  }, [isFinished])

  const handleInput = (e) => {
    if (isFinished) return
    
    const value = e.target.value
    const char = value[value.length - 1]
    
    if (!startTime && value.length === 1) {
      setStartTime(Date.now())
    }

    if (char === testText[currentIndex]) {
      setCorrectChars(prev => prev + 1)
    } else if (char) {
      setErrors(prev => [...prev, currentIndex])
    }

    setUserInput(value)
    setCurrentIndex(value.length)

    // Calculate stats
    if (startTime && value.length > 0) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60
      const wordsTyped = value.trim().split(/\s+/).length
      const newWpm = Math.round(wordsTyped / timeElapsed)
      const newAccuracy = Math.round((correctChars / value.length) * 100) || 100
      
      setWpm(newWpm)
      setAccuracy(newAccuracy)
    }

    // Check if finished
    if (value.length >= testText.length) {
      setIsFinished(true)
      setEndTime(Date.now())
    }
  }

  const handleKeyDown = (e) => {
    if (e.key.length === 1) {
      setActiveKey(e.key.toLowerCase())
    }
  }

  const handleKeyUp = () => {
    setActiveKey('')
  }

  const resetTest = () => {
    setUserInput('')
    setCurrentIndex(0)
    setErrors([])
    setStartTime(null)
    setEndTime(null)
    setIsFinished(false)
    setWpm(0)
    setAccuracy(100)
    setCorrectChars(0)
    inputRef.current?.focus()
  }

  const newTest = () => {
    const randomText = testTexts[Math.floor(Math.random() * testTexts.length)]
    setTestText(randomText)
    resetTest()
  }

  const renderText = () => {
    return testText.split('').map((char, index) => {
      let className = 'text-[#999] dark:text-gray-500'
      
      if (index < currentIndex) {
        className = errors.includes(index) ? 'char-incorrect font-bold' : 'char-correct font-bold'
      } else if (index === currentIndex) {
        className = 'char-current font-bold px-1'
      }

      return <span key={index} className={className}>{char}</span>
    })
  }



  const totalTime = endTime && startTime ? ((endTime - startTime) / 1000).toFixed(1) : 0

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Stats */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="stat-card bg-[#3498db] border-3 border-black shadow-[3px_3px_0px_#000] px-4 py-2 text-white">
            <div className="text-xs font-black">WPM</div>
            <div data-wpm className="text-3xl font-black leading-none">0</div>
          </div>
          <div className="stat-card bg-[#2ecc71] border-3 border-black shadow-[3px_3px_0px_#000] px-4 py-2 text-white">
            <div className="text-xs font-black">ACCURACY</div>
            <div data-accuracy className="text-3xl font-black leading-none">100%</div>
          </div>
          <div className="stat-card bg-[#e74c3c] border-3 border-black shadow-[3px_3px_0px_#000] px-4 py-2 text-white">
            <div className="text-xs font-black">ERRORS</div>
            <div data-errors className="text-3xl font-black leading-none">0</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={resetTest} className="px-4 py-2 bg-[#95a5a6] text-white font-black text-sm border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            🔄 RESET
          </button>
          <button onClick={newTest} className="px-4 py-2 bg-[#9b59b6] text-white font-black text-sm border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            📝 NEW TEST
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {/* Left - Typing Area */}
        <div className="bg-white dark:bg-[#2c3e50] border-3 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col min-h-0">
          <h2 className="text-lg font-black text-[#1a1a1a] dark:text-white mb-3">TYPING TEST</h2>
          
          <div 
            onClick={() => inputRef.current?.focus()}
            className="flex-1 bg-[#fafafa] dark:bg-[#34495e] border-2 border-[#ddd] dark:border-gray-600 p-4 cursor-text overflow-auto mb-3"
          >
            <p className="text-2xl leading-relaxed font-mono select-none">
              {renderText()}
            </p>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className="opacity-0 absolute pointer-events-none"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            disabled={isFinished}
          />

          {isFinished ? (
            <div className="test-complete p-4 bg-[#2ecc71] border-2 border-black text-white text-center">
              <p className="text-xl font-black mb-2">🎉 TEST COMPLETE!</p>
              <p className="text-sm font-bold">Time: {totalTime}s | WPM: {wpm} | Accuracy: {accuracy}%</p>
            </div>
          ) : (
            <p className="text-xs text-[#666] dark:text-gray-400 font-bold text-center">
              Click to focus • Start typing the text above
            </p>
          )}
        </div>

        {/* Right - Keyboard */}
        <div className="bg-white dark:bg-[#2c3e50] border-3 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col justify-center">
          <Keyboard activeKey={activeKey} selectedLetters={allLetters} />
          <div className="mt-4 p-3 bg-[#ecf0f1] dark:bg-[#34495e] border-2 border-[#bdc3c7] dark:border-gray-600 text-center">
            <p className="text-xs font-bold text-[#555] dark:text-gray-300">
              {isFinished ? '✅ Test finished! Click RESET or NEW TEST' : '⌨️ Type the text to complete the test'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingTest

