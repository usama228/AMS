import React, { Fragment } from "react";
import { Box, Card, Grid, styled, useTheme } from "@mui/material";
import AttendanceStats from "./shared/AttendanceStats";
import RecentCheckins from "./shared/RecentCheckins";
import AttendanceSummary from "./shared/AttendanceSummary";
import PieChart from "./shared/PieChart";
import { Breadcrumb } from "app/components";
import { Container } from "app/assets";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

export default function Dashboard() {
  const { palette } = useTheme();

  const attendanceStats = {
    totalEmployees: 50,
    presentToday: 45,
    absentToday: 5,
  };

  const recentCheckins = [
    { name: "John Doe", checkin: "09:00 AM", checkout: "05:00 PM" },
    { name: "Jane Smith", checkin: "09:15 AM", checkout: "05:05 PM" },
  ];

  const attendanceSummary = {
    totalDays: 30,
    daysPresent: 25,
    daysAbsent: 5,
  };

  return (
    <Fragment>
      <Container />
      <Box>
        <Breadcrumb routeSegments={[{ name: "Dashboard" }]} />
      </Box>
      &nbsp;
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <H4>Attendance Overview</H4>
              <AttendanceStats stats={attendanceStats} />
              <AttendanceSummary summary={attendanceSummary} />
            </Card>

            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <H4>Recent Check-Ins/Outs</H4>
              <RecentCheckins checkins={recentCheckins} />
            </Card>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Attendance Distribution</Title>
              <SubTitle>Last 30 days</SubTitle>
              <PieChart
                height={300}
                data={[
                  { name: 'Present', value: attendanceSummary.daysPresent },
                  { name: 'Absent', value: attendanceSummary.daysAbsent },
                ]}
                color={[palette.success.main, palette.error.main]}
              />
            </Card>
          </Grid>
        </Grid>

      </ContentBox>

    </Fragment>

  );
}

