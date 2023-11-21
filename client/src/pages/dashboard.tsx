import Row1 from "@/components/dashboard/row-1"
import Row2 from "@/components/dashboard/row-2"
import Row3 from "@/components/dashboard/row-3"
import { Box, useMediaQuery } from "@mui/material"

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`
const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`

const Dasboard = () => {
  const isAboveMediumScreens = useMediaQuery('(min-width: 1200px)')

  return (
    <Box width='100%' height='100%' display='grid' gap='1.5rem'
      sx={
        isAboveMediumScreens
          ? {
            gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
            gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
            gridTemplateAreas: gridTemplateLargeScreens,
          }
          : {
            gridAutoColumns: "1fr",
            gridAutoRows: "80px",
            gridTemplateAreas: gridTemplateSmallScreens,
          }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  )
}

export default Dasboard