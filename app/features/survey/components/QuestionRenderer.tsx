import { DropdownQuestion } from "./fields/DropdownQuestion"
import { CheckboxQuestion } from "./fields/CheckboxQuestion"
import { YesNoQuestion } from "./fields/YesNoQuestion"
import { NumericQuestion } from "./fields/NumericQuestion"
import { TextQuestion } from "./fields/TextQuestion"
import type { Question } from "../types"

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
          options={Array.isArray(question.options) ? question.options : []}
          value={answer}
          onChange={onAnswerChange}
        />
      )
    case "checkbox":
      return (
        <CheckboxQuestion
          options={Array.isArray(question.options) ? question.options : []}
          value={Array.isArray(answer) ? answer : []}
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
