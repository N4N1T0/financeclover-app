import { useGetProductsQuery, useGetKpisQuery } from "@/state/api"
import DashboardBox from "./dashboard-box"
import BoxHeader from "../box-header"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from "recharts"
import { Box, Typography, useTheme } from "@mui/material"
import { useMemo } from "react"
import FlexBetween from "../flex-between"

const pieData = [
  { name: 'Group A', value: 600 },
  { name: 'Group B', value: 400 },
]

const Row2 = () => {
  const { data: prodcutsData } = useGetProductsQuery()
  const { data: kpisData } = useGetKpisQuery()
  const { palette } = useTheme()
  const pieColors = [palette.primary[800], palette.primary[300]]

  const expenses = useMemo(() => {
    return (
      kpisData &&
      kpisData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          'operational expenses': operationalExpenses,
          'non-operational expenses': nonOperationalExpenses
        }
      })
    )
  }, [kpisData])

  const prices = useMemo(() => {
    return (
      prodcutsData &&
      prodcutsData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price,
          expense
        }
      })
    )
  }, [prodcutsData])

  return (
    <>
      <DashboardBox gridArea='d'>
        <BoxHeader
          title='Operational vs Non-Operational Expenses'
          subtitle='top line represents Operational, bottom line represents Non-Operational'
          sideText='+8%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={expenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey='name'
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId='left'
              orientation='left'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId='right'
              orientation='right'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='non-operational expenses'
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='operational expenses'
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea='e'>
        <BoxHeader
          title='Campaigns and Targets'
          sideText='+6%'
        />
        <FlexBetween mt='1.5rem' gap='1.5rem' paddingRight='1rem'>
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}>
            <Pie
              stroke='none'
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey='value'
            >
              {pieData.map((__, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml='-0.7rem' flexBasis='35%' textAlign='center'>
            <Typography variant='h5'>Target Sales</Typography>
            <Typography m='0.3rem 0' variant='h3' color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant='h6'>
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis='35%'>
            <Typography variant='h5'>Losses in Revenue</Typography>
            <Typography variant='h6'>Losses are down 25%</Typography>
            <Typography mt='0.4rem' variant='h5'>
              Profit Margins
            </Typography>
            <Typography variant='h6'>
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea='f'>
        <BoxHeader
          title='Products Prices vs Expenses'
          sideText='+20%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type='number'
              dataKey='price'
              name='price'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type='number'
              dataKey='expense'
              name='expense'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis
              type='number'
              range={[20]}
            />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name='Product Expense Ratio'
              data={prices}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2