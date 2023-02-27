import { BackendAPIClient } from "shared";

if (typeof window !== 'undefined') {
  throw Error("Backend API Client included in frontend. Frontend should not talk directly to backend services")
}

export const backend = new BackendAPIClient(process.env.BACKEND_URL || 'http://localhost:5557')
