class Main {
    constructor() {

        this.run();
    }

    run() {
        const holyArmyFactory = new FactoryHolyArmy();

        const holyUnit = holyArmyFactory.createUnit();
        holyUnit.attack();

        const holyHero = holyArmyFactory.createHero();
        holyHero.specialAbility();

        const evilArmyFactory = new FactoryHolyArmy();
        
        const evilUnit = evilArmyFactory.createUnit();
        evilUnit.attack();

        const evilHero = evilArmyFactory.createHero();
        evilHero.specialAbility();
    }
}

class AbstractFactory {
    constructor() {}

    createUnit() {}

    createHero() {}
}

class FactoryHolyArmy extends AbstractFactory {
    constructor() {
        super();
    }

    createUnit() {
        return new HolyUnit();
    }

    createHero() {
        return new HolyHero();
    }
}

class FactoryEvilArmy extends AbstractFactory {
    constructor() {
        super();
    }

    createUnit() {
        return new EvilUnit();
    }

    createHero() {
        return new EvilHero();
    }
}

class AbstractUnit {
    constructor() {}

    attack() {}

    damage() {}
}

class HolyUnit extends AbstractUnit {
    constructor() {
        super();
    }

    attack() {
        console.log("Holy Unit is attacking");
    }

    damage() {}
}

class EvilUnit extends AbstractUnit {
    constructor() {
        super();
    }

    attack() {
        console.log("Evil Unit is attacking");
    }

    damage() {}
}

class AbstractHero extends AbstractUnit {
    constructor() {
        super();
    }

    attack() {}

    damage() {}

    specialAbility() {}
}

class HolyHero extends AbstractHero {
    constructor() {
        super();
    }

    attack() {}

    damage() {}

    specialAbility() {
        console.log("Holy Hero Special attack");
    }
}

class EvilHero extends AbstractHero {
    constructor() {
        super();
    }

    attack() {}

    damage() {}

    specialAbility() {
        console.log("Evil Hero Special attack");
    }
}

const main = new Main();