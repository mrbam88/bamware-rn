import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ResearchDashboardScreen } from "../screens/ResearchDashboardScreen"

const Stack = createNativeStackNavigator()

export const ResearcherNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="ResearchDashboard" component={ResearchDashboardScreen} />
  </Stack.Navigator>
)
