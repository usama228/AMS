import React from 'react';
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const RecentCheckins = ({ checkins }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Check-in</TableCell>
            <TableCell>Checkout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checkins.map((checkin, index) => (
            <TableRow key={index}>
              <TableCell>{checkin.name}</TableCell>
              <TableCell>{checkin.checkin}</TableCell>
              <TableCell>{checkin.checkout}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentCheckins;
