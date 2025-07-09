import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { roleRoutingPolicy } from "./roleRoutingPolicy"
import { NoAccessScreen } from "@/screens/NoAccessScreen"

export const MainCoordinator = () => {
  const session = useSelector((state: RootState) => state.session.session)

  if (!session) return null

  const match = roleRoutingPolicy.find((r) => r.match(session))
  const Component = match?.component ?? NoAccessScreen

  return <Component />
}
