'use client';

import { useState, useEffect } from 'react';
import { IntelligenceItem } from '@/lib/api/types';
import { Activity, Zap, CloudRain, ShieldAlert, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Landmark } from 'lucide-react';
import Image from 'next/image';

import smhiLogo from '../../public/logos/smhi.png';
import polisenLogo from '../../public/logos/polisen.ico';
import mcfLogo from '../../public/logos/mcf.png';
import lansstyrelsenLogo from '../../public/logos/lansstyrelsen.png';

export function IntelligenceFeed() {
    const [items, setItems] = useState<IntelligenceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
    const [sourceStatus, setSourceStatus] = useState<Record<string, boolean>>({});

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/intelligence');
                if (res.ok) {
                    const data = await res.json();
                    if (data.items && data.status) {
                        setItems(data.items);
                        setSourceStatus(data.status);
                    } else {
                        setItems(data);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch intelligence data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        const interval = setInterval(fetchData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTimeAgo = (timestamp: string) => {
        const diff = new Date(timestamp).getTime() - new Date().getTime();
        const diffInMinutes = Math.round(diff / (1000 * 60));
        const diffInHours = Math.round(diff / (1000 * 60 * 60));
        const diffInDays = Math.round(diff / (1000 * 60 * 60 * 24));

        if (Math.abs(diffInMinutes) < 60) return `${Math.abs(diffInMinutes)} min sen`;
        if (Math.abs(diffInHours) < 24) return `${Math.abs(diffInHours)} h sen`;
        if (Math.abs(diffInDays) > 1) return `${Math.abs(diffInDays)} dagar sen`;

        return 'Nyligen';
    };

    const formatLastUpdated = (date: Date) => {
        return new Intl.DateTimeFormat('sv-SE', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getIconForSource = (source: string) => {
        if (source === 'SMHI') return <Image src={smhiLogo} alt="SMHI" width={24} height={24} className="object-contain" />;
        if (source === 'Polisen') return <Image src={polisenLogo} alt="Polisen" width={24} height={24} className="object-contain" />;
        if (source === 'MCF') return <Image src={mcfLogo} alt="MCF" width={24} height={24} className="object-contain rounded-sm" />;
        if (source === 'Länsstyrelsen') return <Image src={lansstyrelsenLogo} alt="Länsstyrelsen" width={24} height={24} className="object-contain" />;
        return <Zap className="w-5 h-5 text-yellow-400" />;
    };

    const getBgColorForSource = (source: string) => {
        if (source === 'SMHI') return 'bg-white/10';
        if (source === 'Polisen') return 'bg-white/10';
        if (source === 'MCF') return 'bg-white/10';
        if (source === 'Länsstyrelsen') return 'bg-white/10';
        return 'bg-yellow-500/20 text-yellow-400';
    };

    const toggleSource = (source: string) => {
        setExpandedSources(prev => ({ ...prev, [source]: !prev[source] }));
    };

    const groupedItems = items.reduce((acc, item) => {
        if (!acc[item.source]) acc[item.source] = [];
        acc[item.source].push(item);
        return acc;
    }, {} as Record<string, IntelligenceItem[]>);

    const baseSources = ['MCF', 'Polisen', 'SMHI', 'Länsstyrelsen'];
    const sources = [...baseSources].sort((a, b) => {
        const timeA = groupedItems[a]?.length ? new Date(groupedItems[a][0].timestamp).getTime() : 0;
        const timeB = groupedItems[b]?.length ? new Date(groupedItems[b][0].timestamp).getTime() : 0;
        return timeB - timeA;
    });

    return (
        <div className="col-span-1 lg:col-span-2 bg-[#2B4645]/80 border border-[#3AA3E0]/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#3AA3E0]/10 via-transparent to-transparent opacity-50 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-semibold flex items-center text-white">
                        <Activity className="w-6 h-6 mr-3 text-[#3AA3E0]" />
                        Underrättelser & Övervakning
                    </h3>
                    {!loading && (
                        <div className="text-sm text-zinc-400 font-medium bg-white/5 px-4 py-2 rounded-full border border-white/5">
                            Uppdaterad {formatLastUpdated(new Date())}
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-start p-5 bg-white/5 rounded-2xl border border-white/5 animate-pulse">
                                <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                                    <div className="p-6 bg-white/10 rounded-xl mr-4 sm:mr-0 w-12 h-12"></div>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="h-5 bg-white/10 rounded w-3/4"></div>
                                    <div className="h-4 bg-white/5 rounded w-full"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        sources.map((source) => {
                            const sourceItems = groupedItems[source] || [];
                            const isEmpty = sourceItems.length === 0;
                            const isExpanded = expandedSources[source];
                            const displayItems = isExpanded ? sourceItems : sourceItems.slice(0, 3);

                            return (
                                <div key={source} className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                                    <button
                                        onClick={() => !isEmpty && toggleSource(source)}
                                        className={`w-full flex items-center justify-between p-4 transition-colors text-left ${isEmpty ? 'cursor-default opacity-70' : 'hover:bg-white/5 cursor-pointer'}`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`p-2 rounded-lg mr-3 ${getBgColorForSource(source)}`}>
                                                {getIconForSource(source)}
                                            </div>
                                            <span className="font-semibold text-white text-lg">{source}</span>
                                            {!isEmpty && (
                                                <span className="ml-3 text-xs font-medium bg-white/10 text-zinc-300 px-2.5 py-1 rounded-full">
                                                    {sourceItems.length} händelser
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center">
                                            {/* Live Indicator per source */}
                                            <span className="text-xs bg-[#1A2F2D] text-white px-2.5 py-1 rounded-full uppercase font-bold tracking-widest flex items-center shadow-inner mr-3 group-hover:bg-[#2B4645] transition-colors border border-[#3AA3E0]/20">
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${sourceStatus[source] !== false ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse' : 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]'}`}></span>
                                                LIVE
                                            </span>

                                            {!isEmpty && (
                                                <div className="p-1.5 bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors">
                                                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                </div>
                                            )}
                                        </div>
                                    </button>

                                    {!isEmpty && (
                                        <div className="p-2 pt-0 space-y-2">
                                            {displayItems.map((item) => (
                                                <div key={item.id} className="flex flex-col sm:flex-row sm:items-start p-4 bg-black/20 rounded-xl border border-white/5 hover:bg-black/40 transition-colors ml-2 mr-2 mb-2 last:mb-0">
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-semibold text-white text-base">
                                                                {item.title}
                                                            </h4>
                                                            <span className="text-xs text-zinc-500 font-medium ml-4 whitespace-nowrap">
                                                                {formatTimeAgo(item.timestamp)}
                                                            </span>
                                                        </div>
                                                        <p className="text-zinc-400 leading-relaxed text-sm">
                                                            {item.description ? (item.description.length > 150 ? `${item.description.substring(0, 150)}...` : item.description) : item.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}

                                            {!isExpanded && sourceItems.length > 3 && (
                                                <div className="px-2 pb-2 mt-2">
                                                    <button
                                                        onClick={() => toggleSource(source)}
                                                        className="w-full py-2.5 text-sm font-medium text-zinc-400 hover:text-white bg-black/20 hover:bg-black/40 rounded-lg transition-colors border border-dashed border-white/10 flex items-center justify-center"
                                                    >
                                                        Visa {sourceItems.length - 3} fler händelser
                                                        <ChevronDown className="w-4 h-4 ml-1" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

