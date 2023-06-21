import { injectable, inject, Container, decorate } from "inversify";
import "reflect-metadata";

const TYPES = {
  Katana: "Katana",
  Ninja: "Ninja",
  Shuriken: "Shuriken",
  Blowgun: "Blowgun",
};

class Blowgun {
  public blow() {
    return "poison!";
  }
}

class Katana {
  public hit() {
    return "cut!";
  }
}

class Shuriken {
  public throw() {
    return "hit!";
  }
}

class Ninja {
  public _katana: Katana;
  public _shuriken: Shuriken;
  public _blowgun!: Blowgun;

  public constructor(katana: Katana, shuriken: Shuriken) {
    this._katana = katana;
    this._shuriken = shuriken;
  }
  public fight() {
    return this._katana.hit();
  }
  public sneak() {
    return this._shuriken.throw();
  }
  public poisonDart() {
    return this._blowgun.blow();
  }

  public set blowgun(blowgun: Blowgun) {
    this._blowgun = blowgun;
  }
}

decorate(injectable(), Katana);
decorate(injectable(), Shuriken);
decorate(injectable(), Ninja);
decorate(injectable(), Blowgun);
decorate(inject(TYPES.Katana), Ninja, 0);
decorate(inject(TYPES.Shuriken), Ninja, 1);
decorate(inject(TYPES.Blowgun), Ninja.prototype, "blowgun");

const container = new Container();
container.bind<Ninja>(TYPES.Ninja).to(Ninja);
container.bind<Katana>(TYPES.Katana).to(Katana);
container.bind<Shuriken>(TYPES.Shuriken).to(Shuriken);
container.bind<Blowgun>(TYPES.Blowgun).to(Blowgun);

const ninja = container.get<Ninja>(TYPES.Ninja);

console.log(ninja.fight()); // true
console.log(ninja.sneak()); // true
console.log(ninja.poisonDart());
