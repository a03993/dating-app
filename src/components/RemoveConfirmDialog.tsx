import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface RemoveConfirmDialogProps {
  open: boolean
  avatar: string
  userName: string
  onConfirm: () => void
  onCancel: () => void
}

export function RemoveConfirmDialog({ open, avatar, userName, onConfirm, onCancel }: RemoveConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onCancel}>
      <DialogContent className="flex flex-col items-center gap-4">
        <Avatar className="size-20">
          <AvatarImage src={avatar} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <DialogHeader>
          <DialogTitle>Are you sure you want to remove {userName}?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onConfirm}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
