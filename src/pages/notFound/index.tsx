import Button from '@mui/material/Button'

import AppLayout from 'layout/AppLayout'
import { useNavigate } from 'react-router-dom'

import "./style.scss"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <AppLayout>
      <h1>Page Not Found</h1>
      <section className="error-container">
        <span className="four"><span className="screen-reader-text">4</span></span>
        <span className="zero"><span className="screen-reader-text">0</span></span>
        <span className="four"><span className="screen-reader-text">4</span></span>
      </section>
      <div className="link-container">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </AppLayout>
  )
}

export default NotFound
