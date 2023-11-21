import { useState } from "react"
import { Link } from "react-router-dom"
import { Box, useTheme, Typography } from "@mui/material"
import FlexBetween from "./flex-between"

const Navbar = () => {
  const { palette } = useTheme()
  const [selected, setSelected] = useState('dashboard')

  return (
    <FlexBetween mb='0.25rem' p='0.5rem 0rem' color={palette.grey[300]}>
      {/* Left Side */}
      <FlexBetween gap='0.75rem'>
        <Typography variant='h4' fontSize='16px'>
          Financeclober
        </Typography>
      </FlexBetween>

      {/* Right Side */}
      <FlexBetween gap='2rem'>
        <Box>
          <Link
            to='/'
            onClick={() => setSelected('dashboard')}
            style={{
              color: selected === 'dashboard' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
              pointerEvents: selected === 'dashboard' ? 'none' : 'inherit',
            }}
          >Dashboard</Link>
        </Box>
        <Box>
          <Link
            to='/predictions'
            onClick={() => setSelected('predictions')}
            style={{
              color: selected === 'predictions' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
              pointerEvents: selected === 'predictions' ? 'none' : 'inherit',
            }}
          >Predictions</Link>
        </Box>
      </FlexBetween>
    </FlexBetween >
  )
}

export default Navbar