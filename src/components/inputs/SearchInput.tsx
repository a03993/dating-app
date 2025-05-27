import SearchIcon from "@/assets/icons/search.svg?react"

interface SearchInputProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function SearchInput({ searchQuery, setSearchQuery }: SearchInputProps) {
  return (
    <div className="relative flex w-full items-center gap-2">
      <input
        type="text"
        value={searchQuery}
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="h-12 w-full rounded-2xl border border-medium-gray bg-white px-3 pl-10 text-black placeholder:text-dark-gray/70 outline-none transition-all"
      />
      <div className="absolute size-5 text-dark-gray left-3">
        <SearchIcon />
      </div>
    </div>
  )
}
