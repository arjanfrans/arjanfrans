import { Player } from "./Entity/Player";
import { Animation, Engine, Sprite, SpriteSheet, Texture } from "excalibur";

export class PlayerView {
    private readonly upAnimation?: Animation;
    private readonly leftAnimation?: Animation;
    private readonly rightAnimation?: Animation;
    private readonly downAnimation?: Animation;
    private readonly idleDownSprite: Sprite;
    private readonly idleUpSprite: Sprite;
    private readonly idleLeftSprite: Sprite;
    private readonly idleRightSprite: Sprite;
    private static ANIMATION_SPEED = 100;

    constructor(
        private readonly engine: Engine,
        private readonly player: Player,
        private texture: Texture
    ) {
        const spriteSheet = new SpriteSheet(this.texture, 3, 4, 16, 16);

        this.downAnimation = spriteSheet.getAnimationByIndices(
            this.engine,
            [0, 1, 2],
            PlayerView.ANIMATION_SPEED
        );
        this.leftAnimation = spriteSheet.getAnimationByIndices(
            this.engine,
            [3, 4, 5],
            PlayerView.ANIMATION_SPEED
        );
        this.rightAnimation = spriteSheet.getAnimationByIndices(
            this.engine,
            [6, 7, 8],
            PlayerView.ANIMATION_SPEED
        );
        this.upAnimation = spriteSheet.getAnimationByIndices(
            this.engine,
            [9, 10, 11],
            PlayerView.ANIMATION_SPEED
        );
        this.idleDownSprite = spriteSheet.getSprite(1);
        this.idleLeftSprite = spriteSheet.getSprite(4);
        this.idleRightSprite = spriteSheet.getSprite(7);
        this.idleUpSprite = spriteSheet.getSprite(10);

        this.player.addDrawing("up", this.upAnimation);
        this.player.addDrawing("left", this.leftAnimation);
        this.player.addDrawing("right", this.rightAnimation);
        this.player.addDrawing("down", this.downAnimation);
        this.player.addDrawing("idleUp", this.idleUpSprite);
        this.player.addDrawing("idleDown", this.idleDownSprite);
        this.player.addDrawing("idleRight", this.idleRightSprite);
        this.player.addDrawing("idleLeft", this.idleLeftSprite);

        this.player.setDrawing("idleDown");
    }

    public update(): void {
        if (this.player.vel.x > 0) {
            this.player.setDrawing("right");
        } else if (this.player.vel.x < 0) {
            this.player.setDrawing("left");
        } else if (this.player.vel.y > 0) {
            this.player.setDrawing("down");
        } else if (this.player.vel.y < 0) {
            this.player.setDrawing("up");
        } else {
            if (this.player.direction === Player.DIRECTION_UP) {
                this.player.setDrawing("idleUp");
            } else if (this.player.direction === Player.DIRECTION_DOWN) {
                this.player.setDrawing("idleDown");
            } else if (this.player.direction === Player.DIRECTION_LEFT) {
                this.player.setDrawing("idleLeft");
            } else {
                this.player.setDrawing("idleRight");
            }
        }
    }
}
