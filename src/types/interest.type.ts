export interface Interest {
  id:
    | "photography"
    | "shopping"
    | "karaoke"
    | "yoga"
    | "cooking"
    | "tennis"
    | "running"
    | "swimming"
    | "art"
    | "traveling"
    | "extreme"
    | "music"
    | "drinking"
    | "videoGames"
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}
