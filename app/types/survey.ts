import type { Question } from "./question"

export interface Survey {
  id: number
  name: string
  short_description: string
  long_description?: string
  status: string
  questions: Question[]
}
