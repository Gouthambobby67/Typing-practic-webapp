import { memo } from 'react'

const TestResults = memo(({ wpm, accuracy }) => {
  return (
    <div className="test-complete p-4 bg-[#2ecc71] border-2 border-black text-white text-center">
      <p className="text-xl font-black mb-2">🎉 TEST COMPLETE!</p>
      <p className="text-sm font-bold">WPM: {wpm} | Accuracy: {accuracy}%</p>
    </div>
  )
})

export default TestResults
