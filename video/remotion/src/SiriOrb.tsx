import React from 'react';
import { AbsoluteFill } from 'remotion';

export const SiriOrb: React.FC = () => {
    return (
        <AbsoluteFill style={{ backgroundColor: 'black' }}>
            <div className="siri-container">
                <div className="siri-blob blob1"></div>
                <div className="siri-blob blob2"></div>
                <div className="siri-blob blob3"></div>
            </div>
        </AbsoluteFill>
    );
};
