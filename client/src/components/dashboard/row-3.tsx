import { Box, Typography, useTheme } from "@mui/material"
import DashboardBox from "./dashboard-box"
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useGetTransactionsQuery, useGetProductsQuery, useGetKpisQuery } from "@/state/api"
import BoxHeader from "../box-header";
import FlexBetween from "../flex-between";
import { Cell, Pie, PieChart } from "recharts";
import { useMemo } from "react";


const Row3 = () => {
  const { data: transactionData } = useGetTransactionsQuery()
  const { data: prodcutsData } = useGetProductsQuery()
  const { data: kpisData } = useGetKpisQuery()
  const { palette } = useTheme()
  const pieColors = [palette.primary[800], palette.primary[300]]

  const productsColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`
    }
  ]

  const transactionColumns = [
    {
      field: '_id',
      headerName: 'id',
      flex: 1
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.67,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`
    },
    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.2,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length
    }
  ]

  const pieChartData = useMemo(() => {
    if (kpisData) {
      const totalExpenses = kpisData[0].totalExpenses
      return Object.entries(kpisData[0].expensesByCategory).map(([key, value]) => {
        return [
          {
            name: key,
            value: value
          },
          {
            name: `${key} of Total`,
            value: totalExpenses - value
          }
        ]
      })
    }
  }, [kpisData])

  return (
    <>
      <DashboardBox gridArea='g'>
        <BoxHeader
          title='List of Products'
          sideText={`${prodcutsData?.length} Products`}
        />
        <Box
          mt='0.5rem'
          p='0.5rem'
          height='75%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none'
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden'
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={prodcutsData || []}
            columns={productsColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea='h'>
        <BoxHeader
          title='Recent Orders'
          sideText={`${transactionData?.length} Latest Orders`}
        />
        <Box
          mt='0.5rem'
          p='0.5rem'
          height='80%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none'
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden'
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea='i'>
        <BoxHeader title='Expense Breakdown By Category' sideText='+4%' />
        <FlexBetween mt='0.5rem' gap='0.5rem' p='0 1rem' textAlign='center'>
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke='none'
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey='value'
                >
                  {data.map((__, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='h5'>{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea='j'>
        <BoxHeader
          title='Overall Summary and Explanation Data'
          subtitle='Breakdown of the kpis for this month finance campaign'
          sideText='+25%' />
        <Box
          height='15px'
          margin='0.8rem 1rem 0.4rem 1rem'
          borderRadius='1rem'
          bgcolor={palette.primary[800]}
        >
          <Box
            height='15px'
            borderRadius='1rem'
            bgcolor={palette.primary[600]}
            width='40%'
          />
        </Box>
        <Typography margin='1rem' variant='h6'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae aperiam nostrum, quidem quis, consectetur vel adipisci optio corporis aliquid sit ipsa vero obcaecati velit eius dignissimos aut veniam? Voluptatem, sequi. Beatae aperiam nostrum, quidem quis, consectetur vel adipisci optio corporis.
        </Typography>
      </DashboardBox>
    </>
  )
}

export default Row3