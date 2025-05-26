import { useState } from "react"

import SortIcon from "@/assets/icons/Sort.svg?react"
import { useNavigate } from "react-router-dom"

import { RemoveConfirmDialog } from "@/components/RemoveConfirmDialog"
import { UserGridCard } from "@/components/UserGridCard"
import { Button } from "@/components/ui/button"

import { useIncomingLikes } from "@/lib/hooks/useIncomingLikes"

import { useUserData } from "@/contexts/UserDataContext"

export default function MatchesPage() {
  const navigate = useNavigate()
  const { loggedInUser, allUsers } = useUserData()
  const { incomingLikes, isLoading, removeUserById, toggleMatchStatus } = useIncomingLikes(loggedInUser?.id, allUsers)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const selectedUser = incomingLikes.find((u) => u.id === selectedUserId)

  const handleRemoveRequest = (userId: string) => {
    setSelectedUserId(userId)
    setConfirmOpen(true)
  }

  const handleRemoveConfirm = () => {
    if (selectedUserId) {
      removeUserById(selectedUserId)
      setSelectedUserId(null)
    }
    setConfirmOpen(false)
  }

  const handleToggleMatch = (userId: string) => {
    toggleMatchStatus(userId)
  }

  if (!loggedInUser || isLoading) return null

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
          {incomingLikes.map((u) => (
            <UserGridCard
              key={u.id}
              src={u.avatar}
              name={u.firstName}
              age={u.age}
              isMatch={u.isMatch}
              onClick={() => navigate(`/profile/${u.id}?from=matches`)}
              onRemove={() => handleRemoveRequest(u.id)}
              onToggleMatch={() => handleToggleMatch(u.id)}
            />
          ))}
        </div>
      </div>

      {selectedUser && (
        <RemoveConfirmDialog
          open={confirmOpen}
          avatar={selectedUser.avatar}
          userName={selectedUser.firstName}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleRemoveConfirm}
        />
      )}
    </>
  )
}
