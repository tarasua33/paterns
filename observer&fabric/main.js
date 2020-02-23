class App {
    constructor(style) {
        this._container = null;
        this._factory = null;

        this._init(style);
    }

    _init(style) {
        const container = this._container = document.querySelector('#container');

        this._createNewFactory(style);
    }

    _createNewFactory(style) {
        const container = this._container;

        const factory = this._factory = CreatorFactory.GetFactory(style);
        
        const panel = factory.createPanel(container);
        panel.onFullButton.addOnce(() => {
            this._createNewFactory(++style % 3);
        });
        
        const title = factory.createTitle(container);

        setTimeout(() => {
            panel.addButton(new ParagraphWriter());
        }, 2000);
    }
}

class FactoryDefault {
    createPanel(container) {
        return new PanelDefault(container);
    }

    createTitle(container) {
        return new TitleDefault(container);
    }
}

class FactoryGreen extends FactoryDefault {
    createPanel(container) {
        return new PanelGreen(container);
    }

    createTitle(container) {
        return new TitleGreen(container);
    }
}

class FactoryPink extends FactoryDefault {
    createPanel(container) {
        return new PanelPink(container);
    }

    createTitle(container) {
        return new TitlePink(container);
    }
}

class PanelDefault {
    constructor(container) {
        this.onFullButton = new Observer();

        this._container = container;
        this._panelView = null;

        this._isPanelInit = false;

        this._buttons = [];

        this._init();
    }

    addButton(writer) {
        const ButtonConstructor = this._getButtonConstructor();
        const button = new ButtonConstructor(this._panelView);
        button.onClick.add(() => {
            this._clickButton();
        });
        button.initWriter(writer, this._buttons.length);
        this._buttons.push(button);
    }

    _init() {
        const panel = this._panelView = document.createElement('div');
        panel.classList.add("panel");

        this._container.appendChild(panel);
        this._addStylePanel();

        this._isPanelInit = true;
    }

    _clickButton() {
        if (this._buttons.length < 5) {
            this.addButton(new SpanhWriter());
        } else {
            this.onFullButton.dispatch();
        }
    }
    
    _addStylePanel() {
        this._panelView.classList.add("panel-default");
    }

    _getButtonConstructor() {
        return ButtonDefault;
    }
}

class PanelGreen extends PanelDefault {
    _addStylePanel() {
        this._panelView.classList.add("panel-green");
    }

    _getButtonConstructor() {
        return ButtonGreen;
    }
}

class PanelPink extends PanelDefault {
    _addStylePanel() {
        this._panelView.classList.add("panel-pink");
    }

    _getButtonConstructor() {
        return ButtonPink;
    }
}

class ButtonDefault {
    constructor(container) {
        this.onClick = new Observer();

        this._container = container;
        this._buttonView = null;

        this._init();
    }

    initWriter(writer, number) {
        this._writer = writer;
        writer.init(this._buttonView);
        writer.writeText(["it", " is", " button Number", ` ${number + 1}`]);
    }

    _init() {
        const button = this._buttonView = document.createElement('button');
        button.classList.add("btn");
        button.addEventListener("click", () => {
            this.onClick.dispatch();
        });

        this._container.appendChild(button);
        this._addStyle();
    }

    _addStyle() {
        this._buttonView.classList.add("btn-default");
    }
}

class ButtonGreen extends ButtonDefault {
    _addStyle() {
        this._buttonView.classList.add("btn-green");
    }
}

class ButtonPink extends ButtonDefault {
    _addStyle() {
        this._buttonView.classList.add("btn-pink");
    }
}

class TitleDefault {
    constructor(container) {
        this._container = container;
        this._view = null;

        this._init();
    }

    _init() {
        const title = this._view = document.createElement('h2');
        title.classList.add("title");
        title.innerText = "Title";

        this._container.appendChild(title);
        this._addStyle();
    }

    _addStyle() {
        this._view.classList.add("title-default");
    }
}

class TitleGreen extends TitleDefault {
    _addStyle() {
        this._view.classList.add("title-green");
    }
}

class TitlePink extends TitleDefault {
    _addStyle() {
        this._view.classList.add("title-pink");
    }
}

class Observer {
    constructor() {
        this._hendlers = [];
        this._hendlersOnce = [];
    }

    add(behavior) {
        this._hendlers.push(behavior);
    }

    addOnce(behavior) {
        this._hendlersOnce.push(behavior);
    }

    dispatch() {
        this._hendlers.forEach(h => h());

        while (this._hendlersOnce.length > 0) {
            const behavior = this._hendlersOnce.pop();
            
            behavior();
        }
    }
}

class CreatorFactory {
    static GetFactory(type) {
        if (type === STYLES.green) {
            return new FactoryGreen();
        } else if (type === STYLES.pink) {
            return new FactoryPink();
        } else {
            return new FactoryDefault();
        }
    }
}

class Writer {
    constructor(parent) {
        this._parent = parent;
    }

    init(parent) {
        this._parent = parent;
    }

    writeText(messages) {
        console.log(messages);
        for (let i = 0; i < messages.length; i++) {
            const paragrph = document.createElement(this._getTagName());
            paragrph.innerText = messages[i];
            console.log(paragrph);
            console.log(this._parent);

            this._parent.appendChild(paragrph);
        }
    }

    _getTagName() {
        return 'div';
    }
}

class ParagraphWriter extends Writer {
    _getTagName() {
        return 'p';
    }
}

class SpanhWriter extends Writer {
    _getTagName() {
        return 'span';
    }
}

const STYLES = {
    default: 0,
    green: 1,
    pink: 2
}

const applicatio = new App(STYLES.green);