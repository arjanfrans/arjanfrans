import * as ex from 'excalibur'
import {Loader} from 'excalibur'
import React from "react";
import {World} from "./World";
import {TiledResource} from "@excaliburjs/excalibur-tiled";

export class Game extends React.Component<{}, {}>{
    public async componentDidMount(): Promise<void>
    {
        const engine = new ex.Engine({
            width: 800,
            height: 600,
            canvasElementId: 'game',
        });

        const world = new World(engine);
        const map = new TiledResource("/assets/maps/level1.json");
        const loader = new Loader([map]);

        world.init();

        await engine.start(loader);

        const tileMap = map.getTileMap();

        engine.add(tileMap);
    }

    public render(): React.ReactNode
    {
        return <canvas id="game"/>
    }
}
