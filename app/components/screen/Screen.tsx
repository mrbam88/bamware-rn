import React, { forwardRef, ReactNode, useRef, useState, useImperativeHandle } from "react"
import { useScrollToTop } from "@react-navigation/native"
import { StatusBar, StatusBarProps, StatusBarStyle } from "expo-status-bar"
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native"
import { $styles } from "../../theme"
import { ExtendedEdge, useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { useAppTheme } from "@/utils/useAppTheme"

export const DEFAULT_BOTTOM_OFFSET = 50

export interface BaseScreenProps {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  safeAreaEdges?: ExtendedEdge[]
  backgroundColor?: string
  statusBarStyle?: StatusBarStyle
  keyboardOffset?: number
  keyboardBottomOffset?: number
  StatusBarProps?: StatusBarProps
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps
  testID?: string
}

export interface FixedScreenProps extends BaseScreenProps {
  preset?: "fixed"
}

export interface ScrollScreenProps extends BaseScreenProps {
  preset?: "scroll"
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  ScrollViewProps?: ScrollViewProps
}

export interface AutoScreenProps extends Omit<ScrollScreenProps, "preset"> {
  preset?: "auto"
  scrollEnabledToggleThreshold?: { percent?: number; point?: number }
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps | AutoScreenProps

const isIos = Platform.OS === "ios"

type ScreenPreset = "fixed" | "scroll" | "auto"

function isNonScrolling(preset?: ScreenPreset) {
  return !preset || preset === "fixed"
}

function useAutoPreset(props: AutoScreenProps) {
  const { preset, scrollEnabledToggleThreshold } = props
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {}

  const scrollViewHeight = useRef<null | number>(null)
  const scrollViewContentHeight = useRef<null | number>(null)
  const [scrollEnabled, setScrollEnabled] = useState(true)

  function updateScrollState() {
    if (scrollViewHeight.current === null || scrollViewContentHeight.current === null) return
    const contentFitsScreen =
      point > 0
        ? scrollViewContentHeight.current < scrollViewHeight.current - point
        : scrollViewContentHeight.current < scrollViewHeight.current * percent

    setScrollEnabled(!contentFitsScreen)
  }

  function onContentSizeChange(_w: number, h: number) {
    scrollViewContentHeight.current = h
    updateScrollState()
  }

  function onLayout(e: LayoutChangeEvent) {
    scrollViewHeight.current = e.nativeEvent.layout.height
    updateScrollState()
  }

  if (preset === "auto") updateScrollState()

  return {
    scrollEnabled: preset === "auto" ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  }
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const { style, contentContainerStyle, children, preset } = props
  return (
    <View style={[$outerStyle, style]}>
      <View style={[$innerStyle, preset === "fixed" && $justifyFlexEnd, contentContainerStyle]}>
        {children}
      </View>
    </View>
  )
}

const ScreenWithScrolling = forwardRef<ScrollView, ScreenProps>((props, ref) => {
  const {
    children,
    keyboardShouldPersistTaps = "handled",
    keyboardBottomOffset = DEFAULT_BOTTOM_OFFSET,
    contentContainerStyle,
    ScrollViewProps,
    style,
  } = props as ScrollScreenProps

  const internalRef = useRef<KeyboardAwareScrollView>(null)

  useImperativeHandle(ref, () => ({
    scrollTo: (options: { x?: number; y?: number; animated?: boolean }) => {
      internalRef.current?.scrollTo(options)
    },
    scrollToEnd: (options?: { animated?: boolean }) => {
      internalRef.current?.scrollToEnd(options)
    },
    // Add other ScrollView methods as needed
    ...(internalRef.current as unknown as ScrollView),
  }))

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(props as AutoScreenProps)

  useScrollToTop(internalRef)

  return (
    <KeyboardAwareScrollView
      ref={internalRef}
      bottomOffset={keyboardBottomOffset}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      scrollEnabled={scrollEnabled}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e)
        ScrollViewProps?.onLayout?.(e)
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h)
        ScrollViewProps?.onContentSizeChange?.(w, h)
      }}
      style={[$outerStyle, ScrollViewProps?.style, style]}
      contentContainerStyle={[
        $innerStyle,
        ScrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}
    >
      {children}
    </KeyboardAwareScrollView>
  )
})
ScreenWithScrolling.displayName = "ScreenWithScrolling"

export function Screen(props: ScreenProps) {
  const {
    theme: { colors },
    themeContext,
  } = useAppTheme()
  const {
    backgroundColor,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges,
    StatusBarProps,
    statusBarStyle,
    testID,
  } = props

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  return (
    <View
      testID={testID || "screen-wrapper"}
      style={[
        $containerStyle,
        { backgroundColor: backgroundColor || colors.background },
        $containerInsets,
      ]}
    >
      <StatusBar
        style={statusBarStyle || (themeContext === "dark" ? "light" : "dark")}
        {...StatusBarProps}
      />

      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[$styles.flex1, KeyboardAvoidingViewProps?.style]}
      >
        {isNonScrolling(props.preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
    </View>
  )
}

const $containerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
}

const $outerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
}

const $justifyFlexEnd: ViewStyle = {
  justifyContent: "flex-end",
}

const $innerStyle: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "stretch",
}
