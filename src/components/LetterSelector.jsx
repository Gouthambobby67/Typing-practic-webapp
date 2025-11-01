import React, { useEffect, useRef } from 'react'
import { animate as anime } from 'animejs'

const LetterSelector = ({ selectedLetters, setSelectedLetters, onReset }) => {
  const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const homeRowLetters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
  const topRowLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
  const bottomRowLetters = ['z', 'x', 'c', 'v', 'b', 'n', 'm']

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
            duration: 300,
            easing: 'easeOutElastic(1, .8)'
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
        className={`
          w-10 h-10 font-black text-lg uppercase border-3 border-black transition-all
          ${isSelected ? 'bg-[#3498db] text-white shadow-[3px_3px_0px_#000]' : 'bg-white text-[#999] shadow-[2px_2px_0px_#000]'}
          active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]
        `}
      >
        {letter}
      </button>
    )
  }

  return (
    <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-4 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black">SELECT LETTERS</h2>
        <div className="flex gap-2">
          <button onClick={() => setSelectedLetters(['a','s','d','f'])} className="px-3 py-1 bg-[#95a5a6] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            RESET
          </button>
          <button onClick={() => setSelectedLetters(homeRowLetters)} className="px-3 py-1 bg-[#f39c12] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            HOME
          </button>
          <button onClick={() => setSelectedLetters(allLetters)} className="px-3 py-1 bg-[#9b59b6] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            ALL
          </button>
          <button onClick={onReset} className="px-3 py-1 bg-[#e74c3c] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000]">
            🔄
          </button>
        </div>
      </div>

      <div className="space-y-2">
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

      <div className="mt-3 p-2 bg-[#ecf0f1] border-2 border-[#bdc3c7] text-center">
        <span className="text-xs font-bold text-[#555]">
          <span className="text-[#3498db]">{selectedLetters.length}</span> selected: {selectedLetters.sort().join(' ')}
        </span>
      </div>
    </div>
  )
}

export default LetterSelector

