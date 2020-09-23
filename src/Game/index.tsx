import * as ex from 'excalibur'
import React from "react";
import {World} from "./World";

export class Game extends React.Component<{}, {}>{
    public async componentDidMount(): Promise<void>
    {
        const engine = new ex.Engine({
            width: 800,
            height: 600,
            canvasElementId: 'game',
        });

        const world = new World(engine);

        world.init();

        await engine.start();
    }

    public render(): React.ReactNode
    {
        return <canvas id="game"/>
    }
}
