import {Engine, Loadable, ScreenElement, SpriteSheet, Texture} from "excalibur";
import { TiledResource } from "@excaliburjs/excalibur-tiled";
import { MapParser } from "./TiledMap/MapParser";
import { PlayerView } from "./PlayerView";
import {ContactDialogView} from "./UI/ContactDialogView";
import {Config} from "../config";

export class World {
    private readonly level1: TiledResource;
    private readonly spriteSheets: Map<string, SpriteSheet> = new Map<
        string,
        SpriteSheet
    >();
    private readonly playerTexture: Texture;

    constructor(private engine: Engine, private config: Config) {
        this.level1 = new TiledResource("/assets/maps/level1.json");
        this.playerTexture = new Texture("/assets/characters/player.png");
    }

    public init(): void {
        const tileMap = this.level1.getTileMap();

        this.parseMap();

        this.engine.add(tileMap);
    }

    private parseMap(): void {
        const data = this.level1.getData();

        const mapParser = new MapParser(this.engine, data);
        const player = mapParser.getPlayer();

        const dialogViews = new Map<string, ScreenElement>();

        dialogViews.set('openContactDialog', new ContactDialogView(this.config.contact, 50, 50));

        const dialogTriggers = mapParser.getDialogTriggers(dialogViews);

        player.view = new PlayerView(this.engine, player, this.playerTexture);

        this.engine.add(player);

        for (const dialogView of dialogViews.values()) {
            this.engine.currentScene.add(dialogView);
        }

        for (const collisionActor of mapParser.getCollisionActors()) {
           this.engine.add(collisionActor);
        }

        for (const dialogTrigger of dialogTriggers) {
            this.engine.add(dialogTrigger);
        }
    }

    public getSpriteSheet(name: string): SpriteSheet | null {
        const spriteSheet = this.spriteSheets.get(name);

        return spriteSheet ? spriteSheet : null;
    }

    public getLoadableResources(): Array<Loadable> {
        return [this.level1, this.playerTexture];
    }
}
