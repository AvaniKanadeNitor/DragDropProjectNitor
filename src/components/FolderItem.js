import FolderIcon from '@mui/icons-material/Folder';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import { useDrag, useDrop } from "react-dnd";
import "../App.css";
import FilesList from "./FilesList";
import { ListContext } from './ListContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function FolderItem({ id = 0, name = "Top Level", type = "folder", isExpanded = false, topLevel = false }) {
    const [expanded, setExpanded] = useState(isExpanded || topLevel);
    const aContext = useContext(ListContext);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: ["file", "folder"],
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                aContext.addToId(item.name, item.type, id);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [id]);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "folder",
        item: { id: id, name: name, type: type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    const handleDoubleClick = () => {
        if (expanded && id !== 0)
            return;
        setExpanded(!expanded);
        if (id === aContext.getCurFolderId())
            return;
        aContext.setFolder(id);
    };

    useEffect(() => {
        setExpanded(isExpanded);
    }, [isExpanded])


    function randomDate(start, end) {
        var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
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




    return (
        <>
            {(!expanded && !topLevel)
                &&
                <React.Fragment>
                    {/* <Grid item xs={4} ref={drop} onDoubleClick={handleDoubleClick}> */}
                    {/* <Item ref={drag} style={{ boxShadow: "none" }}> */}
                    <TableRow ref={drop} onDoubleClick={handleDoubleClick}>
                        <TableCell ref={drag}>
                            <FolderIcon /> {name}
                        </TableCell>
                        <TableCell>
                            {randomDate(new Date(2022, 0, 1), new Date())}
                        </TableCell>
                        <TableCell>
                            {type}
                        </TableCell>
                        <TableCell>
                            {randomIntFromInterval(1, 500) + "MB"}
                        </TableCell>
                    </TableRow>

                    {/* </Item> */}
                    {/* </Grid> */}
                </React.Fragment>
            }

            {(expanded || topLevel) &&
                <>
                    <Container fixed ref={drop} className="dragarea">
                        <FilesList />
                    </Container>
                </>
            }
        </>
    );
}


export default FolderItem