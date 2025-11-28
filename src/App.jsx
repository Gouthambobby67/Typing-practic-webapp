import { useState, useCallback, lazy, Suspense, useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'
import LetterSelector from './components/LetterSelector'
import TypingArea from './components/TypingArea'
import Stats from './components/Stats'
import Keyboard from './components/Keyboard'
import { WORD_COUNT, WORD_LENGTH_RANGE } from './constants'

const TypingTest = lazy(() => import('./components/TypingTest'))
const PracticeMode = lazy(() => import('./components/PracticeMode'))

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext)
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
  const [correctChars, setCorrectChars] = useState(0)
  
  // Keyboard highlight
  const [activeKey, setActiveKey] = useState('')
  
  const generateText = useCallback(() => {
    if (selectedLetters.length === 0) return ''
    
    const words = []
    
    for (let i = 0; i < WORD_COUNT; i++) {
      const wordLength = Math.floor(Math.random() * (WORD_LENGTH_RANGE[1] - WORD_LENGTH_RANGE[0] + 1)) + WORD_LENGTH_RANGE[0]
      let word = ''
      for (let j = 0; j < wordLength; j++) {
        const randomLetter = selectedLetters[Math.floor(Math.random() * selectedLetters.length)]
        word += randomLetter
      }
      words.push(word)
    }
    
    return words.join(' ')
  }, [selectedLetters])

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
      setCorrectChars(0)
    }
  }, [selectedLetters, generateText])

  const resetPractice = () => {
    setUserInput('')
    setCurrentIndex(0)
    setErrors([])
    setStartTime(null)
    setWpm(0)
    setAccuracy(100)
    setCorrectChars(0)
  }

  const startTimer = () => {
    if (!startTime) {
      setStartTime(Date.now())
    }
  }

  const checkCharacter = (char) => {
    if (char === practiceText[currentIndex]) {
      setCorrectChars(prev => prev + 1)
      setActiveKey(char)
    } else if (char) {
      setErrors(prev => [...prev, currentIndex])
      setActiveKey('')
    }
  }

  const calculateStats = (value) => {
    if (startTime && value.length > 0) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
      const wordsTyped = value.trim().split(/\s+/).length
      const newWpm = Math.round(wordsTyped / timeElapsed)
      const newAccuracy = Math.round((correctChars / value.length) * 100) || 100
      
      setWpm(newWpm)
      setAccuracy(newAccuracy)
    }
  }

  const generateMoreText = (value) => {
    if (value.length >= practiceText.length - 10) {
      const newText = generateText()
      setPracticeText(prev => prev + ' ' + newText)
    }
  }

  const handleInput = (e) => {
    const value = e.target.value
    const char = value[value.length - 1]
    
    startTimer()
    checkCharacter(char)

    setUserInput(value)
    setCurrentIndex(value.length)

    calculateStats(value)
    generateMoreText(value)
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
    <div className="h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a] p-4 overflow-hidden">
      <div className="h-full max-w-[1600px] mx-auto flex flex-col gap-4">
        {/* Header + Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black text-[#1a1a1a] dark:text-white">TypePractice</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('practice')}
                aria-label="Practice Mode"
                className={`px-4 py-2 font-black text-sm border-3 border-black transition-all
                  ${activeTab === 'practice'
                    ? 'bg-[#3498db] text-white shadow-[3px_3px_0px_#000]'
                    : 'bg-white dark:bg-gray-700 text-[#666] dark:text-gray-300 shadow-[2px_2px_0px_#000]'}
                  active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]`}
              >
                📚 PRACTICE
              </button>
              <button
                onClick={() => setActiveTab('test')}
                aria-label="Test Mode"
                className={`px-4 py-2 font-black text-sm border-3 border-black transition-all
                  ${activeTab === 'test'
                    ? 'bg-[#3498db] text-white shadow-[3px_3px_0px_#000]'
                    : 'bg-white dark:bg-gray-700 text-[#666] dark:text-gray-300 shadow-[2px_2px_0px_#000]'}
                  active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]`}
              >
                🎯 TEST
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {activeTab === 'practice' && (
              <Stats wpm={wpm} accuracy={accuracy} errors={errors.length} />
            )}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="px-3 py-2 bg-white dark:bg-gray-700 text-[#666] dark:text-gray-300 font-black text-sm border-3 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-h-0">
          <Suspense fallback={<div>Loading...</div>}>
            {activeTab === 'practice' ? (
              <PracticeMode
                selectedLetters={selectedLetters}
                setSelectedLetters={setSelectedLetters}
                resetPractice={resetPractice}
                activeKey={activeKey}
                practiceText={practiceText}
                userInput={userInput}
                currentIndex={currentIndex}
                errors={errors}
                handleInput={handleInput}
                handleKeyDown={handleKeyDown}
                handleKeyUp={handleKeyUp}
              />
            ) : (
              <TypingTest />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default App

