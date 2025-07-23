export type Question = {
  question_id: number
  text: string
  type: "text" | "boolean" | "dropdown" | "multi_select" | "single_select"
  options?: string[]
}
