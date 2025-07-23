import { useState } from "react"

export function useSurveyFlow(questions: any[]) {
  const [step, setStep] = useState<number>(-1)

  const total = questions.length

  const start = () => setStep(0)
  const next = () => setStep((s) => Math.min(s + 1, total))
  const back = () => setStep((s) => Math.max(s - 1, 0))
  const skip = () => next()
  const reset = () => setStep(-1)

  const isFirst = step === 0
  const isLast = step === total - 1
  const isComplete = step === total

  return {
    step,
    screen: questions[step],
    isFirst,
    isLast,
    isComplete,
    start,
    next,
    back,
    skip,
    reset,
  }
}
