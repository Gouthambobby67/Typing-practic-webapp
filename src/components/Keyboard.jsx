import React, { useEffect, useRef } from 'react'
import { animate as anime } from 'animejs'

const Keyboard = ({ activeKey, selectedLetters }) => {
  const prevActiveKey = useRef('')
  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ]

  useEffect(() => {
    // Animate key press
    if (activeKey && activeKey !== prevActiveKey.current) {
      try {
        const keyElement = document.querySelector(`[data-key="${activeKey}"]`)
        if (keyElement) {
          anime({
            targets: keyElement,
            scale: [1, 0.9, 1],
            duration: 200,
            easing: 'easeOutElastic(1, .8)'
          })
        }
        prevActiveKey.current = activeKey
      } catch (error) {
        console.error('Keyboard animation error:', error)
      }
    }
  }, [activeKey])

  const renderKey = (key) => {
    const isActive = activeKey === key
    const isSelected = selectedLetters.includes(key)
    
    let bgColor = 'bg-white dark:bg-gray-800'
    let textColor = 'text-[#ccc] dark:text-gray-500'
    
    if (isActive) {
      bgColor = 'bg-[#f39c12]'
      textColor = 'text-white'
    } else if (isSelected) {
      bgColor = 'bg-[#ecf0f1] dark:bg-gray-600'
      textColor = 'text-[#1a1a1a] dark:text-white'
    }

    return (
      <div
        key={key}
        data-key={key}
        className={`
          w-10 h-10 flex items-center justify-center font-black text-base uppercase
          ${bgColor} ${textColor} border-2 border-black
          ${isActive ? 'shadow-[1px_1px_0px_#000] translate-x-[1px] translate-y-[1px]' : 'shadow-[2px_2px_0px_#000]'}
          transition-all duration-75
        `}
      >
        {key}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-[#2c3e50] border-3 border-black shadow-[4px_4px_0px_#000] p-4 h-full flex flex-col justify-center">
      <h2 className="text-lg font-black text-[#1a1a1a] dark:text-white mb-3">KEYBOARD</h2>
      
      <div className="space-y-2">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center" style={{ paddingLeft: `${rowIndex * 16}px` }}>
            {row.map(renderKey)}
          </div>
        ))}
        
        <div className="flex justify-center mt-3">
          <div className={`w-64 h-10 flex items-center justify-center font-black text-xs
            ${activeKey === ' ' ? 'bg-[#f39c12] text-white shadow-[1px_1px_0px_#000] translate-x-[1px] translate-y-[1px]' : 'bg-white dark:bg-gray-600 text-[#999] dark:text-gray-300 shadow-[2px_2px_0px_#000]'}
            border-2 border-black transition-all duration-75`}>
            SPACE
          </div>
        </div>
      </div>
    </div>
  )
}

export default Keyboard

