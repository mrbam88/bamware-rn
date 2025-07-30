import { Text, FlatList, TouchableOpacity } from "react-native"
import { useSurveys } from "../api/fetchSurveyScreens"
import { useNavigation } from "@react-navigation/native"

export function SurveyListScreen() {
  const { data, isLoading } = useSurveys()
  const navigation = useNavigation()

  if (!isLoading) return <Text>Loading...</Text>

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ padding: 20, borderBottomWidth: 1 }}
          onPress={() =>
            navigation.navigate("Survey", {
              surveyId: item.id,
              title: item.name,
              questions: item.questions,
            })
          }
        >
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
          {item.short_description && <Text>{item.short_description}</Text>}
        </TouchableOpacity>
      )}
    />
  )
}
