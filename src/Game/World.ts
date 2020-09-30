import { Engine, Loadable, SpriteSheet, Texture } from "excalibur";
import { TiledResource } from "@excaliburjs/excalibur-tiled";
import { MapParser } from "./TiledMap/MapParser";
import { PlayerView } from "./PlayerView";

export class World {
    private readonly level1: TiledResource;
    private readonly spriteSheets: Map<string, SpriteSheet> = new Map<
        string,
        SpriteSheet
    >();
    private readonly playerTexture: Texture;

    constructor(private engine: Engine) {
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

        player.view = new PlayerView(this.engine, player, this.playerTexture);

        this.engine.add(player);

        for (const collisionActor of mapParser.getCollisionActors()) {
           this.engine.add(collisionActor);
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
