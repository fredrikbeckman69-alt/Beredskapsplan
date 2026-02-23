'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio as RadioIcon, Play, Pause, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface SRChannel {
    id: number;
    name: string;
    image: string;
    color: string;
    tagline: string;
    liveaudio: {
        id: number;
        url: string;
    };
}

export default function P4RadioPlayer() {
    const [channels, setChannels] = useState<SRChannel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<SRChannel | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        async function fetchChannels() {
            try {
                const response = await fetch('https://api.sr.se/api/v2/channels?format=json&pagination=false');
                if (!response.ok) throw new Error('Failed to fetch SR channels');

                const data = await response.json();

                // Filter only P4 channels. All P4 channels seem to have 'channeltype' === 'Lokal kanal' 
                // and 'name' starting with 'P4' or containing 'P4'.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const p4Channels = data.channels.filter((c: any) =>
                    c.name && c.name.includes('P4') && c.channeltype === 'Lokal kanal'
                );

                // Sort by name alphabetically
                p4Channels.sort((a: SRChannel, b: SRChannel) => a.name.localeCompare(b.name));

                setChannels(p4Channels);

                // Default to P4 Riks or the first one available
                if (p4Channels.length > 0) {
                    const defaultChannel = p4Channels.find((c: SRChannel) => c.name.includes('Stockholm')) || p4Channels[0];
                    setSelectedChannel(defaultChannel);
                }
            } catch (err) {
                console.error(err);
                setError('Kunde inte ladda kanaler från Sveriges Radio.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchChannels();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // Ensure the src is set to the current channel before playing
                if (selectedChannel && audioRef.current.src !== selectedChannel.liveaudio.url) {
                    audioRef.current.src = selectedChannel.liveaudio.url;
                }
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                    }).catch(error => {
                        console.error('Audio playback failed:', error);
                        // Auto-play was prevented or an error occurred
                        setError('Kunde inte spela upp ljudet. Din webbläsare kan ha blockerat automatisk uppspelning.');
                        setIsPlaying(false);
                    });
                }
            }
        }
    };

    const handleChannelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const channelId = parseInt(e.target.value);
        const channel = channels.find(c => c.id === channelId);
        if (channel) {
            setSelectedChannel(channel);
            setIsPlaying(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = channel.liveaudio.url;

                // Optional: Auto-play when changing channel if it was already playing
                // we leave this explicit to user action to avoid browser blocking
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume > 0 && isMuted) {
            setIsMuted(false);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    if (isLoading) {
        return (
            <div className="bg-[#2B4645]/80 border border-[#3AA3E0]/10 rounded-3xl p-8 backdrop-blur-xl animate-pulse">
                <div className="h-6 w-1/3 bg-white/10 rounded mb-6"></div>
                <div className="h-4 w-full bg-white/5 rounded mb-4"></div>
                <div className="h-24 w-full bg-white/5 rounded"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-red-400 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3" />
                {error}
            </div>
        );
    }

    return (
        <div className="bg-[#2B4645]/80 border border-[#3AA3E0]/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
            {/* Visual background element based on channel color */}
            {selectedChannel && (
                <div
                    className="absolute top-0 right-0 w-64 h-64 opacity-20 blur-3xl rounded-full pointer-events-none transition-colors duration-1000"
                    style={{ backgroundColor: `#${selectedChannel.color}` }}
                />
            )}

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">

                {/* Left Side - Channel Info & Selection */}
                <div className="flex-1 w-full">
                    <div className="flex items-center mb-6">
                        <div className="p-3 bg-white/10 rounded-xl mr-4">
                            <RadioIcon className="w-6 h-6 text-[#3AA3E0]" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">Live Radio</h2>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="channel-select" className="block text-sm font-medium text-zinc-400 mb-2">
                            Välj lokal P4-kanal
                        </label>
                        <select
                            id="channel-select"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3AA3E0]/50 appearance-none"
                            value={selectedChannel?.id || ''}
                            onChange={handleChannelChange}
                        >
                            {channels.map((channel) => (
                                <option key={channel.id} value={channel.id}>
                                    {channel.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedChannel && (
                        <div className="flex items-start bg-black/20 p-4 rounded-xl border border-white/5">
                            {selectedChannel.image && (
                                <Image
                                    src={selectedChannel.image}
                                    alt={selectedChannel.name}
                                    width={64}
                                    height={64}
                                    className="rounded-lg mr-4 object-cover"
                                />
                            )}
                            <div>
                                <h3 className="font-semibold text-lg text-white mb-1">{selectedChannel.name}</h3>
                                <p className="text-sm text-zinc-400 line-clamp-2">{selectedChannel.tagline}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side - Audio Controls */}
                <div className="w-full md:w-auto md:min-w-[300px] flex flex-col md:items-center bg-black/30 p-6 rounded-2xl border border-white/5">

                    {/* Main Play Button */}
                    <button
                        onClick={handlePlayPause}
                        className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all transform hover:scale-105 ${isPlaying
                                ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                : 'bg-[#3AA3E0] hover:bg-[#2e82b3] shadow-[0_0_20px_rgba(58,163,224,0.4)]'
                            }`}
                    >
                        {isPlaying ? (
                            <Pause className="w-8 h-8 text-white fill-current" />
                        ) : (
                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                        )}
                    </button>

                    <div className="text-center mb-6">
                        <div className="text-sm font-medium text-white mb-1">
                            {isPlaying ? 'Spelar nu' : 'Pausad'}
                        </div>
                        {isPlaying && (
                            <div className="flex items-center justify-center space-x-1 h-3">
                                <div className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-1 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                <div className="w-1 h-2.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
                            </div>
                        )}
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center w-full px-4">
                        <button onClick={toggleMute} className="text-zinc-400 hover:text-white mr-3 transition-colors">
                            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#3AA3E0]"
                        />
                    </div>

                    <audio ref={audioRef} preload="none" />
                </div>
            </div>
        </div>
    );
}
