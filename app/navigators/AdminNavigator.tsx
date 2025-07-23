// AdminNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AdminDashboardScreen } from "../screens/AdminDashboardScreen"

const Stack = createNativeStackNavigator()

export const AdminNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
  </Stack.Navigator>
)
