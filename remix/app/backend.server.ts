import { BackendAPIClient } from "shared";

export const backend = new BackendAPIClient(process.env.BACKEND_URL || 'http://localhost:5557')
