import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native"
import { useQuestions } from "@/features/survey/hooks/useQuestions"

export function DebugQuestionScreen() {
  const { data, isLoading, error } = useQuestions()

  if (isLoading) {
    console.log("📡 Loading questions...")
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading questions...</Text>
      </View>
    )
  }

  if (error) {
    console.error("❌ Error rendering questions:", error.message)
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    )
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No questions available.</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.text || "Untitled question"}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  container: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontWeight: "bold", fontSize: 16 },
})
