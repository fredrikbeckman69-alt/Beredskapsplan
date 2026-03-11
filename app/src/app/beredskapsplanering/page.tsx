"use client";

import { useState, useEffect } from "react";
import { ClipboardList, Wallet, AlertCircle, Info, ExternalLink, Plus, Edit2, Trash2, X } from "lucide-react";

interface PlanItem {
    id: string;
    post: string;
    cost: number;
    status: "Angivet pris" | "Estimerad";
    link?: string;
}

interface NotIncludedItem {
    id: string;
    title: string;
    description: string;
}

const defaultNotIncludedItems: NotIncludedItem[] = [
    { id: "1", title: "Starlink abonnemang", description: "800 kr/månad." },
    { id: "2", title: "Rakel", description: "Kostnad beroende på framtida lösning 2030." },
    { id: "3", title: "Alternativ lokal", description: "Hyres- eller driftskostnad." },
    { id: "4", title: "Löpande bränsle", description: "Kostnad för påfyllning vid användning." },
    { id: "5", title: "ElevenLabs talsyntes", description: "Startkostnad och förbrukningskostnad." },
    { id: "6", title: "SMSfunktion", description: "Startkostnad och förbrukningskostnad." },
];

const defaultItems: PlanItem[] = [
    { id: "1", post: "Kontanter (i kassaskåp)", cost: 100000, status: "Angivet pris" },
    { id: "2", post: "Batteribackup (10 kWh LiFePO4)", cost: 85000, status: "Estimerad" },
    { id: "3", post: "Mat (2 veckor, 25 års hållbarhet)", cost: 35000, status: "Angivet pris" },
    { id: "4", post: "Lokal LLM-Server (Hårdvara)", cost: 25000, status: "Estimerad" },
    { id: "5", post: "Reservkraft (Hårdvara/Installation)", cost: 15000, status: "Angivet pris", link: "https://championgenerators.se/produkter/champion-3600-watt-dual-fuel-hybrid-inverterelverk/" },
    { id: "6", post: "Diesel (500 L)", cost: 10000, status: "Estimerad" },
    { id: "7", post: "Vatten (575 L inkl. emballage)", cost: 9000, status: "Angivet pris" },
    { id: "8", post: "Gasol (5 x 10 kg inkl. flaskor)", cost: 8500, status: "Estimerad" },
    { id: "9", post: "Solpaneler (Vikbara, 400W)", cost: 7000, status: "Estimerad" },
    { id: "10", post: "Skalskydd (Salto-system per dörr)", cost: 7000, status: "Estimerad" },
    { id: "11", post: "Byggelverk", cost: 5000, status: "Angivet pris" },
    { id: "12", post: "Gasolvärmare (3 st)", cost: 5000, status: "Angivet pris" },
    { id: "13", post: "5G Mobil router (Driftsäker modell)", cost: 4000, status: "Estimerad" },
    { id: "14", post: "Satellitkommunikation (Hårdvara)", cost: 3500, status: "Estimerad" },
    { id: "15", post: "Nato-sängar (6 st)", cost: 3000, status: "Angivet pris" },
    { id: "16", post: "Starlink (Hårdvara)", cost: 2500, status: "Angivet pris" },
    { id: "17", post: "Förbrukningsvaror (Sopsäckar/papper)", cost: 2000, status: "Angivet pris" },
    { id: "18", post: "Verktyg (Brytjärn & Bultsax)", cost: 1500, status: "Estimerad" },
    { id: "19", post: "Sovsäckar (6 st)", cost: 1000, status: "Angivet pris" },
    { id: "20", post: "Bensin (50 L)", cost: 850, status: "Estimerad" },
    { id: "21", post: "SMS/ElevenLabs (Engångsavgift/pott)", cost: 500, status: "Estimerad" },
];

