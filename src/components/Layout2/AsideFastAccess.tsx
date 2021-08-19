import React, { useEffect, useRef, useState } from "react";
import { ListBox, processListBoxDragAndDrop, ListBoxItemClickEvent } from "@progress/kendo-react-listbox"
import { NavLink, useHistory } from "react-router-dom"
import { v4 } from "uuid"
import { list } from "../../store/list-data";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs"


function ListItem({ dataItem, onClick, className, ...props }) {

  const edit = <li {...props} className={`${className}${dataItem.selected ? " selected" : ""}`}><span
    className="d-flex justify-content-between align-items-start w-100">
    <span className="remove" onClick={onClick}><span className="icon-times text-danger" /></span>
    <span className="text mr-auto">{dataItem.name}</span>
    <span className="icon-drag ml-3 text-warning k-cursor-grab" />
  </span></li>

  let name = dataItem.name
  if (dataItem.search) {
    const { index, term } = dataItem.search
    const start = dataItem.name.slice(0, index)
    const center = dataItem.name.slice(index, index + term.length)
    const end = dataItem.name.slice(index + term.length)
    name = <>{start}<span className="searched">{center}</span>{end}</>
  }
  const normal = <li {...props} className={`${className}${dataItem.selected ? " selected" : ""}`} onClick={onClick}>
    {dataItem.uri
      ? <a href={dataItem.uri} className="d-flex w-100"><span className="icon-link pr-3" /><span
        className="text mr-auto">{name}</span></a>
      : <span className="d-flex w-100"><span className="icon-link pr-3" /><span
        className="text mr-auto">{name}</span></span>
    }
  </li>

  return props.draggable ? edit : normal

}

