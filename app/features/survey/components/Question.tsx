// import { Question as QuestionType } from "../types"
// import { TextQuestion } from "./questions/TextQuestion"
// import { BooleanQuestion } from "./questions/BooleanQuestion"
// import { DropdownQuestion } from "./questions/DropdownQuestion"
// import { MultiSelectQuestion } from "./questions/MultiSelectQuestion"
// import { SingleSelectQuestion } from "./questions/SingleSelectQuestion"

// type QuestionProps = {
//   question: QuestionType
//   value: any
//   onChange: (value: any) => void
// }

// export const Question = ({ question, value, onChange }: QuestionProps) => {
//   switch (question.type) {
//     case "text":
//       return <TextQuestion question={question} value={value} onChange={onChange} />
//     case "boolean":
//       return <BooleanQuestion question={question} value={value} onChange={onChange} />
//     case "dropdown":
//       return <DropdownQuestion question={question} value={value} onChange={onChange} />
//     case "multi_select":
//       return <MultiSelectQuestion question={question} value={value} onChange={onChange} />
//     case "single_select":
//       return <SingleSelectQuestion question={question} value={value} onChange={onChange} />
//     default:
//       return null
//   }
// }
