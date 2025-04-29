import { View, StyleSheet, Alert } from "react-native"
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { Icon } from "@/components"
import { CommonActions } from "@react-navigation/native"
import { navigationRef } from "@/navigators"

export const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        onPress: () => {
          if (navigationRef.isReady()) {
            navigationRef.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              }),
            )
          }
        },
      },
    ])
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <DrawerItemList {...props} />
      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Log Out"
          icon={({ color, size }) => <Icon icon="log-out" size={size} color={color} />}
          onPress={handleLogout}
        />
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoutContainer: { marginTop: "auto" },
})
