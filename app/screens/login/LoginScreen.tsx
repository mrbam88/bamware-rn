import React, { useState } from "react"
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from "react-native"
import { loginApi } from "@/features/auth/loginApi"
import { resetRoot } from "@/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { setSession } from "@/store/slices/sessionSlice"
import { saveSessionToStorage } from "@/features/auth/sessionStorage"

export const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const session = await loginApi({ email, password })
      await saveSessionToStorage(session)
      dispatch(setSession(session))

      resetRoot({
        index: 0,
        routes: [{ name: "MainApp" }],
      })
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message ?? "Login failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading} testID="login-heading">
        Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
        testID="login-submit-button"
      />
      {loading && <ActivityIndicator style={styles.spinner} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  error: { color: "red", marginBottom: 12 },
  heading: { fontSize: 24, marginBottom: 24, textAlign: "center" },
  input: {
    borderColor: "#ccc",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  spinner: { marginTop: 16 },
})
