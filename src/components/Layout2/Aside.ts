import React, { useState } from "react";
import logo from '../../assets/logo.svg';
import { AsideFastAccess } from "./AsideFastAccess";
import { AsideLanguage } from "./AsideLanguage";
import { AsideMenu } from "./AsideManu";
import { Notification } from "@progress/kendo-react-notification"


function Aside() {
    const [notification, setNotification] = useState(null)
    const notificationState = { notification, setNotification }
    return (
        React.createElement(
            "aside",
            {
                className: "Aside d-flex flex-column justify-content-between align-items-stretch flex-grow-1 flex-shrink-0 vh-100"
            },
            React.createElement(
                "div",
                { className: "Aside--logo mb-5" },
                React.createElement("img", { src: logo, alt: "EuroChem" })
            ),
            React.createElement(
                "div",
                { className: "Aside--item mb-5" },
                React.createElement('a', { href: "#" },
                    React.createElement("span", { className: "icon-home mr-3" }),
                    React.createElement("span", null, "Home")
                )
            ),
            React.createElement(AsideMenu, null),
            React.createElement(AsideFastAccess, notificationState),
            React.createElement(AsideLanguage, null),
            notification && React.createElement(
                "div",
                { className: "AsideNotification", style: { top: top } },
                React.createElement(
                    Notification,
                    {
                        type: { style: "none", icon: false },
                        closable: true,
                        onClose: function onClose() {
                            return setNotification(null);
                        },
                        style: { overflow: "visible" }
                    },
                    " ",
                    React.createElement(
                        "span",
                        null,
                        notification
                    ),
                    " "
                )
            )
        ));
}


export default Aside;