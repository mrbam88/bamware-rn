import React from "react"
import type { Question } from "../types"
import { TextQuestion } from "./fields/TextQuestion"
import { DropdownQuestion } from "./fields/DropdownQuestion"
import { CheckboxQuestion } from "./fields/CheckboxQuestion"
import { YesNoQuestion } from "./fields/YesNoQuestion"
import { NumericQuestion } from "./fields/NumericQuestion"

type Props = {
  question: Question
  answer: any
  onAnswerChange: (value: any) => void
}

export const QuestionRenderer = ({ question, answer, onAnswerChange }: Props) => {
  switch (question.type) {
    case "text":
      return <TextQuestion value={answer} onChange={onAnswerChange} />
    case "dropdown":
      return (
        <DropdownQuestion
          options={question.options || []}
          value={answer}
          onChange={onAnswerChange}
        />
      )
    case "checkbox":
      return (
        <CheckboxQuestion
          options={question.options || []}
          value={answer || []}
          onChange={onAnswerChange}
        />
      )
    case "yes_no":
      return <YesNoQuestion value={answer} onChange={onAnswerChange} />
    case "numeric":
      return <NumericQuestion value={answer} onChange={onAnswerChange} />
    default:
      return <TextQuestion value={answer} onChange={onAnswerChange} />
  }
}
