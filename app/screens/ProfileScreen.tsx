import { View, Text, StyleSheet, Button, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { clearSession } from "@/store/slices/sessionSlice"
import { resetRoot } from "@/navigators/navigationUtilities"
import { clearSessionFromStorage } from "@/features/auth/sessionStorage"
import { useAppTheme } from "@/utils/useAppTheme"

export const ProfileScreen = () => {
  const dispatch = useDispatch()
  const { theme } = useAppTheme()

  const user = useSelector((state: RootState) => state.session.user)

  const handleLogout = async () => {
    await clearSessionFromStorage()
    dispatch(clearSession())
    resetRoot({ index: 0, routes: [{ name: "Login" }] })
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Profile</Text>

      {user ? (
        <View style={styles.infoBox}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Email:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{user.email}</Text>

          <Text style={[styles.label, { color: theme.colors.text }]}>Role:</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{user.role}</Text>
        </View>
      ) : (
        <Text style={[styles.value, { color: theme.colors.textDim }]}>No user info</Text>
      )}

      <Button title="Logout" onPress={handleLogout} color={theme.colors.tint} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  heading: { fontSize: 28, fontWeight: "600", marginBottom: 24 },
  infoBox: { marginBottom: 32 },
  label: { fontWeight: "bold", fontSize: 16 },
  value: { fontSize: 16, marginBottom: 12 },
})
