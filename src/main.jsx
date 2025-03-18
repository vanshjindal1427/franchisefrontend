import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import ApplicationForm from './ApplicationForm'
import ApplicantsTable from './ApplicantsTable'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <ApplicationForm></ApplicationForm> */}
    {/* <ApplicantsTable></ApplicantsTable> */}
  </StrictMode>
)
