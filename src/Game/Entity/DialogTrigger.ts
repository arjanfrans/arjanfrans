import {Actor, CollisionEndEvent, CollisionStartEvent, CollisionType, Engine, ScreenElement} from "excalibur";
import {ActorArgs} from "excalibur/dist/Actor";
import {Player} from "./Player";

export class DialogTrigger extends Actor {
    constructor(private dialogView: ScreenElement, config?: ActorArgs) {
        super(config);

        this.body.collider.type = CollisionType.Passive;
        this.on('collisionstart', (event: CollisionStartEvent) => {
            if (event.other instanceof Player) {
                this.dialogView.visible = true;
            }
        });

        this.on('collisionend', (event: CollisionEndEvent) => {
            if (event.other instanceof Player) {
                this.dialogView.visible = false;
            }
        });
    }

    onInitialize(_engine: Engine) {

    }
}
