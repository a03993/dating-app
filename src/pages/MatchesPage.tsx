import { useEffect, useState } from "react"

import SortIcon from "@/assets/icons/Sort.svg?react"
import { useNavigate } from "react-router-dom"

import { RemoveConfirmDialog } from "@/components/RemoveConfirmDialog"
import { UserGridCard } from "@/components/UserGridCard"
import { Button } from "@/components/ui/button"

import { useCurrentUser } from "@/contexts/UserContext"

import type { LikeRelation } from "@/types/like.type"
import type { MatchRelation } from "@/types/match.type"
import type { LikedUser } from "@/types/user.types"

interface LikedUserWithStatus extends LikedUser {
  isMatch: boolean
}

export default function MatchesPage() {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const [likedUsers, setLikedUsers] = useState<LikedUserWithStatus[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  function handleRemoveRequest(userId: string) {
    setSelectedUserId(userId)
    setConfirmOpen(true)
  }

  function handleRemoveConfirm() {
    if (selectedUserId) {
      setLikedUsers((prev) => prev.filter((user) => user.id !== selectedUserId))
    }
    setConfirmOpen(false)
    setSelectedUserId(null)
  }

  useEffect(() => {
    if (!currentUser) return

    async function fetchLikedUsers() {
      const [likesRes, matchesRes] = await Promise.all([
        fetch("http://localhost:4000/likes"),
        fetch("http://localhost:4000/matches"),
      ])
      const likes: LikeRelation[] = await likesRes.json()
      const matches: MatchRelation[] = await matchesRes.json()

      const likedByUserIds = likes.filter((like) => like.toUserId === currentUser?.id).map((like) => like.fromUserId)

      const isMutualLike = (otherUserId: string) =>
        likes.some((like) => like.fromUserId === currentUser?.id && like.toUserId === otherUserId)

      const isMatched = (otherUserId: string) =>
        matches.some(
          (m) =>
            (m.user1Id === currentUser?.id && m.user2Id === otherUserId) ||
            (m.user2Id === currentUser?.id && m.user1Id === otherUserId),
        )

      const usersWithStatus = await Promise.all(
        likedByUserIds.map(async (id) => {
          const res = await fetch(`http://localhost:4000/users/${id}`)
          const userData = await res.json()
          return {
            ...userData,
            isMatch: isMatched(id) || isMutualLike(id),
          }
        }),
      )

      setLikedUsers(usersWithStatus)
    }

    fetchLikedUsers()
  }, [currentUser?.id])

  if (!currentUser) return null

  return (
    <>
      <div className="mx-auto p-10 pb-30 md:pt-25 flex flex-col items-center gap-8">
        {/* Headers */}
        <div className="block md:hidden w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-medium">Matches</h1>
            <Button
              variant="outline"
              size="smSquare">
              <SortIcon />
            </Button>
          </div>
          <p className="text-sm text-black/70">This is a list of people who have liked you and your matches.</p>
        </div>

        <div className="hidden md:block">
          <div className="flex w-screen px-20 justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-medium">Matches</h1>
              <p className="text-sm text-black/70">This is a list of people who have liked you and your matches.</p>
            </div>
            <Button
              variant="outline"
              size="smSquare">
              <SortIcon />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
          {likedUsers.map((u) => (
            <UserGridCard
              key={u.id}
              src={u.avatar}
              name={`${u.firstName} ${u.lastName}`}
              age={u.age}
              isMatch={u.isMatch}
              onClick={() => navigate(`/profile/${u.id}?from=matches`)}
              onRemove={() => handleRemoveRequest(u.id)}
              onToggleMatch={() => {
                setLikedUsers((prev) =>
                  prev.map((user) => (user.id === u.id ? { ...user, isMatch: !user.isMatch } : user)),
                )
              }}
            />
          ))}
        </div>
      </div>

      <RemoveConfirmDialog
        open={confirmOpen}
        avatar={likedUsers.find((user) => user.id === selectedUserId)?.avatar ?? ""}
        userName={likedUsers.find((user) => user.id === selectedUserId)?.firstName ?? ""}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleRemoveConfirm}
      />
    </>
  )
}
