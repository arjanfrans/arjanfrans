import {Actor} from "excalibur";
import {Player} from "../Entity/Player";

interface IObject {
    gid: number;
    height: number;
    id: number;
    name: string;
    rotation: number;
    type: string;
    visible: boolean
    width: number;
    x: number;
    y: number;
}

interface ILayer {
    name: string;
    type: string;
    objects?: Array<IObject>
}

export class MapData {
    public static OBJECT_LAYER: string = 'objectgroup';
    public static TILE_LAYER: string = 'tilelayer';
    public readonly layers: Map<string, ILayer> = new Map<string, ILayer>()

    constructor(private data: any) {
        for (const layerData of data.layers) {
            this.layers.set(layerData.name, layerData);
        }
    }

    public getLayer(name: string): ILayer|null
    {
        const layer = this.layers.get(name);

        return layer ? layer : null;
    }

    public getActors(): Array<Actor>
    {
        const actors = [];

        for (const layer of this.layers.values()) {
            console.log(layer)
            if (layer.type === MapData.OBJECT_LAYER && layer.objects) {
                for (const object of layer.objects) {
                    if (object.type === 'Player') {
                        const actor = new Player({
                            x: object.x,
                            y: object.y
                        });

                        actors.push(actor);
                    }
                }
            }
        }

        return actors;
    }
}
