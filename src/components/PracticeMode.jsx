import React from 'react'
import LetterSelector from './LetterSelector'
import TypingArea from './TypingArea'
import Keyboard from './Keyboard'

const PracticeMode = ({
  selectedLetters,
  setSelectedLetters,
  resetPractice,
  activeKey,
  practiceText,
  userInput,
  currentIndex,
  errors,
  handleInput,
  handleKeyDown,
  handleKeyUp,
}) => {
  return (
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
  )
}

export default PracticeMode
