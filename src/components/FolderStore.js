import { Breadcrumbs, Button, Link, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';
import FolderItem from "./FolderItem";
import { ListContext } from './ListContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function FolderStore() {
  const aContext = useContext(ListContext);

  function handleGoTop() {
    aContext.setFolder(0);
  }

  function NavigationBreadCrumbs() {
    let folders = aContext.getParent();

    let aJsx = [];

    if (folders.length === 0)
      // if we are on top folder, there is no link
      aJsx.push("Top Folder");
    else
      // otherwise top folder is a link to go to that
      aJsx.push(<Link onClick={() => aContext.setFolder(0)} href="">Top Folder</Link>);

    while (folders.length > 0) {
      aJsx.push(" / ");
      // all names except the right most current folder name is a link going to respective id
      if (folders.length > 1) {
        let item = folders.pop();
        aJsx.push(<Link onClick={() => aContext.setFolder(item.id)} href="">{item.name}</Link>);
      }
      else
        aJsx.push(folders.pop().name);
    }

    return aJsx;
  }

  return (
    <>
      <NavigationBreadCrumbs /><br/><br/>
      <FolderItem id={aContext.getCurFolderItem().id} name={aContext.getCurFolderItem().name}
        isExpanded={aContext.getCurFolderItem().id > 0} topLevel={true} />
    </>
  )
}

export default FolderStore;
