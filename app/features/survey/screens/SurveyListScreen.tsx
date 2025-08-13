// app/features/survey/screens/SurveyListScreen.tsx

import { Text, FlatList, TouchableOpacity, StyleSheet, View, ActivityIndicator } from "react-native"
import { useSurveys } from "../hooks/useSurveys"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { ParticipantStackParamList } from "@/types/navigation"

export function SurveyListScreen() {
  const { data, isLoading } = useSurveys()
  const navigation = useNavigation<NativeStackNavigationProp<ParticipantStackParamList>>()

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!Array.isArray(data)) {
    return (
      <View style={styles.centered}>
        <Text>Survey list not available.</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            console.log("Selected survey ID:", item.id)
            navigation.navigate("ParticipantLoginScreen", {
              surveyId: item.id,
              title: item.name,
              questions: item.questions,
            })
          }}
        >
          <Text style={styles.name}>{item.name}</Text>
          {!!item.short_description && (
            <Text style={styles.description}>{item.short_description}</Text>
          )}
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    marginTop: 4,
    color: "#666",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
})
