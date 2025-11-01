import React, { useRef, useEffect } from 'react'
import { animate as anime } from 'animejs'

const TypingArea = ({ practiceText, userInput, currentIndex, errors, onInput, onKeyDown, onKeyUp }) => {
  const inputRef = useRef(null)
  const textContainerRef = useRef(null)
  const prevIndex = useRef(0)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    // Animate character typing
    if (currentIndex > prevIndex.current && textContainerRef.current) {
      try {
        const currentChar = textContainerRef.current.querySelector(`span:nth-child(${currentIndex + 1})`)
        if (currentChar) {
          anime({
            targets: currentChar,
            scale: [1.3, 1],
            duration: 200,
            easing: 'easeOutElastic(1, .8)'
          })
        }
        prevIndex.current = currentIndex
      } catch (error) {
        console.error('Typing animation error:', error)
      }
    }
  }, [currentIndex])

  const renderText = () => {
    return practiceText.split('').map((char, index) => {
      let className = 'text-[#999]'
      
      if (index < currentIndex) {
        className = errors.includes(index) ? 'char-incorrect font-bold' : 'char-correct font-bold'
      } else if (index === currentIndex) {
        className = 'char-current font-bold px-1'
      }

      return <span key={index} className={className}>{char}</span>
    })
  }

  return (
    <div className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] p-4 h-full flex flex-col">
      <h2 className="text-lg font-black text-[#1a1a1a] mb-3">TYPE HERE</h2>
      
      <div 
        ref={textContainerRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 bg-[#fafafa] border-2 border-[#ddd] p-4 cursor-text overflow-auto mb-3"
      >
        <p className="text-2xl leading-relaxed font-mono select-none">
          {renderText()}
        </p>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={onInput}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        className="opacity-0 absolute pointer-events-none"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      <p className="text-xs text-[#666] font-bold text-center mt-2">
        Click to focus • Start typing
      </p>
    </div>
  )
}

export default TypingArea

