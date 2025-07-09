import { useSession } from "./useSession"
import { Permission } from "@/utils/enums"

export function usePermission(required: Permission): boolean {
  const session = useSession((s) => s.session)
  return !!session?.permissions.includes(required)
}
