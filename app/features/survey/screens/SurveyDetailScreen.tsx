// app/screens/survey/SurveyDetailScreen.tsx

import { useEffect, useState } from "react"
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import type { RouteProp } from "@react-navigation/native"
import { getAccessToken } from "@/features/auth/sessionStorage"
import Config from "@/config"
import { SurveyScreenRenderer } from "@/features/survey/components/SurveyScreenRenderer"
import { useAppTheme } from "@/utils/useAppTheme"
import type { Survey } from "@/types/survey"
import type { AppStackParamList } from "@/types/navigation"
import type { SurveyAnswerMap } from "../../../types/question"

export function SurveyDetailScreen() {
  const {
    theme: { colors },
  } = useAppTheme()

  const navigation = useNavigation()
  const route = useRoute<RouteProp<AppStackParamList, "SurveyDetail">>()
  const { surveyId } = route.params

  const [survey, setSurvey] = useState<Survey | null>(null)
  const [answers, setAnswers] = useState<SurveyAnswerMap>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        const token = await getAccessToken()
        const res = await fetch(`${Config.apiBaseUrl}/surveys/${surveyId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        const json = await res.json()
        setSurvey(json)
        const initAnswers: SurveyAnswerMap = {}
        json.questions.forEach((q) => {
          initAnswers[q.id] = null
        })
        setAnswers(initAnswers)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadSurvey()
  }, [surveyId])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error || !survey) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: colors.error }}>{error?.message ?? "Failed to load survey"}</Text>
      </View>
    )
  }

  const total = survey.questions.length
  const currentQuestion = survey.questions[currentIndex]
  const isValid = true // TODO: validation logic
  const isLast = currentIndex === total - 1

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SurveyScreenRenderer
        questions={[currentQuestion]}
        answers={answers}
        currentIndex={currentIndex}
        total={total}
        updateAnswer={(id, value) => {
          setAnswers((prev) => ({ ...prev, [id]: value }))
        }}
        isLast={isLast}
        isValid={isValid}
        onBack={() => {
          if (currentIndex > 0) setCurrentIndex((i) => i - 1)
        }}
        onNext={() => {
          if (!isLast) {
            setCurrentIndex((i) => i + 1)
          } else {
            setCurrentIndex(0)
            navigation.reset({
              index: 1,
              routes: [{ name: "ParticipantDashboard" }, { name: "SurveyList" }],
            })
          }
        }}
        onClose={() => {
          setCurrentIndex(0)
          navigation.reset({
            index: 1,
            routes: [{ name: "ParticipantDashboard" }, { name: "SurveyList" }],
          })
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
})
