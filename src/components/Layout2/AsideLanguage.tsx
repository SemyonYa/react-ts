import React, { useState } from "react";
import { lang } from "../../store/lang-data";

export function AsideLanguage() {

    const [data, setData] = useState(lang.find(item => item.isSelected))
    const [change, setChange] = useState(false)

    const toggleChange = () => {
        setChange(!change)
    }

    const selectLang = item => {
        setData(item)
        setChange(false)
    }

    return <div className="AsideLanguage pb-4">
        <div className="AsideTitle">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="AsideTitle--title text-uppercase font-weight-bold">Language</div>
                <div className="AsideTitle--tools">
                    <span className={`icon-params${change && " text-white"}`} onClick={toggleChange} >toggle</span>
                </div>
            </div>
        </div>
        {!change && <div className="Aside--item">
            <span className="icon-globe mr-3" />
            <span>{data.title}</span>
        </div>}
        {change && <div className="AsideLanguage--wrapper py-3">
            {lang.map(item => <div className="Aside--item" onClick={() => selectLang(item)}>
                <span className="text">{item.title}</span>
            </div>
            )}
        </div>}
    </div>
}
