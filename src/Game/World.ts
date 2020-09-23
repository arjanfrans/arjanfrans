import {Engine} from "excalibur";
import {Player} from "./Entity/Player";

export class World {
    private readonly player: Player;

    constructor(private engine: Engine) {
        this.player = new Player();
    }

    public init(): void
    {
        this.engine.add(this.player);
    }
}
