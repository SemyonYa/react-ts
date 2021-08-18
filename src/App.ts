import React from 'react';
import { RoutePartDTO } from './models/RoutePartDTO';
import { RouteParameterDTO } from './models/RouteParameterDTO';
import { Fake } from './models/Fake';
import { ILayoutProps } from './models/ILayoutProps';
import { MenuStore } from './models/MenuStore';
import { APPLICATION_CONTEXT, IApplicationContext } from './context/IApplicationContext';
import { Alignment, Direction, Markup } from './components/Markup';
import { Layout } from './components/Layout';
import { PopupWindow } from './components/PopupWindow';
import { IViewModelContext, VIEW_MODEL_CONTEXT } from './context/IViewModelContext';
import { DataBindingEditor } from './components/_DataBindingEditor.ts/DataBindingEditor';
import { TemplateStore } from './store/TemplateStore';
import { ConditionObjectStore } from './store/ConditionObjectStore';
import { ConditionParameterStore } from './store/ConditionPrameterStore';
import { TestBinding } from './components/_DataBindingEditor.ts/Test';

interface IAppState {
  expression: string;
  pageNumber: number;
  modalShown: boolean;
}

export class App extends React.PureComponent<{}, IAppState> {
  private applicationContext: IApplicationContext;
  private viewModelContext: IViewModelContext;
  fake: Fake;
  constructor(props: any) {
    super(props);
    this.applicationContext = {
      user: null,
      lastError: null,
      contextController: {
        setError: () => { } /* this.setError */
      },
      changePage: (id: any, parameters: any) => {
        console.log(id, parameters);
      }, /* this.beginLoadingPageId */
      displayLoadingScreen: () => { console.log('displayLoadingScreen'); },
      hideLoadingScreen: () => { console.log('hideLoadingScreen'); }
    }

    this.viewModelContext = {
      data: {},
      getExpression: (expression: string) => { },
      getValue: (valuePath: string) => { },
      contextController: {
        updateModel: (model: any) => { },
        updateValue: (path: string, value: any) => { },
        executeMethod: (name: string) => {
          console.log('executeMethod', name);
        },
      }
    };
    // this.fake = new Fake();
    this.state = {
      expression: '( 1 + age ) > 34',
      pageNumber: 1,
      modalShown: false
    };
  }

  private showModal = () => {
    this.setState({ modalShown: true });
  }

  private hideModal = () => {
    this.setState({ modalShown: false });
  }

