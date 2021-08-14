import React, { useState, useEffect, useCallback } from "react"
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout"


function Title(props) {
    return (
        <span className="PageNavTabs--tab d-flex align-items-center">
            <span className="text">{props.content}</span>
            {props.length > 1
                ? <span className="remove"
                    onClick={(e) => {
                        e.stopPropagation()
                        props.onTabRemove(props.content)
                    }}><span className="icon-times" /></span>
                : null
            }
        </span>
    )
}

function PageNav(props) {

    // const history = useHistory()
    const [selected, setSelected] = useState(0)
    const [tabs, setTabs] = useState(props.data.filter(tab => tab.visible))

    const removeTab = tab => {
        const newTabs = tabs.map(item => {
            if (item.title === tab) item.visible = false
            return item
        }).filter(tab => tab.visible)
        setTabs(newTabs)
        // history.push(newTabs[newTabs.length - 1].uri)
    }

    const removeAll = () => {
        const newTab = tabs[selected]
        setTabs([newTab])
    }

    const addTab = useCallback(pathname => {
        // const index = data.findIndex(tab => tab.uri === pathname)
        let newTabs = tabs
        // if (index >= 0) {
        //     if (tabs.findIndex(tab => tab.uri === pathname) < 0) {
        //         const newTab = data[index]
        //         if (pathname !== "/") {
        //             newTab.visible = true
        //             newTabs = [...tabs, newTab]
        //         }
        //         setTabs(newTabs)
        //         return newTabs.length - 1
        //     }
        // }
        return -1
    }, [tabs])

    const selectTab = useCallback(pathname => {
        let index = addTab(pathname)
        if (index < 0) index = tabs.findIndex(tab => tab.uri === pathname)
        setSelected(index)
    }, [tabs, addTab])

    useEffect(() => {
        // selectTab(history.location.pathname)
        // const listener = history.listen(({ pathname }) => selectTab(pathname))
        // return () => listener()
    }, [history, selectTab])

    const handleSelect = (e) => {
        setSelected(e.selected)
        const uri = tabs[e.selected] ? tabs[e.selected].uri : "/"
        // history.push(uri)
    }

    return selected < 0
        ? props.children
        : <>
            {props.children}
            <div className="PageNav d-flex justify-content-between align-items-stretch">
                <TabStrip selected={selected} onSelect={handleSelect} className="PageNavTabs flex-grow-1">
                    {tabs.map(item => item.visible && <TabStripTab
                        title={<Title content={item.title} onTabRemove={removeTab} length={tabs.length} />}
                        key={item.id}
                        disabled={false}
                        contentClassName="k-hidden"
                        children={null}
                    />
                    )}
                </TabStrip>
                {tabs.length > 1
                    ? <div className="PageNav--buttons-group d-flex justify-content-end align-items-center pl-3">
                        <button className="k-button" onClick={removeAll}>Clear all</button>
                    </div>
                    : null
                }
            </div>
        </>
}

export default PageNav