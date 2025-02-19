// src/app/views/dashboard/shared/AttendanceSummary.js

import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const AttendanceSummary = ({ summary }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Attendance Summary</Typography>
        <Typography>Total Days: {summary.totalDays}</Typography>
        <Typography>Days Present: {summary.daysPresent}</Typography>
        <Typography>Days Absent: {summary.daysAbsent}</Typography>
      </CardContent>
    </Card>
  );
};

export default AttendanceSummary;
