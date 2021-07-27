import React from "react";
import { APPLICATION_CONTEXT, IApplicationContext } from "../context/IApplicationContext";
import { PageTemplateDTO } from "../models/PageTemplateDTO";
import { TemplatesService } from "../store/TemplatesService";

interface ITemplatesManagerProps {
    baseUrl: string;
}

interface ITemplatesManagerState {
    items: PageTemplateDTO[];
}

export class TemplatesManager extends React.Component<ITemplatesManagerProps, ITemplatesManagerState> {
    store: TemplatesService;

    constructor(props: ITemplatesManagerProps) {
        super(props);
        this.store = new TemplatesService(props.baseUrl);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        let context = this.context as IApplicationContext;
        context.displayLoadingScreen();
        this.store.get()
            .then(items => {
                this.setState({ items });
                context.hideLoadingScreen();
            })
            .catch(context.contextController.setError)
    }

    render() {
        return (
            React.createElement('div', { style: { display: 'flex', flexDirection: 'column' } },
                // TODO: real link
                React.createElement('a', { href: '/new/item' }, 'Новый шаблон'),
                React.createElement('ul', {},
                    React.Children.toArray(this.state.items.map(item =>
                        React.createElement('li', {},
                            // TODO: real link
                            React.createElement('a', { href: `/to/item/${item.id}` }, item.name),
                        )
                    ))
                )
            )
        );
    }
}

TemplatesManager.contextType = APPLICATION_CONTEXT;