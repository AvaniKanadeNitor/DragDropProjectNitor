import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import React from "react";
import { useDrag } from "react-dnd";
import Typography from '@mui/material/Typography';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function randomDate(start, end) {
  var d = new Date(start.getTime() + Math.random() * (end.getTime() -                     start.getTime())),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function randomIntFromInterval(min, max) { 
  // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}



function FileItem({ id, name, type }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "file",
    item: { id: id, name: name, type: type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <>
     {/* <Grid item xs={4} ref={drag} > */}
    
     <TableRow>
       <TableCell ref={drag} align="left" style={{display:"flex"}}>
          <p>{type === "image" && <ImageIcon/> }</p>
          <p>{type === "pdf" && <PictureAsPdfIcon />}</p>
          &nbsp;
          <p style={{lineHeight:"1.43"}}>{name}</p>
        </TableCell>
        <TableCell>
          {randomDate(new Date(2022, 0, 1), new Date())}
        </TableCell>
        <TableCell>
        {type}
        </TableCell>
        <TableCell>
         {randomIntFromInterval(1, 500)+"MB"}
         
        </TableCell>


      </TableRow>
      {/* </Grid> */}
     </>
  );
}

export default FileItem;