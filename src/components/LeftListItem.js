import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from "react";
import { useDrag } from "react-dnd";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function LeftListItem({ id, name, type }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "file",
        item: { id: id, name: name, type: type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        
            <ListItem ref={drag}>
                <ListItemIcon>
                    {type === "image" && <ImageIcon />}
                    {type === "pdf" && <PictureAsPdfIcon />}
                    {type === "folder" && <FolderIcon />}
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
        
    );
}

export default LeftListItem;