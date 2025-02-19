class AbstractItem extends AbstractEntity {
    // properties
    x;
    y;
    type;
    effect;
    // constructor
    constructor(x, y, type, effect) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.effect = effect;
    }
}