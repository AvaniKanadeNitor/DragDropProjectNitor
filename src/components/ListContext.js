import { createContext, useEffect, useReducer } from "react";

const ListContext = createContext();

const initialState = {
    filesList: [],
    fullStore: [],
    curFolderId: 0,
    curFolderItem: {},
    newId: 1000,

}

function deepSearch(object, key, predicate) {
    if (object.hasOwnProperty(key) && predicate(key, object[key]) === true) return object

    for (let i = 0; i < Object.keys(object).length; i++) {
        let value = object[Object.keys(object)[i]];
        if (typeof value === "object" && value != null) {
            let o = deepSearch(object[Object.keys(object)[i]], key, predicate)
            if (o != null) return o
        }
    }
    return null
}


function listReducer(state, action) {
    if (action.type === "setFolder") {
        let curFolderId = action.id;
        let filesList = state.filesList;
        let curFolderItem = {};
        if (curFolderId === 0) {
            // if folder to switch to is top level, just take top level array to display
            filesList = state.fullStore;
        }
        else {
            //otherwise, search for folder and take its data as display list
            let result = deepSearch(state.fullStore, 'id', (k, v) => v === curFolderId);
            if (result.type !== "folder") {
                alert('Logic error, trying to set current folder to non folder or non existing object ' + curFolderId);
                return;
            }
            filesList = result.data;
            //fetch and keep corresponding folder item in the state
            curFolderItem = result;
        }
        sessionStorage.setItem("curFolderId", curFolderId);
        return {
            ...state,
            filesList: filesList,
            curFolderId: curFolderId,
            curFolderItem: curFolderItem,
        }
    }

    if (action.type === "addItem") {
        //prepare an item to add. Put parentId as the toId sent in action
        let anItem = {
            id: state.newId + 1,
            name: action.name,
            type: action.aType,
            parentId: action.toId
        };
        if (anItem.type === "folder")
            anItem.data = [];

        //make copies of store and list for update    
        let newStore = [...state.fullStore];
        let filesList = [...state.filesList];

        if (action.toId > 0) {
            //if target folder is not top folder, deep search and then add to its data
            let folderItem = deepSearch(newStore, 'id', (k, v) => v === action.toId);
            folderItem.data = [...folderItem.data, anItem];
        }
        else
            // if target folder is top folder itself, update top level array 
            newStore = [...newStore, anItem];

        sessionStorage.setItem("fullStore", JSON.stringify(newStore));
        sessionStorage.setItem("newId", state.newId + 1);

        // if target folder is the one being displayed, update files list too
        if (state.curFolderId === action.toId)
            filesList = [...filesList, anItem];

        return {
            ...state,
            newId: state.newId + 1,
            filesList: filesList,
            fullStore: newStore
        }
    }

    if (action.type === "loadData") {
        let fullData = [];
        let listData = [];
        let newId = 1000;
        let CurFolderItem = {};
        let curFolderId = 0;
        if ("fullStore" in sessionStorage) {
            let data = JSON.parse(sessionStorage.getItem("fullStore"));
            if (data)
                fullData = data;
        }
        if ("newId" in sessionStorage) {
            let data = Number(sessionStorage.getItem("newId"));
            if (data)
                newId = data;
        }
        if ("curFolderId" in sessionStorage) {
            let data = Number(sessionStorage.getItem("curFolderId"));
            if (data)
                curFolderId = data;
        }

        if (curFolderId === 0) {
            listData = [...fullData];
        }
        else {
            let result = deepSearch(fullData, 'id', (k, v) => v === curFolderId);
            if (result.type !== "folder") {
                alert('Logic error, trying to set current folder to non folder object. ' + curFolderId);
                return;
            }
            CurFolderItem = result;
            listData = [...result.data];
        }

        return {
            ...state,
            filesList: listData,
            fullStore: fullData,
            curFolderId: curFolderId,
            curFolderItem: CurFolderItem,
            newId: newId
        };

    }

}

function ListContextProvider(props) {
    const [listState, dispatch] = useReducer(listReducer, initialState);

    function getList(anId) {
        return listState.filesList;
    }

    function dump() {
        console.log(listState.fullStore);
    }

    function getAsString() {
        return JSON.stringify(listState.fullStore);
    }


    function addToId(aName, aType, anId) {
        dispatch({ type: "addItem", name: aName, aType: aType, toId: anId });
    }



    function setFolder(anId) {
        dispatch({ type: "setFolder", id: anId });
    }

    function getCurFolderItem() {
        let item = listState.curFolderItem;
        if (!item.hasOwnProperty('id')) {
            // if top level folder, item might be empty so set defaults it so that it
            // doesn't cause error when someone fetches the properties
            item = {
                id: 0,
                name: '',
                type: 'folder'
            }
        }
        return item;
    }

    function getCurFolderId() {
        return listState.curFolderId;
    }

    function getParent() {
        let curId = listState.curFolderId;
        let folders = [];
        while (curId !== 0) {
            let item = deepSearch(listState.fullStore, 'id', (k, v) => v === curId);
            folders.push(item);
            curId = item.parentId;
        }

        return folders;
    }


    const listData = {
        getList: getList,
        addToId: addToId,
        setFolder: setFolder,
        dump: dump,
        getCurFolderItem: getCurFolderItem,
        getCurFolderId: getCurFolderId,
        getParent: getParent,
        getAsString: getAsString
    }

    useEffect(() => {
        dispatch({ type: "loadData" });
    }, [])

    return (
        <>
            <ListContext.Provider value={listData}>
                {props.children}
            </ListContext.Provider>
        </>
    );
}

export { ListContext, ListContextProvider };
