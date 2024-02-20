import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import FolderStore from "./components/FolderStore";
import LeftFilesList from './components/LeftFilesList';
import { ListContextProvider } from "./components/ListContext";
import myjson from "./data/data.json";

function App() {

  return (
    <DndProvider backend={HTML5Backend}>
       
      <ListContextProvider>
      <h2 align="center">Demo of FolderStore Component </h2>
        <Grid container spacing={2} columns={20}>
          <Grid item xs={5}>

            <Card>
              <CardContent>
                <b>Items loaded from data.json</b>
                <LeftFilesList files={myjson.myfiles} />
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={15}>
            <FolderStore/>
          </Grid>
        </Grid>
      </ListContextProvider>



    </DndProvider>
  )
}

export default App;