  render() {
    return (
      React.createElement(APPLICATION_CONTEXT.Provider, { value: this.applicationContext },
        React.createElement(VIEW_MODEL_CONTEXT.Provider, { value: this.viewModelContext },
          React.createElement(Layout, { pageId: 0, menuStore: new MenuStore('http://') },
            React.createElement(Markup, { alignment: Alignment.SpaceAround, direction: Direction.Column },
              // React.createElement(TestBinding)
              React.createElement(DataBindingEditor, {
                templateStore: new TemplateStore('https://'),
                conditionObjectStore: new ConditionObjectStore(),
                conditionParameterStore: new ConditionParameterStore()
              })
            )
          )
        ),
        // React.createElement(Layout, { pageId: 0, menuStore: new MenuStore('http://') },
        //   React.createElement(Markup, { alignment: Alignment.SpaceAround, direction: Direction.Column },
        //     React.createElement(Markup, { alignment: Alignment.SpaceAround, direction: Direction.Row },
        //       React.createElement('div', { style: { backgroundColor: '#E5EDF5', borderRadius: '4px', boxShadow: 'inset 0px 2px 4px 0 rgba(0, 0, 0, .15)', padding: '25px', marginRight: '40px' } }, this.lorem1),
        //       React.createElement('div', { style: { backgroundColor: '#E5EDF5', borderRadius: '4px', boxShadow: 'inset 0px 2px 4px 0 rgba(0, 0, 0, .15)', padding: '25px' } }, this.lorem2),
        //     ),
        //     React.createElement('h2', {}, 'My calculation session'),
        //     React.createElement('div', { style: { margin: '10px 0' } },
        //       React.createElement(DropDownList, { store: new ListStore(), isTable: false })
        //     ),
        //     React.createElement('div', { style: { margin: '10px 0' } },
        //       React.createElement('button', { onClick: this.showModal }, 'SHOW MODAL')
        //     ),
        //     React.createElement('div', { style: { backgroundColor: '#E5EDF5', borderRadius: '4px', boxShadow: 'inset 0px 2px 4px 0 rgba(0, 0, 0, .15)', padding: '25px' } }, this.lorem1),
        //     React.createElement('h2', {}, 'Other calculation sessions'),
        //     React.createElement('div', { style: { margin: '10px 0' } },
        //       React.createElement(ToggleButton, { model: new Fake(), method: 'toggle', text: 'toggle' },)
        //     ),
        //     React.createElement('div', {},
        //       React.createElement(Checkbox, { onChange: (value) => { console.log(value) } }),
        //       React.createElement('span', {}, 'I\'m  God')
        //     ),
        //     React.createElement('div', { style: { backgroundColor: '#E5EDF5', borderRadius: '4px', boxShadow: 'inset 0px 2px 4px 0 rgba(0, 0, 0, .15)', padding: '25px' } }, this.lorem2),
        //     React.createElement(VIEW_MODEL_CONTEXT.Provider, { value: this.viewModelContext },
        //       React.createElement(SubmitButton, { text: 'text', method: 'method' })
        //     )
        //   )
        // ),
        this.state.modalShown
          ? React.createElement(PopupWindow, { onClose: this.hideModal },
            React.createElement('h3', {}, 'Modal title'),
            React.createElement('p', {}, this.lorem2),
            React.createElement('p', {}, this.lorem1),
            React.createElement('p', {}, this.lorem2),
            React.createElement('p', {}, this.lorem1),
            React.createElement('p', {}, this.lorem2),
            React.createElement('p', {}, this.lorem2),
            React.createElement('p', {}, this.lorem2),
            React.createElement('p', {}, this.lorem2),
            React.createElement('p', {}, this.lorem2),
            React.createElement('p', {}, this.lorem2),
          )
          : null
        // React.createElement(MenusManager, { baseUrl: '' })
        // React.createElement(RouteViewer2, { sectionComponentConfiguration: { baseUrl: 'qweqwe' } })
        // React.createElement(MenuEditor)
        // React.createElement(RouteViewer, { sectionComponentConfiguration: {} })
        // React.createElement(MainMenuEditor, {})
      )
    );

    // // ADMIN TEMPLATE
    // return React.createElement(AdminTemplate, this._layoutProps,

    //   // ROUTE EDITOR
    //   React.createElement('h1', {}, 'RouteEditor'),
    //   React.createElement(RouteEditor, {
    //     route: this._fakes,
    //     onChange: this.onRouteChange.bind(this),
    //   }),

    //   // EXPRESSION BUILDER
    //   React.createElement('h1', {}, 'Expression Builder'),
    //   React.createElement(ExpressionBuilder, { expression: this.state.expression, viewModel: this.fake, onExpressionChanged: this.onExpressionChanged.bind(this), }),
    //   React.createElement('div', {}, this.state.expression),

    //   // ROUTE VIEW
    //   React.createElement(RouteViewer, { sectionComponentConfiguration: null })
    //   // React.createElement(Pagination, { onChange: this.changePage, pageQty: 10, pageNumber: this.state.pageNumber })
    // );


    // return React.createElement('div', { className: 'wrapper' },
    //   // ROUTE EDITOR
    //   React.createElement('h1', {}, 'RouteEditor'),
    //   React.createElement(RouteEditor, {
    //     route: this._fakes,
    //     onChange: this.onRouteChange.bind(this),
    //   }),

    //   // EXPRESSION BUILDER
    //   React.createElement('h1', {}, 'Expression Builder'),
    //   React.createElement(ExpressionBuilder, { expression: this.state.expression, viewModel: this.fake, onExpressionChanged: this.onExpressionChanged.bind(this), }),
    //   React.createElement('div', {}, this.state.expression)
    // );
  }

  // ROUTE VIEW
  // changePage = (page: number) => {
  //   this.setState({ pageNumber: page })
  // }

  // ADMIN TEMPLATE
  get _layoutProps(): ILayoutProps {
    return { pageId: 123, menuStore: new MenuStore('#') };
  }

  // ROUTE EDITOR
  get _fakes(): RoutePartDTO {
    return {
      name: 'qwe',
      parameter: { isMandatory: true, parameterType: 0 } as RouteParameterDTO,
      childRoutPart: {
        name: 'rty',
        parameter: { isMandatory: true, parameterType: 0 } as RouteParameterDTO,
        childRoutPart: {
          name: 'tuy',
          parameter: { isMandatory: true, parameterType: 0 } as RouteParameterDTO,
        } as RoutePartDTO,
      } as RoutePartDTO,
    } as RoutePartDTO;
  }

  onRouteChange(parts: RoutePartDTO) {
    console.log(parts);
  }


  // EXPRESSION BUILDER
  onExpressionChanged(expression: string) {
    this.setState({ expression });
  }

  private lorem1 = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quasi accusamus, exercitationem perferendis cum excepturi
    blanditiis aperiam iusto, culpa tempora sapiente earum. Necessitatibus consequuntur, est sit natus temporibus assumenda
    exercitationem?
  `;

  private lorem2 = `
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi earum aspernatur inventore tempora eum! Qui fugit
    corporis voluptatibus alias at totam exercitationem et doloribus, libero nihil. Sequi dolorem odio magni. \n
    Assumenda tempora perspiciatis deserunt dolor esse voluptatum quos rem, doloribus excepturi molestiae non nulla
    repellendus nesciunt iste voluptates accusamus quo, minima id in sunt. Alias molestias asperiores possimus doloribus
    mollitia.
  `;
}