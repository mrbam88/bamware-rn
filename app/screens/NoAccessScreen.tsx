import { FC } from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "@/components"

interface NoAccessScreenProps {}

export const NoAccessScreen: FC<NoAccessScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>No Access Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
