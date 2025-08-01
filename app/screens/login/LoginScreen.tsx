import React, { useState } from "react"
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Image,
} from "react-native"
import { loginApi } from "@/features/auth/loginApi"
import { resetRoot } from "@/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { setSession } from "@/store/slices/sessionSlice"
import { saveSessionToStorage } from "@/features/auth/sessionStorage"
import { useAppTheme } from "@/utils/useAppTheme"

export const LoginScreen = () => {
  const [email, setEmail] = useState("bilal.malik@vpgcentral.com")
  const [password, setPassword] = useState("Br00klyn@88")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const { theme, themed } = useAppTheme()
  const colors = theme.colors

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const session = await loginApi({ email, password })
      await saveSessionToStorage(session)
      dispatch(setSession(session))
      //resetRoot()
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message ?? "Login failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={themed($screen)}>
      <Image
        source={require("../../../assets/images/vpg-logo-full.png")}
        resizeMode="contain"
        style={themed($logo)}
      />

      <View style={themed($card)}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.textDim}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={themed($input)}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.textDim}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={themed($input)}
        />

        {error && <Text style={themed($error)}>{error}</Text>}

        <Pressable
          onPress={handleLogin}
          disabled={loading}
          style={({ pressed }) =>
            themed([$button, { backgroundColor: pressed ? colors.tintInactive : colors.tint }])
          }
        >
          <Text style={themed($buttonText)}>{loading ? "Logging in..." : "Login"}</Text>
        </Pressable>

        {loading && <ActivityIndicator style={themed($spinner)} />}
      </View>
    </View>
  )
}

const $screen = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
  backgroundColor: (theme: any) => theme.colors.background,
}

const $logo = {
  width: 220,
  height: 80,
  marginBottom: 32,
}

const $card = {
  width: "100%",
  borderRadius: 16,
  padding: 24,
  backgroundColor: (theme: any) => theme.colors.cardBackground,
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
}

const $heading = {
  fontSize: 26,
  fontWeight: "700",
  color: (theme: any) => theme.colors.text,
  marginBottom: 24,
  textAlign: "center",
}

const $input = {
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingVertical: 10,
  fontSize: 16,
  marginBottom: 16,
  borderColor: (theme: any) => theme.colors.border,
  color: (theme: any) => theme.colors.text,
  backgroundColor: (theme: any) => theme.colors.cardBackground,
}

const $button = {
  borderRadius: 8,
  paddingVertical: 12,
  alignItems: "center",
  marginTop: 12,
}

const $buttonText = {
  color: (theme: any) => theme.colors.buttonText,
  fontWeight: "600",
  fontSize: 16,
}

const $error = {
  color: (theme: any) => theme.colors.error,
  marginBottom: 12,
  textAlign: "center",
}

const $spinner = {
  marginTop: 16,
}
