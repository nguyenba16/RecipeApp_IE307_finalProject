import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const logIn = (userData) => {
    setUser(userData)
  }

  const logOut = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, setUser }}>{children}</AuthContext.Provider>
  )
}
