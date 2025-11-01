import { useState, useEffect, useRef } from 'react'
import LetterSelector from './components/LetterSelector'
import TypingArea from './components/TypingArea'
import Stats from './components/Stats'
import Keyboard from './components/Keyboard'
import TypingTest from './components/TypingTest'

function App() {
  const [activeTab, setActiveTab] = useState('practice') // 'practice' or 'test'
  // Letter selection state
  const [selectedLetters, setSelectedLetters] = useState(['a', 's', 'd', 'f'])
  const [practiceText, setPracticeText] = useState('')
  
  // Typing state
  const [userInput, setUserInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [errors, setErrors] = useState([])
  const [startTime, setStartTime] = useState(null)
  
  // Stats
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [totalChars, setTotalChars] = useState(0)
  const [correctChars, setCorrectChars] = useState(0)
  
  // Keyboard highlight
  const [activeKey, setActiveKey] = useState('')

  // Generate practice text based on selected letters
  const generateText = () => {
    if (selectedLetters.length === 0) return ''
    
    const words = []
    const wordCount = 50 // Generate 50 words
    
    for (let i = 0; i < wordCount; i++) {
      const wordLength = Math.floor(Math.random() * 4) + 3 // 3-6 characters
      let word = ''
      for (let j = 0; j < wordLength; j++) {
        const randomLetter = selectedLetters[Math.floor(Math.random() * selectedLetters.length)]
        word += randomLetter
      }
      words.push(word)
    }
    
    return words.join(' ')
  }

  // Initialize text when letters change
  useEffect(() => {
    if (selectedLetters.length > 0) {
      const newText = generateText()
      setPracticeText(newText)
      setUserInput('')
      setCurrentIndex(0)
      setErrors([])
      setStartTime(null)
      setWpm(0)
      setAccuracy(100)
      setTotalChars(0)
      setCorrectChars(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLetters])

  const resetPractice = () => {
    setUserInput('')
    setCurrentIndex(0)
    setErrors([])
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setTotalChars(0)
    setCorrectChars(0)
  }

  const handleInput = (e) => {
    const value = e.target.value
    const char = value[value.length - 1]
    
    // Start timer on first character
    if (!startTime && value.length === 1) {
      setStartTime(Date.now())
    }

    // Check if character is correct
    if (char === practiceText[currentIndex]) {
      setCorrectChars(prev => prev + 1)
      setActiveKey(char)
    } else if (char) {
      setErrors(prev => [...prev, currentIndex])
      setActiveKey('')
    }

    setUserInput(value)
    setCurrentIndex(value.length)
    setTotalChars(value.length)

    // Calculate stats
    if (startTime && value.length > 0) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
      const wordsTyped = value.trim().split(/\s+/).length
      const newWpm = Math.round(wordsTyped / timeElapsed)
      const newAccuracy = Math.round((correctChars / value.length) * 100) || 100
      
      setWpm(newWpm)
      setAccuracy(newAccuracy)
    }

    // Generate new text when reaching the end
    if (value.length >= practiceText.length - 10) {
      const newText = generateText()
      setPracticeText(prev => prev + ' ' + newText)
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

  return (
    <div className="h-screen bg-[#f5f5f5] p-4 overflow-hidden">
      <div className="h-full max-w-[1600px] mx-auto flex flex-col gap-4">
        {/* Header + Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black text-[#1a1a1a]">TypePractice</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('practice')}
                className={`px-4 py-2 font-black text-sm border-3 border-black transition-all
                  ${activeTab === 'practice'
                    ? 'bg-[#3498db] text-white shadow-[3px_3px_0px_#000]'
                    : 'bg-white text-[#666] shadow-[2px_2px_0px_#000]'}
                  active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]`}
              >
                📚 PRACTICE
              </button>
              <button
                onClick={() => setActiveTab('test')}
                className={`px-4 py-2 font-black text-sm border-3 border-black transition-all
                  ${activeTab === 'test'
                    ? 'bg-[#3498db] text-white shadow-[3px_3px_0px_#000]'
                    : 'bg-white text-[#666] shadow-[2px_2px_0px_#000]'}
                  active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]`}
              >
                🎯 TEST
              </button>
            </div>
          </div>
          {activeTab === 'practice' && (
            <Stats wpm={wpm} accuracy={accuracy} errors={errors.length} />
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-h-0">
          {activeTab === 'practice' ? (
            <div className="h-full grid grid-cols-2 gap-4 min-h-0">
              {/* Left Column */}
              <div className="flex flex-col gap-4 min-h-0">
                <LetterSelector 
                  selectedLetters={selectedLetters}
                  setSelectedLetters={setSelectedLetters}
                  onReset={resetPractice}
                />
                <div className="flex-1 min-h-0">
                  <Keyboard 
                    activeKey={activeKey}
                    selectedLetters={selectedLetters}
                  />
                </div>
              </div>

              {/* Right Column - Typing Area */}
              <div className="min-h-0">
                <TypingArea
                  practiceText={practiceText}
                  userInput={userInput}
                  currentIndex={currentIndex}
                  errors={errors}
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                />
              </div>
            </div>
          ) : (
            <TypingTest />
          )}
        </div>
      </div>
    </div>
  )
}

export default App

