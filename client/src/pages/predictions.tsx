import DashboardBox from "@/components/dashboard/dashboard-box"
import FlexBetween from "@/components/flex-between"
import { useGetKpisQuery } from "@/state/api"
import { Box, Button, Typography, useTheme } from "@mui/material"
import { useMemo, useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Label } from "recharts"
import { DataPoint } from 'regression'
import regression from 'regression'

const Predictions = () => {
  const [isPrediction, setIsPrediction] = useState(false)
  const { palette } = useTheme()
  const { data } = useGetKpisQuery()

  const formattedData = useMemo(() => {
    if (!data) return []
    const monthData = data[0].monthlyData
    const formatted: Array<DataPoint> = monthData.map(({ revenue }: { revenue: number }, i: number) => {
      return [i, revenue]
    })

    const regressionLine = regression.linear(formatted)

    return monthData.map(({ month, revenue }: { month: string, revenue: number }, i: number) => {
      return {
        name: month,
        'Actual Revenue': revenue,
        'Regression Line': regressionLine.points[i][1],
        'Predicted Revenue': regressionLine.predict(i + 12)[1]
      }
    })
  }, [data])

  return (
    <DashboardBox height='100%' width='100%' p='1rem' overflow='hidden'>
      <FlexBetween m='1rem 2.5rem'>
        <Box>
          <Typography variant='h3'>
            Revenue and Predictions
          </Typography>
          <Typography variant='h6'>
            charted revenue and predictal revenue based on a single linear regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPrediction(!isPrediction)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: '0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .8)',
            ':hover': {
              backgroundColor: palette.grey[500],
            }
          }}
        >
          {isPrediction ? 'Hide' : 'Show'} Predicted Revenue for the Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={formattedData}
          margin={{
            top: 75,
            right: 20,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke={palette.grey[800]} />
          <XAxis
            dataKey='name'
            tickLine={false}
            style={{ fontSize: "10px" }}
          >
            <Label value='Month' offset={-5} position='insideBottom' />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            tickLine={false}
            axisLine={{ strokeWidth: '0' }}
            style={{ fontSize: "10px" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label value='Revenue in USD' angle={-90} offset={-5} position='insideLeft' />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign='top' />
          <Line
            type='monotone'
            dataKey='Actual Revenue'
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type='monotone'
            dataKey='Regression Line'
            stroke={palette.tertiary[500]}
            dot={false}
          />
          {isPrediction && (
            <Line
              strokeDasharray='5 5'
              dataKey='Predicted Revenue'
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  )
}

export default Predictions