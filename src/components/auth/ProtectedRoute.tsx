import { ReactNode } from "react";
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { credentials } = useAuth()

  if (!credentials) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}