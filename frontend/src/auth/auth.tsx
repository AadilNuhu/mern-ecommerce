import { useEffect, useState } from "react"

type User = { id: string; username: string; email?: string } | null

// default TTL for session (3 hours). Change as needed.
const DEFAULT_TTL_MS = 3 * 60 * 60 * 1000

// read initial user from localStorage (with expiry check)
let currentUser: User = (() => {
  try {
    const raw = localStorage.getItem("user")
    if (!raw) return null
    const parsed = JSON.parse(raw) as { value: User; expires?: number } | null
    if (!parsed) return null
    if (parsed.expires && Date.now() > parsed.expires) {
      localStorage.removeItem("user")
      return null
    }
    return parsed.value ?? null
  } catch {
    return null
  }
})()

const subscribers = new Set<(new_user: User) => void>()

function updateCurrentUser(new_user: User, ttlMs?: number) {
  currentUser = new_user
  if (new_user) {
    const expires = ttlMs ? Date.now() + ttlMs : undefined
    localStorage.setItem("user", JSON.stringify({ value: new_user, expires }))
  } else {
    localStorage.removeItem("user")
  }
  subscribers.forEach((cb) => {
    try {
      cb(new_user)
    } catch {
      /* ignore subscriber errors */
    }
  })
}

// exported setter accepts optional ttl (ms). If not provided, uses DEFAULT_TTL_MS.
export function setUser(new_user: User, ttlMs: number = DEFAULT_TTL_MS) {
  updateCurrentUser(new_user, new_user ? ttlMs : undefined)
}

export function getUser(): User {
  return currentUser
}

export function useAuth() {
  const [user, setLocalUser] = useState<User>(currentUser)

  useEffect(() => {
    const handler = (new_user: User) => setLocalUser(new_user)
    subscribers.add(handler)
    return () => void subscribers.delete(handler)
  }, [])

  const setUserWrapper = (new_user: User, ttlMs?: number) => {
    updateCurrentUser(new_user, new_user ? (ttlMs ?? DEFAULT_TTL_MS) : undefined)
  }

  return {
    user,
    setUser: setUserWrapper,
    isAuthenticated: !!user,
  }
}