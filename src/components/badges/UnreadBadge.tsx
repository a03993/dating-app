import { Badge } from "../ui/badge"

interface UnreadBadgeProps {
  amount: number
}

export function UnreadBadge({ amount }: UnreadBadgeProps) {
  return (
    <Badge
      variant="unread"
      className={amount === 0 ? "invisible" : "visible"}>
      {amount}
    </Badge>
  )
}
