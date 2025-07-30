import { AdminNavigator } from "./AdminNavigator"
import { ParticipantNavigator } from "./ParticipantNavigator"
import { ResearcherNavigator } from "./ResearcherNavigator"
import { NoAccessScreen } from "@/screens/NoAccessScreen"
import type { Session } from "@/types/session"

export const roleRoutingPolicy = [
  {
    match: (s: Session) => s.user.role === "Program Admin",
    component: AdminNavigator,
  },
  {
    match: (s: Session) =>
      s.user.role === "participant" && s.user.permissions.includes("survey.view"),
    component: ParticipantNavigator,
  },
  {
    match: (s: Session) =>
      s.user.role === "researcher" && s.user.featureFlags.includes("research_tools"),
    component: ResearcherNavigator,
  },
  {
    match: () => true,
    component: NoAccessScreen,
  },
]
