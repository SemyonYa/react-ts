import React from "react";

interface IPopupWindowProps {
    onClose(): void;
}

export class PopupWindow extends React.Component<IPopupWindowProps> {

    componentDidMount() {
        document.querySelector('body').style.overflow = 'hidden';
    }

    private backgroundCLick = (e: React.MouseEvent) => {
        if (e.target['id'] === 'popup-window-background') {
            this.close();
        }
    }

    private close = () => {
        document.querySelector('body').style.overflow = 'hidden auto';
        this.props.onClose();
    }

    render() {
        return [
            React.createElement('div', { onClick: this.backgroundCLick, key: 'back', style: this.styles.back, id: 'popup-window-background' },
                React.createElement('div', { key: 'modal', style: this.styles.modal },
                    React.createElement('div', { style: this.styles.modalBody }, this.props.children),
                    React.createElement('button', { onClick: this.close, style: this.styles.closeBtn }, 'close')
                )
            ),
        ];
    }

    private styles: any = {
        back: {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.24)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: '40px 20%',
            overflowY: 'auto'
        },
        modal: {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
        },
        modalBody: {
            flex: '1 1 0',
        },
        closeBtn: {
            border: 'none',
            backgroundColor: 'transparent',
            alignSelf: 'flex-end',
            padding: '10px'
        }
    }
}