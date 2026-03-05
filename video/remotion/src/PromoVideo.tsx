import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import React from "react";

const scenes = [
    {
        id: 'dashboard',
        audio: 'en_dashboard.mp3',
        image: 'dashboard.png',
        duration: 300,
    },
    {
        id: 'action_cards',
        audio: 'en_action_cards.mp3',
        image: 'action_cards.png',
        duration: 300,
    },
    {
        id: 'communication',
        audio: 'en_communication.mp3',
        image: 'communication.png',
        duration: 270,
    },
    {
        id: 'bia',
        audio: 'en_bia.mp3',
        image: 'bia.png',
        duration: 240,
    },
    {
        id: 'sms_kris',
        audio: 'en_sms.mp3',
        image: 'sms_kris.png',
        duration: 270,
    }
];

const SceneComponent: React.FC<{ scene: any }> = ({ scene }) => {
    const frame = useCurrentFrame();

    // Calm transition: subtle crossfade in and out
    const opacity = interpolate(
        frame,
        [0, 30, scene.duration - 30, scene.duration],
        [0, 1, 1, 0],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );

    // Very subtle purely horizontal/vertical pan to keep it calm and true to the app
    // We'll just do a very slight scale so it doesn't feel completely static, but barely noticeable
    const scale = interpolate(frame, [0, scene.duration], [1.0, 1.02], { extrapolateRight: "clamp" });

    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <AbsoluteFill style={{ opacity }}>
                <Img
                    src={staticFile(`screenshots/${scene.image}`)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain', // Show the whole app UI cleanly without cutting edges
                        transform: `scale(${scale})`,
                    }}
                />
            </AbsoluteFill>
            {scene.audio && <Audio src={staticFile(`audio/${scene.audio}`)} />}
        </AbsoluteFill>
    );
};

export const PromoVideo: React.FC = () => {
    let currentTime = 0;
    return (
        <AbsoluteFill style={{ backgroundColor: '#09090b' }}> {/* Dark background matching the app */}
            {scenes.map((scene) => {
                const start = currentTime;
                // Overlap scenes slightly for crossfade, except for the first one
                const startFrame = start === 0 ? 0 : start - 30;
                currentTime = start + scene.duration - 30; // Subtract crossfade overlap from next start
                return (
                    <Sequence key={scene.id} from={startFrame} durationInFrames={scene.duration}>
                        <SceneComponent scene={scene} />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};
