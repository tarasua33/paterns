class Main {
    constructor() {
        this.run();
    }

    run() {
        const sing1 = Singleton.GetInstace();
        const sing2 = Singleton.GetInstace();
        const sing3 = Singleton.GetInstace();

        console.log(Singleton.CountInstance);
    }
}

class Singleton {
    static Instance = null;
    static CountInstance = 0;
    
    static AddContInstance() {
        Singleton.CountInstance++;
    }

    static GetInstace() {
        if (Singleton.Instance) return Singleton.Instance;
        else return new Singleton();
    }

    constructor() {
        this._someDoing();

        Singleton.Instance = this;
        Singleton.AddContInstance();
    }

    _someDoing() {
        console.log("create Instance");
    }
}

const main = new Main();