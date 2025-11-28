import { memo } from 'react'
import { animate as anime } from 'animejs'
import { ALL_LETTERS, KEYBOARD_LAYOUT, KEY_ANIMATION } from '../constants'

const LetterSelector = memo(({ selectedLetters, setSelectedLetters, onReset }) => {
  const numberRowLetters = KEYBOARD_LAYOUT[0]
  const topRowLetters = KEYBOARD_LAYOUT[1]
  const homeRowLetters = KEYBOARD_LAYOUT[2]
  const bottomRowLetters = KEYBOARD_LAYOUT[3]

  const toggleLetter = (letter) => {
    if (selectedLetters.includes(letter)) {
      if (selectedLetters.length > 1) {
        setSelectedLetters(selectedLetters.filter(l => l !== letter))
      }
    } else {
      setSelectedLetters([...selectedLetters, letter])
    }
  }

  const renderLetterButton = (letter) => {
    const isSelected = selectedLetters.includes(letter)
    
    const handleClick = () => {
      toggleLetter(letter)
      // Animation on click
      try {
        const element = document.querySelector(`[data-letter="${letter}"]`)
        if (element) {
          anime({
            targets: element,
            scale: [1, 1.2, 1],
            ...KEY_ANIMATION,
          })
        }
      } catch (error) {
        console.error('Animation error:', error)
      }
    }
    
    return (
      <button
        key={letter}
        data-letter={letter}
        onClick={handleClick}
        aria-label={`Select letter ${letter}`}
        aria-pressed={isSelected}
        className={`
          w-10 h-10 font-black text-lg uppercase border-3 border-black transition-all
          ${isSelected ? 'bg-[#3498db] text-white shadow-[3px_3px_0px_#000]' : 'bg-white dark:bg-gray-700 text-[#999] dark:text-gray-400 shadow-[2px_2px_0px_#000]'}
          active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]
        `}
      >
        {letter}
      </button>
    )
  }

  return (
    <div className="bg-white dark:bg-[#2c3e50] border-3 border-black shadow-[4px_4px_0px_#000] p-4 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black dark:text-white">SELECT LETTERS</h2>
        <div className="flex gap-2">
          <button onClick={() => setSelectedLetters(['a','s','d','f'])} aria-label="Reset to default letters" className="px-3 py-1 bg-[#95a5a6] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            RESET
          </button>
          <button onClick={() => setSelectedLetters(numberRowLetters)} aria-label="Select number row" className="px-3 py-1 bg-[#f39c12] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            NUM
          </button>
          <button onClick={() => setSelectedLetters(topRowLetters)} aria-label="Select top row" className="px-3 py-1 bg-[#f39c12] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            TOP
          </button>
          <button onClick={() => setSelectedLetters(homeRowLetters)} aria-label="Select home row" className="px-3 py-1 bg-[#f39c12] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            HOME
          </button>
          <button onClick={() => setSelectedLetters(bottomRowLetters)} aria-label="Select bottom row" className="px-3 py-1 bg-[#f39c12] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            BOTTOM
          </button>
          <button onClick={() => setSelectedLetters(ALL_LETTERS)} aria-label="Select all letters" className="px-3 py-1 bg-[#9b59b6] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            ALL
          </button>
          <button onClick={onReset} aria-label="Reset practice" className="px-3 py-1 bg-[#e74c3c] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            🔄
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 justify-center">
          {numberRowLetters.map(renderLetterButton)}
        </div>
        <div className="flex gap-2 justify-center">
          {topRowLetters.map(renderLetterButton)}
        </div>
        <div className="flex gap-2 justify-center pl-4">
          {homeRowLetters.map(renderLetterButton)}
        </div>
        <div className="flex gap-2 justify-center pl-10">
          {bottomRowLetters.map(renderLetterButton)}
        </div>
      </div>

      <div className="mt-3 p-2 bg-[#ecf0f1] dark:bg-[#34495e] border-2 border-[#bdc3c7] dark:border-gray-600 text-center">
        <span className="text-xs font-bold text-[#555] dark:text-gray-300">
          <span className="text-[#3498db]">{selectedLetters.length}</span> selected: {selectedLetters.sort().join(' ')}
        </span>
      </div>
    </div>
  )
})

export default LetterSelector

