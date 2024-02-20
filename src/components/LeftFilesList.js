import List from '@mui/material/List';
import React from 'react';
import "../App.css";
import LeftListItem from './LeftListItem';

function LeftFilesList({ files }) {
    return (
        <>
        <List sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}>
            {files.map((aFile, index) => {
                return (
                    <React.Fragment key={index}>
                        
                            <LeftListItem id={aFile.id} name={aFile.name} type={aFile.type} />
                       
                    </React.Fragment>
                )
            })
            
            }
        </List>
        </>
    );
}


export default LeftFilesList