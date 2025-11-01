import React, { useEffect, useRef } from 'react'
import { animate as anime } from 'animejs'

const Stats = ({ wpm, accuracy, errors }) => {
  const wpmRef = useRef(null)
  const accuracyRef = useRef(null)
  const errorsRef = useRef(null)

  useEffect(() => {
    // Animate WPM
    if (wpmRef.current && wpm > 0) {
      try {
        const current = parseInt(wpmRef.current.innerHTML) || 0
        if (current !== wpm) {
          anime({
            targets: wpmRef.current,
            innerHTML: [current, wpm],
            round: 1,
            duration: 800,
            easing: 'easeOutExpo'
          })
        }
      } catch (error) {
        // Fallback: just set the value directly
        if (wpmRef.current) {
          wpmRef.current.innerHTML = wpm
        }
      }
    }
  }, [wpm])

  useEffect(() => {
    // Animate Accuracy
    if (accuracyRef.current) {
      try {
        const currentText = accuracyRef.current.innerHTML
        const current = parseInt(currentText.replace('%', '')) || 100
        if (current !== accuracy) {
          anime({
            targets: accuracyRef.current,
            innerHTML: [current, accuracy],
            round: 1,
            duration: 800,
            easing: 'easeOutExpo',
            update: function(anim) {
              const val = Math.round(anim.animatables[0].target.innerHTML)
              if (accuracyRef.current) {
                accuracyRef.current.innerHTML = val + '%'
              }
            }
          })
        }
      } catch (error) {
        // Fallback: just set the value directly
        if (accuracyRef.current) {
          accuracyRef.current.innerHTML = accuracy + '%'
        }
      }
    }
  }, [accuracy])

  useEffect(() => {
    // Animate Errors with bounce
    if (errorsRef.current) {
      try {
        const current = parseInt(errorsRef.current.innerHTML) || 0
        if (current !== errors) {
          anime({
            targets: errorsRef.current,
            innerHTML: [current, errors],
            round: 1,
            duration: 600,
            easing: 'easeOutBounce'
          })
          // Bounce effect on change
          if (errorsRef.current.parentElement) {
            anime({
              targets: errorsRef.current.parentElement,
              scale: [1, 1.1, 1],
              duration: 400,
              easing: 'easeOutElastic(1, .8)'
            })
          }
        }
      } catch (error) {
        // Fallback: just set the value directly
        if (errorsRef.current) {
          errorsRef.current.innerHTML = errors
        }
      }
    }
  }, [errors])

  return (
    <div className="flex gap-3">
      <div className="bg-[#3498db] border-3 border-black shadow-[3px_3px_0px_#000] px-4 py-2 text-white">
        <div className="text-xs font-black">WPM</div>
        <div ref={wpmRef} className="text-3xl font-black leading-none">0</div>
      </div>
      <div className="bg-[#2ecc71] border-3 border-black shadow-[3px_3px_0px_#000] px-4 py-2 text-white">
        <div className="text-xs font-black">ACCURACY</div>
        <div ref={accuracyRef} className="text-3xl font-black leading-none">100%</div>
      </div>
      <div className="bg-[#e74c3c] border-3 border-black shadow-[3px_3px_0px_#000] px-4 py-2 text-white">
        <div className="text-xs font-black">ERRORS</div>
        <div ref={errorsRef} className="text-3xl font-black leading-none">0</div>
      </div>
    </div>
  )
}

export default Stats

