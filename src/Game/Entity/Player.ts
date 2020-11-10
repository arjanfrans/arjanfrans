import {Actor, ActorArgs, CollisionType, Engine, Input} from "excalibur";
import { PlayerView } from "../PlayerView";

export class Player extends Actor {
    get direction(): string {
        return this._direction;
    }

    private readonly speed: number = 100;
    public static DIRECTION_UP: string = "up";
    public static DIRECTION_DOWN: string = "down";
    public static DIRECTION_RIGHT: string = "right";
    public static DIRECTION_LEFT: string = "left";

    private _direction: string = Player.DIRECTION_DOWN;

    constructor(
        private engine: Engine,
        config: ActorArgs,
        public view?: PlayerView
    ) {
        super({
            ...config,
            collisionType: CollisionType.Active,
        });
    }

    draw(ctx: CanvasRenderingContext2D, delta: number) {
        if (this.view) {
            this.view?.update();
        }

        super.draw(ctx, delta);
    }

    public update(engine: Engine, delta: number) {
        if (engine.input.keyboard.isHeld(Input.Keys.Up)) {
            this.vel.y = -this.speed;
            this._direction = Player.DIRECTION_UP;
        } else if (engine.input.keyboard.wasReleased(Input.Keys.Up)) {
            this.vel.y = 0;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.Down)) {
            this.vel.y = this.speed;
            this._direction = Player.DIRECTION_DOWN;
        } else if (engine.input.keyboard.wasReleased(Input.Keys.Down)) {
            this.vel.y = 0;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
            this.vel.x = this.speed;
            this._direction = Player.DIRECTION_RIGHT;
        } else if (engine.input.keyboard.wasReleased(Input.Keys.Right)) {
            this.vel.x = 0;
        }

        if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
            this.vel.x = -this.speed;
            this._direction = Player.DIRECTION_LEFT;
        } else if (engine.input.keyboard.wasReleased(Input.Keys.Left)) {
            this.vel.x = 0;
        }

        super.update(engine, delta);
    }
}
