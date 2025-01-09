/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from 'react'

interface ProtectedRouteProps {
    children: ReactNode;
  }

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <div>ProtectedRoute</div>
  )
}