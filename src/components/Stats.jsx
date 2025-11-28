import { memo, useEffect, useRef } from 'react'
import { animate as anime } from 'animejs'
import { STATS_ANIMATION, ERROR_ANIMATION } from '../constants'

const Stats = memo(({ wpm, accuracy, errors }) => {
  const wpmRef = useRef(null)
  const accuracyRef = useRef(null)
  const errorsRef = useRef(null)

  useEffect(() => {
    const wpmEl = wpmRef.current
    const accuracyEl = accuracyRef.current
    const errorsEl = errorsRef.current

    if (wpmEl) {
      const currentWpm = parseInt(wpmEl.innerHTML) || 0
      if (currentWpm !== wpm) {
        anime({
          targets: wpmEl,
          innerHTML: [currentWpm, wpm],
          ...STATS_ANIMATION,
        })
      }
    }

    if (accuracyEl) {
      const currentAccuracy = parseInt(accuracyEl.innerHTML.replace('%', '')) || 0
      if (currentAccuracy !== accuracy) {
        anime({
          targets: accuracyEl,
          innerHTML: [currentAccuracy, accuracy],
          ...STATS_ANIMATION,
          update: (anim) => {
            const val = Math.round(anim.animatables[0].target.innerHTML)
            if (accuracyEl) {
              accuracyEl.innerHTML = val + '%'
            }
          }
        })
      }
    }

    if (errorsEl) {
      const currentErrors = parseInt(errorsEl.innerHTML) || 0
      if (currentErrors !== errors) {
        anime({
          targets: errorsEl,
          innerHTML: [currentErrors, errors],
          ...ERROR_ANIMATION,
        })
        if (errorsEl.parentElement) {
          anime({
            targets: errorsEl.parentElement,
            scale: [1, 1.1, 1],
            duration: 400,
            easing: 'easeOutElastic(1, .8)'
          })
        }
      }
    }
  }, [wpm, accuracy, errors])

  return (
    <div className="flex gap-3">
      <div className="bg-[#3498db] border-3 border-black shadow-[3px_3px_0px_#000] px-4 py-2 text-white">
        <div className="text-xs font-black">WPM</div>
        <div ref={wpmRef} data-testid="wpm" className="text-3xl font-black leading-none">{wpm}</div>
      </div>
      <div className="bg-[#2ecc71] border-3 border-black shadow-[3px_3px_0px_#000] px-4 py-2 text-white">
        <div className="text-xs font-black">ACCURACY</div>
        <div ref={accuracyRef} data-testid="accuracy" className="text-3xl font-black leading-none">{accuracy}%</div>
      </div>
      <div className="bg-[#e74c3c] border-3 border-black shadow-[3px_3px_0px_#000] px-4 py-2 text-white">
        <div className="text-xs font-black">ERRORS</div>
        <div ref={errorsRef} data-testid="errors" className="text-3xl font-black leading-none">{errors}</div>
      </div>
    </div>
  )
})

export default Stats

