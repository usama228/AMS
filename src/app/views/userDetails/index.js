// import React, { useState } from 'react';
// import {
//   Box,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Stack,
//   Modal,
//   Typography,
//   Button
// } from "@mui/material";
// import { StyledTable } from "app/assets";
// import { useLeave } from '../../context/LeaveContext'; 
// import { Breadcrumb, SimpleCard } from 'app/components';
// import moment from 'moment';

// function UserDetail() {
//   const { leaves } = useLeave();
//   const [open, setOpen] = useState(false);
//   const [selectedLeave, setSelectedLeave] = useState(null);

//   const handleOpen = (leave) => {
//     setSelectedLeave(leave);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const renderAttachment = (attachment) => {
//     if (!attachment) return "No document attached";
//     const fileUrl = URL.createObjectURL(attachment);

//     if (attachment.type === "application/pdf") {
//       return (
//         <object data={fileUrl} type="application/pdf" width="100%" height="400px">
//           <p>Your browser does not support PDFs. <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download the PDF</a>.</p>
//         </object>
//       );
//     } else if (attachment.type === "application/msword" || attachment.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
//       return (
//         <a href={fileUrl} target="_blank" rel="noopener noreferrer">View Word Document</a>
//       );
//     } else if (attachment.type.startsWith("image/")) {
//       return (
//         <img src={fileUrl} alt="Attached" style={{ maxWidth: "100%", height: "auto" }} />
//       );
//     } else {
//       return <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download Attachment</a>;
//     }
//   };

//   return (
//     <SimpleCard>
//       <Box>
//         <Breadcrumb routeSegments={[{ name: "All Leave" }]} />
//       </Box>
//       &nbsp;
//       <Stack spacing={3}>
//         <Box>
//           <StyledTable>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">Day</TableCell>
//                 <TableCell align="center">Date</TableCell>
//                 <TableCell align="center">Time</TableCell>
//                 <TableCell align="center">Type</TableCell>
//                 <TableCell align="center">Start Date</TableCell>
//                 <TableCell align="center">End Date</TableCell>
//                 <TableCell align="center">Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {leaves.length > 0 ? (
//                 leaves.map((leave) => {
//                   const startDate = new Date(leave.startDate);
//                   const endDate = new Date(leave.endDate);
//                   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//                   const day = startDate.toLocaleDateString(undefined, { weekday: 'long' });
//                   const date = startDate.toLocaleDateString(undefined, options);
//                   const time = moment().format('HH:mm:ss');
                  
//                   return (
//                     <TableRow key={leave.id}>
//                       <TableCell align="center">{day}</TableCell>
//                       <TableCell align="center">{date}</TableCell>
//                       <TableCell align="center">{time}</TableCell>
//                       <TableCell align="center">{leave.type}</TableCell>
//                       <TableCell 
//                         align="center" 
//                         onClick={() => handleOpen(leave)}
//                         style={{ cursor: 'pointer', color: 'blue' }}
//                       >
//                         {startDate.toLocaleDateString()}
//                       </TableCell>
//                       <TableCell 
//                         align="center" 
//                         onClick={() => handleOpen(leave)}
//                         style={{ cursor: 'pointer', color: 'blue' }}
//                       >
//                         {endDate.toLocaleDateString()}
//                       </TableCell>
//                       <TableCell align="center">{leave.status}</TableCell>
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">No leave requests available</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </StyledTable>
//         </Box>
//       </Stack>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="leave-details-modal"
//         aria-describedby="leave-details-modal-description"
//       >
//         <Box 
//           sx={{ 
//             position: 'absolute', 
//             top: '50%', 
//             left: '50%', 
//             transform: 'translate(-50%, -50%)', 
//             bgcolor: 'background.paper', 
//             boxShadow: 24, 
//             p: 4, 
//             minWidth: 300 
//           }}
//         >
//           {selectedLeave && (
//             <>
//               <Typography id="leave-details-modal" variant="h6" component="h2">
//                 Leave Details
//               </Typography>
//               <Typography sx={{ mt: 2 }}>
//                 <strong>Reason:</strong> {selectedLeave.reason}
//               </Typography>
//               <Typography sx={{ mt: 2 }}>
//                 <strong>Status:</strong> {selectedLeave.status}
//               </Typography>
//               <Typography sx={{ mt: 2 }}>
//                 <strong>Attached Document:</strong>
//               </Typography>
//               <Box sx={{ mt: 2 }}>
//                 {renderAttachment(selectedLeave.attachment)}
//               </Box>
//               <Button 
//                 onClick={handleClose} 
//                 sx={{ marginTop: 2 }} 
//                 variant="contained"
//               >
//                 Close
//               </Button>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </SimpleCard>
//   );
// }

// export default UserDetail;
