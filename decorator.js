class Main {
    constructor() {

        this.run();
    }

    run() {
        const superDragon = new SuperDragon(new Dragon());
        superDragon.setView("VIEW DRAGON");

        superDragon.health = 100;
        superDragon.damage(50);
    }
}

class Dragon {
    constructor() {
        this._view = null;
        this._power = null
        this._health = null;
    }

    set health(value) {
        this._health = value;
    }
    get health() {
        return this._health;
    }

    addHealth(value) {
        this._health += value;
    }

    setView(view) {
        this._view = view;
    }

    attack(enemy) {
        enemy.damage(this._power);
    }

    damage(damagePower) {
        this._health -= damagePower;

        console.log(this._health);
        console.log(this._view);
    }
}

class SuperDragon {
    constructor(dragon) {
        this._dragon = dragon;
        this._bonusProtected = 0.75;
        this._bonusHealth = 1.25; 
        this._superPower = 100;
    }

    set health(value) {
        this._dragon.health = value * this._bonusHealth;
    }
    get health() {
        return this._dragon.health;
    }

    addHealth(value) {
        this._dragon.addHealth(value * this._bonusHealth);
    }

    setView(view) {
        this._dragon.setView(view);
    }

    attack(enemy) {
        this._dragon.attack(enemy);
    }

    damage(damagePower) {
        this._dragon.damage(damagePower * this._bonusProtected);
    }

    specialAttack(enemy) {
        enemy.damage(this._superPower);
    }
}

const main = new Main();