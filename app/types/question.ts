// Basic question types
export type QuestionType =
  | "text"
  | "dropdown"
  | "multiple_choice"
  | "rating"
  | "checkbox"
  | "date"
  | "numeric"
  | "likert"
  | "yes_no"

// Options schema for each question type
export type QuestionOptions =
  | string[] // for dropdown, multiple_choice, checkbox
  | {
      step: number
      max_value?: number
      min_value?: number
      labels?: string[]
      scale?: {
        step: number
        max_value: number
        min_value: number
        labels?: string[]
      }
    }
  | Record<string, any> // fallback for edge cases

// Canonical Question interface
export interface Question {
  id: number
  text: string
  type: QuestionType
  options: QuestionOptions
  rank: number
  is_hidden: boolean
  status: string
  survey: {
    id: number
    name: string
    short_description?: string
  }
}

export type SurveyAnswerMap = {
  [question_id: number]: string | string[] | number | boolean | null
}
