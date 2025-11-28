import { memo } from 'react'

const TestTypingArea = memo(({
  testText,
  userInput,
  currentIndex,
  errors,
  inputRef,
  handleInput,
  handleKeyDown,
  handleKeyUp,
  isFinished
}) => {

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

  return (
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
    </div>
  )
})

export default TestTypingArea
