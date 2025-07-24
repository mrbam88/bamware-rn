import { Text, View, Button, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

export const ParticipantDashboardScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Daily Wellness Survey</Text>
      <Button title="Start Survey" onPress={() => navigation.navigate("Survey")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
  },
})