export function AsideFastAccess({ setNotification }) {

  const history = useHistory()

  // ListBox state
  const [state, setState] = useState({
    list,
    draggedItem: {},
    draggable: false,
  })

  // Add item state
  const addRef = useRef(null)
  const [addState, setAddState] = useState({
    value: "",
    visible: false
  })

  // Search state
  const searchRef = useRef(null)
  const [searchState, setSearchState] = useState({
    list: [],
    value: "",
    visible: false
  })

  // Dialog state
  const [dialogState, setDialogState] = useState({
    visible: false,
    itemToRemove: null
  })

  const toggleDialog = (item) => {
    setDialogState({
      ...dialogState,
      itemToRemove: item,
      visible: !dialogState.visible
    })
  }

  const handleDragStart = (e) => {
    setState({ ...state, draggedItem: e.dataItem })
  }

  const handleDrop = (e) => {
    let result = processListBoxDragAndDrop(
      state.list,
      [],
      state.draggedItem,
      e.dataItem,
      "name"
    )
    setState({
      ...state
      // added: result.listBoxOneData,
    })
  }

  const handleClick = (e: ListBoxItemClickEvent) => {
    const index = state.list.findIndex(item => item.id === e.dataItem.id)
    if (index >= 0) {
      const newList = [...state.list]
      newList[index].selected = false
      setState({
        ...state,
        list: newList,
      })
    }
    if (!state.draggable) return
    toggleDialog(e.dataItem)
  }

  const removeItem = () => {
    if (!dialogState.itemToRemove) return
    setState({
      ...state,
      list: state.list.filter(item => item.id !== dialogState.itemToRemove.id),
    })
    setDialogState({
      ...dialogState,
      itemToRemove: null,
      visible: false
    })
  }

  const contains = (text, term) => {
    return text.toString().toLowerCase().indexOf(term.toLowerCase())
  }

  const search = (items, term) => {
    return items.reduce((acc, item) => {
      delete item.search
      const index = contains(item.name, term)
      if (index >= 0) {
        acc.push({
          ...item,
          search: { index, term }
        })
      }
      return acc
    }, [])
  }

  const handleSearch = event => {
    const value = event.target.value
    const newList = search(state.list, value)
    setSearchState({
      ...searchState,
      value,
      list: newList
    })
  }

  const hideSearch = () => {
    setSearchState({
      ...searchState,
      value: "",
      list: [],
      visible: false
    })
    searchRef.current.classList.add("k-hidden")
    searchRef.current.blur()
  }

  const handleAdd = () => {
    if (!addState.value) return
    const index = state.list.findIndex(item => item.name === addState.value)
    if (index >= 0) {
      const newList = [...state.list]
      newList[index].selected = true
      setState({
        ...state,
        list: newList,
      })
      hideAdd()
      return
    }
    setState({
      ...state,
      list: [{
        id: v4(),
        name: addState.value,
        uri: history.location.pathname,
        isAdded: true,
      }, ...state.list],
    })
    setNotification(`Page “${addState.value}” was added to Fast Access`)
    hideAdd()
  }

  const hideAdd = () => {
    setAddState({
      ...addState,
      value: "",
      visible: false
    })
    addRef.current.classList.add("k-hidden")
    addRef.current.querySelector(".k-textbox").blur()
  }

  const toggleAdd = () => {
    hideSearch()
    if (addState.visible) {
      hideAdd()
    } else {
      setAddState({
        ...addState,
        visible: true
      })
      addRef.current.classList.remove("k-hidden")
      addRef.current.querySelector(".k-textbox").focus()
    }
  }

  const toggleSearch = () => {
    hideAdd()
    if (searchState.visible) {
      hideSearch()
    } else {
      setSearchState({
        ...searchState,
        value: "",
        list: [],
        visible: true
      })
      searchRef.current.classList.remove("k-hidden")
      searchRef.current.focus()
    }
  }

  const toggleDrag = () => {
    hideAdd()
    hideSearch()
    setState({
      ...state,
      draggable: !state.draggable
    })
  }

  useEffect(() => {
    if (state.list.find(item => item.selected)) {
      document.querySelector(".AsideListBox li.selected").scrollIntoView()
    }
  }, [state])
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  // render() {
  return <>
    <div className={`AsideFastAccess mb-4 mt-auto`}>
      <div className={`AsideTitle${isActive ? " focus" : ""}`} >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="AsideTitle--title text-uppercase font-weight-bold" onClick={toggleClass}>
            {state.draggable ? "Fast Access - Settings" : "Fast Access"}
            <span className="icon-path">path</span>
          </div>
          <div className="AsideTitle--tools">
            {!state.draggable && <>
              <span className={`icon-add${addState.visible && " text-white"}`} onClick={toggleAdd} >add</span>
              <span className={`icon-clue${searchState.visible && " text-white"}`} onClick={toggleSearch} >search</span>
            </>}
            <span className={`icon-params${state.draggable && " text-white"}`} onClick={toggleDrag} >drag</span>
          </div>
        </div>
        <input className="k-textbox form-control-sm k-hidden mb-3"
          ref={searchRef}
          onChange={handleSearch}
          value={searchState.value} />
        <div ref={addRef} className="AsideFastAccess--input-group k-hidden mb-3">
          <input className="k-textbox form-control-sm mb-3"
            ref={addRef}
            onChange={event => setAddState({ ...addState, value: event.target.value })}
            value={addState.value} />
          <span className="AsideFastAccess--add-button icon-add" onClick={handleAdd} />
        </div>

      </div>
      <ListBox
        className="AsideListBox"
        data={searchState.value ? searchState.list : state.list}
        textField="name"
        item={ListItem}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        draggable={state.draggable}
        onItemClick={handleClick}
      />
    </div>

    {dialogState.visible && (
      <Dialog className="Dialog" title={<div className="text-center flex-grow-1">Delete page
        “{dialogState.itemToRemove && dialogState.itemToRemove.name}” from Fast Access</div>} onClose={toggleDialog}>
        <div className="text-center">Are you sure?</div>
        <DialogActionsBar>
          <button className="k-button k-secondary k-btn-rounded" onClick={toggleDialog}>
            <span className="px-3">Cancel</span>
          </button>
          <button className="k-button k-primary k-btn-rounded" onClick={removeItem}>
            <span className="px-3">Delete</span>
          </button>
        </DialogActionsBar>
      </Dialog>
    )}
  </>
}
// }