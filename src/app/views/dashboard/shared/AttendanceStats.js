// src/app/views/dashboard/shared/AttendanceStats.js

import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

const AttendanceStats = ({ stats }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Attendance Statistics</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography>Total Employees: {stats.totalEmployees}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Present Today: {stats.presentToday}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Absent Today: {stats.absentToday}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AttendanceStats;
