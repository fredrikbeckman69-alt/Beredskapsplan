import { Composition } from "remotion";
import { PromoVideo } from "./PromoVideo";
import React from "react";
import "./style.css";

// scenes: intro 270 + dashboard 150 + action_cards 240 + communication 240 + bia_sms 270 + outro 120 = 1290 total frames @ 30fps
export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="BeredskapsplanPromo"
                component={PromoVideo}
                durationInFrames={1260}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
