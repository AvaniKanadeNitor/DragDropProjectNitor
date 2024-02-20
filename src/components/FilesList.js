import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import "../App.css";
import FileItem from './FileItem';
import FolderItem from './FolderItem';
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

function FilesList({ }) {
    const aContext = useContext(ListContext);
    const [num, setNum] = useState(1);

    const files = aContext.getList();

    function handleAddFile() {
        const idAdded = aContext.add('File ' + num, "pdf");
        setNum(num + 1);
    }

    function handleAddFolder() {
        const idAdded = aContext.add('Folder ' + num, "folder");
        setNum(num + 1);
    }

    function handleSetFolder() {
        aContext.setFolder(1004);
    }

    function handleGoTop() {
        aContext.setFolder(0);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                {files.length === 0 && <div align="center">Folder is empty, drag and drop files on this</div>}
                {/* <Grid container spacing={2} columns={18}> */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell width="300">Name</TableCell>
                                <TableCell width="100"> Date</TableCell>
                                <TableCell width="100">Type</TableCell>
                                <TableCell width="100">Size</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>

                       

                        {files.map((aFile) => {
                            return (
                                <React.Fragment key={aFile.id}>
                                    {aFile.type !== "folder" && <FileItem id={aFile.id} name={aFile.name} type={aFile.type} />}
                                    {aFile.type === "folder" && <FolderItem id={aFile.id} name={aFile.name} type={aFile.type} />}
                                </React.Fragment>
                            )
                        })}
                         </TableBody>
                         </Table>
                </TableContainer>
            {/* </Grid> */}
        </Box >
        </>
    );
}


export default FilesList