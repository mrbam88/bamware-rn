import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native"
import { useSurveys } from "../features/survey/hooks/useSurveys"

export const StudyScreen = () => {
  const { data, isLoading, error } = useSurveys()

  if (isLoading) {
    return <ActivityIndicator style={styles.centered} />
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
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
          <Text style={styles.title}>{item.name}</Text>
          {item.short_description && <Text>{item.short_description}</Text>}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
})
