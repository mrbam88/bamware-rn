// ParticipantNavigator.tsx
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AssessmentScreen } from "../features/assessment/screen/AssessmentScreen"

const Stack = createNativeStackNavigator()

export const ParticipantNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Assessment" component={AssessmentScreen} />
  </Stack.Navigator>
)
