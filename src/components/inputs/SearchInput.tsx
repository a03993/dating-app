import SearchIcon from "@/assets/icons/search.svg?react"

import { InputWithIcon } from "./InputWithIcon"

export function SearchInput() {
  return (
    <InputWithIcon
      placeholder="Search"
      icon={<SearchIcon />}
      iconPosition="left"
      inputClassName="pl-10"
    />
  )
}
