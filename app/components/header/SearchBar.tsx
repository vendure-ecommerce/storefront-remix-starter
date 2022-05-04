import * as React from "react"
import { SyntheticEvent, useState } from "react"

export function SearchBar() {
  let initialQuery = '';
  if (typeof window !== 'undefined') {
    initialQuery = new URLSearchParams(location.search).get('q') ?? '';
  }
  const [query, setQuery] = useState(initialQuery)
    const onInput = (value: string) => {
      setQuery(value);
      if (value === '') {
          // navigate("/search", {})
      }
    }
  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    // navigate("/search?q=" + query, {})
  }
  return (
    <form onSubmit={onSubmit}>
      <input type='search'
             value={query}
             placeholder='Search' onInput={e => onInput((e.target as HTMLInputElement).value)}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </form>
  )
}
