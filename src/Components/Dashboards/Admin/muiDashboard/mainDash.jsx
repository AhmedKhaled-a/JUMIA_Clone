import { Grid ,Paper} from '@mui/material'
import React from 'react'
import DashboardOrders from '../Orders/Orders'
import DashboardMessages from '../Messages/DashboardMessages'

export default function MainDash() {
  return (
    <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    {/* top most component */}
                    {/* <DashboardOrders />  */}
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    {/* right most component */}
                  <DashboardMessages />

                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* <Orders /> */}
                  <DashboardOrders />
                </Paper>
              </Grid>
            </Grid>
  )
}
