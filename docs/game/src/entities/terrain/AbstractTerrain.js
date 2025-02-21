import AbstractEntity from "../AbstractEntity";

export default class AbstractTerrain extends AbstractEntity {
    constructor(data, levelIndex) {
        super();
        this.data = data;
        this.levelIndex = levelIndex;
    }
}