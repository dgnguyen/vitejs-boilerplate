import { Box } from '@mui/material'
import DashboardHeader from './DashboardHeader'
import DashboardActions from './DashboardActions'
import DashboardContent from './DashboardContent'
import { useSelector } from 'react-redux'
import { logoutUser } from 'redux/reducers/user'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Dashboard = () => {
  const navigate = useNavigate()
  const logout = useSelector(logoutUser)
  useEffect(() => {
    if (logout) navigate('/')
  }, [logout])
  return (
    <Box>
      <DashboardHeader />
      <DashboardActions />
      <DashboardContent />
    </Box>
  )
}

export default Dashboard
