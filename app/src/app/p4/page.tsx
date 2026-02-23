import React from 'react';
import P4RadioPlayer from '@/components/p4-radio-player';

export const metadata = {
    title: 'Sveriges Radio P4 | Beredskapsplan',
    description: 'Lyssna på Sveriges Radio P4 (Beredskapskanalen) i händelse av kris eller krig.',
};

export default function P4Page() {
    return (
        <main className="min-h-screen pt-24 pb-16 bg-[#1A2F2D] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Sveriges Radio P4</h1>
                    <p className="text-zinc-400">
                        Sveriges Radio P4 är Sveriges beredskapskanal. I händelse av kris eller krig är det här du får viktig information från myndigheter.
                    </p>
                </div>

                <P4RadioPlayer />
            </div>
        </main>
    );
}
