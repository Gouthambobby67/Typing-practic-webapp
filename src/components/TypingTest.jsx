import React, { useState, useRef, useEffect } from 'react'
import { animate as anime, stagger } from 'animejs'
import Keyboard from './Keyboard'
import Stats from './Stats'

import { PRACTICE_TEXTS, ALL_LETTERS, COMPLETION_ANIMATION } from '../constants'
import TestTypingArea from './TestTypingArea'

const TypingTest = () => {
  const [testDuration, setTestDuration] = useState(60) // in seconds
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [testText, setTestText] = useState(PRACTICE_TEXTS[0])
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
    if (startTime && !isFinished) {
      const interval = setInterval(() => {
        setTimeElapsed(prevTime => {
          if (prevTime >= testDuration) {
            setIsFinished(true)
            return prevTime
          }
          return prevTime + 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [startTime, isFinished, testDuration])

  useEffect(() => {
    // Celebrate on completion
    if (isFinished) {
      try {
        const completeEl = document.querySelector('.test-complete')
        if (completeEl) {
          anime({
            targets: completeEl,
            ...COMPLETION_ANIMATION,
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
    if (char === ' ' && startTime && value.length > 0) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60
      const wordsTyped = value.trim().split(/\s+/).length
      const newWpm = Math.round(wordsTyped / timeElapsed)
      const newAccuracy = Math.round((correctChars / value.length) * 100) || 100
      
      setWpm(newWpm)
      setAccuracy(newAccuracy)
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
    setTimeElapsed(0)
    inputRef.current?.focus()
  }

  const newTest = () => {
    const randomText = PRACTICE_TEXTS[Math.floor(Math.random() * PRACTICE_TEXTS.length)]
    setTestText(randomText)
    resetTest()
  }







  return (
    <div className="h-full flex flex-col gap-4">
      {/* Stats */}
      <div className="flex items-center justify-between">
        <Stats wpm={wpm} accuracy={accuracy} errors={errors.length} />
        <div className="flex items-center gap-2">
          <div className="text-2xl font-black text-[#1a1a1a] dark:text-white" aria-live="polite">{timeElapsed}s</div>
          <div className="flex gap-2">
            <button onClick={() => setTestDuration(30)} aria-label="Set test duration to 30 seconds" className={`px-3 py-1 font-black text-xs border-2 border-black ${testDuration === 30 ? 'bg-[#3498db] text-white' : 'bg-white text-[#666]'}`}>30s</button>
            <button onClick={() => setTestDuration(60)} aria-label="Set test duration to 60 seconds" className={`px-3 py-1 font-black text-xs border-2 border-black ${testDuration === 60 ? 'bg-[#3498db] text-white' : 'bg-white text-[#666]'}`}>60s</button>
            <button onClick={() => setTestDuration(120)} aria-label="Set test duration to 120 seconds" className={`px-3 py-1 font-black text-xs border-2 border-black ${testDuration === 120 ? 'bg-[#3498db] text-white' : 'bg-white text-[#666]'}`}>120s</button>
          </div>
          <button onClick={resetTest} aria-label="Reset test" className="px-4 py-2 bg-[#95a5a6] text-white font-black text-sm border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            🔄 RESET
          </button>
          <button onClick={newTest} aria-label="New test" className="px-4 py-2 bg-[#9b59b6] text-white font-black text-sm border-3 border-black shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            📝 NEW TEST
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {/* Left - Typing Area */}
        <TestTypingArea
          testText={testText}
          userInput={userInput}
          currentIndex={currentIndex}
          errors={errors}
          inputRef={inputRef}
          handleInput={handleInput}
          handleKeyDown={handleKeyDown}
          handleKeyUp={handleKeyUp}
          isFinished={isFinished}
        />

        {/* Right - Keyboard */}
        <div className="bg-white dark:bg-[#2c3e50] border-3 border-black shadow-[4px_4px_0px_#000] p-4 flex flex-col justify-center">
          <Keyboard activeKey={activeKey} selectedLetters={ALL_LETTERS} />
          <div className="mt-4 p-3 bg-[#ecf0f1] dark:bg-[#34495e] border-2 border-[#bdc3c7] dark:border-gray-600 text-center">
            <p className="text-xs font-bold text-[#555] dark:text-gray-300">
              {isFinished ? '✅ Test finished! Click RESET or NEW TEST' : '⌨️ Type the text to complete the test'}
            </p>
          </div>
        </div>
      </div>
      {isFinished && <TestResults wpm={wpm} accuracy={accuracy} />}
    </div>
  )
}

export default TypingTest

