import {Engine, Loadable} from "excalibur";
import {TiledResource} from "@excaliburjs/excalibur-tiled";
import {MapData} from "./TiledMap/MapData";

export class World {
    private readonly level1: TiledResource;

    constructor(private engine: Engine) {
        this.level1 = new TiledResource("/assets/maps/level1.json");
    }

    public init(): void {
        const tileMap = this.level1.getTileMap();

        this.loadObjectLayer();

        this.engine.add(tileMap);
    }

    private loadObjectLayer(): void
    {
        const data = this.level1.getData();

        const mapData = new MapData(data);

        const actors = mapData.getActors();

        for (const actor of actors) {
            this.engine.add(actor);
        }
    }

    public getLoadableResources(): Array<Loadable>
    {
        return [
            this.level1
        ]
    }
}
