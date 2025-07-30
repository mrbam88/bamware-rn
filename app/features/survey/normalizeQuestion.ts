import type { Question, QuestionType, QuestionOptions } from "@/types/question"

const VALID_TYPES: QuestionType[] = [
  "text",
  "dropdown",
  "multiple_choice",
  "rating",
  "checkbox",
  "date",
  "numeric",
  "likert",
  "yes_no",
]

export function normalizeQuestion(raw: any): Question | null {
  if (!raw || typeof raw !== "object") return null
  if (typeof raw.id !== "number") return null
  if (typeof raw.text !== "string") return null

  const type = VALID_TYPES.includes(raw.type) ? raw.type : "text"

  let options: QuestionOptions = []
  if (Array.isArray(raw.options)) {
    options = raw.options
  } else if (raw.options && typeof raw.options === "object") {
    options = raw.options
  }

  const survey = {
    id: raw.survey?.id ?? -1,
    name: raw.survey?.name ?? "Untitled Survey",
    short_description: raw.survey?.short_description ?? "",
  }

  return {
    id: raw.id,
    text: raw.text,
    type,
    options,
    rank: raw.rank ?? 0,
    is_hidden: !!raw.is_hidden,
    status: raw.status ?? "active",
    survey,
  }
}
