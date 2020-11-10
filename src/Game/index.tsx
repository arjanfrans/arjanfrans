import * as ex from 'excalibur'
import {Loader} from 'excalibur'
import React from "react";
import {World} from "./World";
import {CONFIG} from "../config";

export class Game extends React.Component<{}, {}>{
    public async componentDidMount(): Promise<void>
    {
        const engine = new ex.Engine({
            width: 800,
            height: 600,
            canvasElementId: 'game',
        });

        const world = new World(engine, CONFIG);
        const loader = new Loader(world.getLoadableResources());

        await engine.start(loader);

        world.init();
    }

    public render(): React.ReactNode
    {
        return <canvas id="game"/>
    }
}
