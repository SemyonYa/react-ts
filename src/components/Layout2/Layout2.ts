import React from "react";

export class Layout2 extends React.Component {
    render() {
        return (
            React.createElement(
                "div",
                { className: "App d-flex justify-content-between align-items-stretch" },
                // React.createElement(Router, null,
                React.createElement(Aside, null),
                React.createElement(
                    "main",
                    { className: "flex-grow-0 flex-shrink-1 vh-100 position-relative" },
                    React.createElement(
                        "div",
                        { className: "wrapper p-5 d-flex flex-column align-items-stretch justify-content-between min-vh-100" },
                        React.createElement(PageNav, null,
                            React.createElement(Header, null)
                        ),
                        React.createElement("div", null)
                    )
                )
                // )
            );
        );
    }
}