export default function BeredskapsplaneringPage() {
    const [planItems, setPlanItems] = useState<PlanItem[]>([]);
    const [notIncludedItems, setNotIncludedItems] = useState<NotIncludedItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Modal state for PlanItems
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PlanItem | null>(null);

    // Modal state for NotIncludedItems
    const [isNotIncludedModalOpen, setIsNotIncludedModalOpen] = useState(false);
    const [editingNotIncludedItem, setEditingNotIncludedItem] = useState<NotIncludedItem | null>(null);

    // Form state for PlanItems
    const [formData, setFormData] = useState<Omit<PlanItem, "id">>({
        post: "",
        cost: 0,
        status: "Angivet pris",
        link: ""
    });

    // Form state for NotIncludedItems
    const [notIncludedFormData, setNotIncludedFormData] = useState<Omit<NotIncludedItem, "id">>({
        title: "",
        description: "",
    });

    useEffect(() => {
        const savedItems = localStorage.getItem("beredskapsplan_items");
        const savedNotIncludedItems = localStorage.getItem("beredskapsplan_not_included_items");

        if (savedItems) {
            try {
                setPlanItems(JSON.parse(savedItems));
            } catch (e) {
                console.error("Failed to parse saved items", e);
                setPlanItems(defaultItems);
            }
        } else {
            setPlanItems(defaultItems);
        }

        if (savedNotIncludedItems) {
            try {
                setNotIncludedItems(JSON.parse(savedNotIncludedItems));
            } catch (e) {
                console.error("Failed to parse saved not included items", e);
                setNotIncludedItems(defaultNotIncludedItems);
            }
        } else {
            setNotIncludedItems(defaultNotIncludedItems);
        }

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("beredskapsplan_items", JSON.stringify(planItems));
            localStorage.setItem("beredskapsplan_not_included_items", JSON.stringify(notIncludedItems));
        }
    }, [planItems, notIncludedItems, isLoaded]);

    const totalCost = planItems.reduce((acc, item) => acc + item.cost, 0);

    const formatCurrency = (value: number) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " kr";
    };

    const handleOpenModal = (item?: PlanItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                post: item.post,
                cost: item.cost,
                status: item.status,
                link: item.link || ""
            });
        } else {
            setEditingItem(null);
            setFormData({
                post: "",
                cost: 0,
                status: "Angivet pris",
                link: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSave = () => {
        if (!formData.post.trim()) return;

        if (editingItem) {
            setPlanItems(prev => prev.map(item =>
                item.id === editingItem.id ? { ...formData, id: item.id } : item
            ));
        } else {
            const newItem: PlanItem = {
                ...formData,
                id: Date.now().toString()
            };
            setPlanItems(prev => [...prev, newItem]);
        }
        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm("Är du säker på att du vill ta bort den här posten?")) {
            setPlanItems(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleOpenNotIncludedModal = (item?: NotIncludedItem) => {
        if (item) {
            setEditingNotIncludedItem(item);
            setNotIncludedFormData({
                title: item.title,
                description: item.description,
            });
        } else {
            setEditingNotIncludedItem(null);
            setNotIncludedFormData({
                title: "",
                description: "",
            });
        }
        setIsNotIncludedModalOpen(true);
    };

    const handleCloseNotIncludedModal = () => {
        setIsNotIncludedModalOpen(false);
        setEditingNotIncludedItem(null);
    };

    const handleSaveNotIncluded = () => {
        if (!notIncludedFormData.title.trim()) return;

        if (editingNotIncludedItem) {
            setNotIncludedItems(prev => prev.map(item =>
                item.id === editingNotIncludedItem.id ? { ...notIncludedFormData, id: item.id } : item
            ));
        } else {
            const newItem: NotIncludedItem = {
                ...notIncludedFormData,
                id: Date.now().toString()
            };
            setNotIncludedItems(prev => [...prev, newItem]);
        }
        handleCloseNotIncludedModal();
    };

    const handleDeleteNotIncluded = (id: string) => {
        if (confirm("Är du säker på att du vill ta bort den här posten?")) {
            setNotIncludedItems(prev => prev.filter(item => item.id !== id));
        }
    };

    if (!isLoaded) {
        return <div className="p-8 text-white opacity-50">Laddar beredskapsplanering...</div>;
    }

    return (
        <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm mb-2">Beredskapsplanering</h2>
                    <p className="text-zinc-400 text-lg md:text-xl font-medium">Kostnadsestimering och resursplanering.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-[#2B4645]/80 border border-[#3AA3E0]/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3AA3E0]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-[#3AA3E0]/10 border border-[#3AA3E0]/20 flex-shrink-0">
                                    <Wallet className="w-6 h-6 text-[#3AA3E0]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white">Kostnadsestimater och Behov</h3>
                                    <p className="text-zinc-400 text-sm mt-1">Översikt över planerade inköp och estimerade kostnader.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleOpenModal()}
                                className="flex items-center gap-2 px-4 py-2 bg-[#3AA3E0] hover:bg-[#3AA3E0]/90 text-white rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(58,163,224,0.3)] shrink-0"
                            >
                                <Plus className="w-4 h-4" />
                                Lägg till post
                            </button>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/20">
                            <table className="w-full text-left text-sm text-zinc-300">
                                <thead className="text-xs uppercase bg-white/5 text-zinc-400 sticky top-0">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-semibold">Post</th>
                                        <th scope="col" className="px-6 py-4 font-semibold text-right">Kostnad</th>
                                        <th scope="col" className="px-6 py-4 font-semibold text-center">Status</th>
                                        <th scope="col" className="px-6 py-4 font-semibold text-right">Åtgärder</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {planItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-white/5 transition-colors group/row">
                                            <td className="px-6 py-4 font-medium text-white">
                                                {item.link ? (
                                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#3AA3E0] hover:underline inline-flex items-center gap-1.5 transition-colors hover:text-[#5bc1ff] group/link">
                                                        {item.post}
                                                        <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover/link:opacity-100" />
                                                    </a>
                                                ) : (
                                                    item.post
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap text-emerald-400 font-medium">
                                                {formatCurrency(item.cost)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === 'Estimerad'
                                                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleOpenModal(item)}
                                                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                        title="Redigera"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                                                        title="Ta bort"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {planItems.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                                                Inga poster inlagda.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot className="bg-white/5 font-semibold text-white border-t border-white/10">
                                    <tr>
                                        <td className="px-6 py-5 text-lg">Total summa</td>
                                        <td className="px-6 py-5 text-right text-lg text-emerald-400">{formatCurrency(totalCost)}</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="flex items-start gap-3 text-zinc-300 bg-amber-500/5 p-5 rounded-2xl border border-amber-500/10 relative group/notincluded">
                                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-sm font-semibold text-amber-500 uppercase tracking-wide">Ej inkluderat i summan (kräver offert eller abonnemang)</h4>
                                        <button
                                            onClick={() => handleOpenNotIncludedModal()}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 rounded-lg text-xs font-medium transition-colors border border-amber-500/30"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            Lägg till
                                        </button>
                                    </div>
                                    <ul className="space-y-2 text-sm">
                                        {notIncludedItems.map(item => (
                                            <li key={item.id} className="flex items-start group/nilist">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 mt-1.5 mr-2 shrink-0"></span>
                                                <span className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                                                    <strong className="text-white">{item.title}:</strong> 
                                                    <span className="text-zinc-400">{item.description}</span>
                                                </span>
                                                <div className="flex items-center gap-1 opacity-0 group-hover/nilist:opacity-100 transition-opacity ml-2 shrink-0">
                                                    <button
                                                        onClick={() => handleOpenNotIncludedModal(item)}
                                                        className="p-1 text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-md transition-colors"
                                                        title="Redigera"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteNotIncluded(item.id)}
                                                        className="p-1 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                                                        title="Ta bort"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                        {notIncludedItems.length === 0 && (
                                            <li className="text-zinc-500 italic">Inga poster inlagda.</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Edit/Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#1A2F2D] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-2xl font-semibold text-white mb-6">
                            {editingItem ? "Redigera post" : "Lägg till post"}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">Beskrivning (Post)</label>
                                <input
                                    type="text"
                                    value={formData.post}
                                    onChange={(e) => setFormData({ ...formData, post: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#3AA3E0]/50 focus:border-transparent transition-all"
                                    placeholder="T.ex. Vatten (575 L)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">Kostnad (kr)</label>
                                <input
                                    type="number"
                                    value={formData.cost || ""}
                                    onChange={(e) => setFormData({ ...formData, cost: parseInt(e.target.value) || 0 })}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#3AA3E0]/50 focus:border-transparent transition-all"
                                    placeholder="0"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "Angivet pris" | "Estimerad" })}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#3AA3E0]/50 focus:border-transparent transition-all"
                                >
                                    <option value="Angivet pris">Angivet pris</option>
                                    <option value="Estimerad">Estimerad</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-1">Länk (Frivilligt)</label>
                                <input
                                    type="url"
                                    value={formData.link || ""}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#3AA3E0]/50 focus:border-transparent transition-all"
                                    placeholder="https://"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-5 py-2.5 rounded-xl font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Avbryt
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!formData.post.trim()}
                                className="px-5 py-2.5 bg-[#3AA3E0] hover:bg-[#3AA3E0]/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(58,163,224,0.3)]"
                            >
                                Spara
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit/Add Not Included Modal */}
            {isNotIncludedModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-[#1A2F2D] border border-amber-500/20 rounded-3xl p-6 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={handleCloseNotIncludedModal}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-2xl font-semibold text-white mb-6">
                            {editingNotIncludedItem ? "Redigera Ej inkluderat post" : "Lägg till Ej inkluderat post"}
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-amber-500/80 mb-1">Titel</label>
                                <input
                                    type="text"
                                    value={notIncludedFormData.title}
                                    onChange={(e) => setNotIncludedFormData({ ...notIncludedFormData, title: e.target.value })}
                                    className="w-full bg-black/30 border border-amber-500/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                                    placeholder="T.ex. Starlink abonnemang"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-amber-500/80 mb-1">Beskrivning</label>
                                <textarea
                                    value={notIncludedFormData.description}
                                    onChange={(e) => setNotIncludedFormData({ ...notIncludedFormData, description: e.target.value })}
                                    className="w-full bg-black/30 border border-amber-500/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all min-h-[100px] resize-y"
                                    placeholder="T.ex. 800 kr/månad"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button
                                onClick={handleCloseNotIncludedModal}
                                className="px-5 py-2.5 rounded-xl font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                Avbryt
                            </button>
                            <button
                                onClick={handleSaveNotIncluded}
                                disabled={!notIncludedFormData.title.trim() || !notIncludedFormData.description.trim()}
                                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-500/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(245,158,11,0.3)] text-shadow-sm"
                            >
                                Spara
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
