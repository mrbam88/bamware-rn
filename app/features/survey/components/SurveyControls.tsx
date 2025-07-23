import { View, Button, StyleSheet } from "react-native"

type SurveyControlsProps = {
  canGoBack: boolean
  canSkip?: boolean
  isLast: boolean
  onBack: () => void
  onSkip?: () => void
  onNext: () => void
  onFinish: () => void
  isValid?: boolean
}

export function SurveyControls({
  canGoBack,
  canSkip = false,
  isLast,
  onBack,
  onSkip,
  onNext,
  onFinish,
  isValid = true,
}: SurveyControlsProps) {
  return (
    <View style={styles.controlsContainer}>
      {canGoBack && <Button title="Back" onPress={onBack} />}
      {canSkip && !isLast && onSkip && <Button title="Skip" onPress={onSkip} />}
      {!isLast ? (
        <Button title="Next" onPress={onNext} disabled={!isValid} />
      ) : (
        <Button title="Finish" onPress={onFinish} disabled={!isValid} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
})
