import React from "react"
import { observer } from "mobx-react-lite"
import { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "@/components"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const passwordInputRef = useRef<TextInput>(null)

  const [password, setPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  useEffect(() => {
    // Prefill with default credentials for Bamware app
    setAuthEmail("user@bamware.com")
    setPassword("bamwareSecret123")

    // Cleanup on unmount
    return () => {
      setPassword("")
      setAuthEmail("")
    }
  }, [setAuthEmail])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Simulate token generation for Bamware app
    setIsSubmitted(false)
    setPassword("")
    setAuthEmail("")
    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )
      },
    [isPasswordHidden, colors.palette.neutral800],
  )

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text
        testID="bamware-login-heading"
        tx="bamwareLogin:signIn"
        preset="heading"
        style={themed($heading)}
      />
      <Text tx="bamwareLogin:enterCredentials" preset="subheading" style={themed($subheading)} />
      {attemptsCount > 2 && (
        <Text tx="bamwareLogin:hintMessage" size="sm" weight="light" style={themed($hint)} />
      )}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="bamwareLogin:emailLabel"
        placeholderTx="bamwareLogin:emailPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />

      <TextField
        ref={passwordInputRef}
        value={password}
        onChangeText={setPassword}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        labelTx="bamwareLogin:passwordLabel"
        placeholderTx="bamwareLogin:passwordPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="bamware-login-button"
        tx="bamwareLogin:tapToSignIn"
        style={themed($loginButton)}
        preset="reversed"
        onPress={login}
      />
    </Screen>
  )
})

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $subheading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.md,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $loginButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

export default LoginScreen
