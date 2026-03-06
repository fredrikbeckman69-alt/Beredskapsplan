"use client";

import { useState, useEffect } from "react";
import { Users, UserPlus, Phone, MapPin, User, Trash2, ShieldAlert, MessageSquare, Send, ChevronDown, ChevronUp, Edit2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NextOfKin = {
    id: string;
    name: string;
    phone: string;
    address: string;
    relation: string;
    staffName: string;
};

export default function NextOfKinPage() {
    const [contacts, setContacts] = useState<NextOfKin[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Form state
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [relation, setRelation] = useState("");
    const [staffName, setStaffName] = useState("");

    // Edit state
    const [editingId, setEditingId] = useState<string | null>(null);

    // SMS state
    const [smsMessage, setSmsMessage] = useState("");
    const [isSendingSms, setIsSendingSms] = useState(false);

    // Accordion state
    const [expandedStaff, setExpandedStaff] = useState<string | null>(null);

    // Load from API on mount
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('/Beredskapsplan/api/next-of-kin');
                if (response.ok) {
                    const data = await response.json();
                    setContacts(data);
                } else {
                    console.error("Failed to fetch next-of-kin contacts");
                }
            } catch (e) {
                console.error("Error fetching next-of-kin contacts", e);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchContacts();
    }, []);

    // Save to API when contacts change
    useEffect(() => {
        if (isLoaded) {
            const saveContacts = async () => {
                try {
                    await fetch('/Beredskapsplan/api/next-of-kin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(contacts),
                    });
                } catch (e) {
                    console.error("Error saving next-of-kin contacts", e);
                }
            };

            saveContacts();
        }
    }, [contacts, isLoaded]);

    const handleAddContact = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !phone.trim() || !relation.trim() || !staffName.trim()) return;

        if (editingId) {
            // Update existing contact
            setContacts(prev => prev.map(c =>
                c.id === editingId
                    ? { ...c, name: name.trim(), phone: phone.trim(), address: address.trim(), relation: relation.trim(), staffName: staffName.trim() }
                    : c
            ));
            setEditingId(null);
        } else {
            // Create new contact
            const newContact: NextOfKin = {
                id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
                name: name.trim(),
                phone: phone.trim(),
                address: address.trim(),
                relation: relation.trim(),
                staffName: staffName.trim()
            };
            setContacts(prev => [...prev, newContact]);
        }

        // Reset form
        setName("");
        setPhone("");
        setAddress("");
        setRelation("");
        if (!editingId) {
            // Keep staffName to easily add multiple kin for the same staff, unless we were editing
        } else {
            setStaffName(""); // Clear staff name if we were just editing someone else
        }
    };

    const handleEditContact = (contact: NextOfKin, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingId(contact.id);
        setName(contact.name);
        setPhone(contact.phone);
        setAddress(contact.address);
        setRelation(contact.relation);
        setStaffName(contact.staffName);

        // Scroll to top where form is
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setName("");
        setPhone("");
        setAddress("");
        setRelation("");
        setStaffName("");
    };

    const handleDeleteContact = (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent accordion toggle
        setContacts(prev => prev.filter(c => c.id !== id));
        if (editingId === id) {
            cancelEdit(); // Auto cancel edit if deleting the same record
        }
    };

    const handleSendSms = (e: React.FormEvent) => {
        e.preventDefault();
        if (!smsMessage.trim() || contacts.length === 0) return;

        setIsSendingSms(true);
        // Mocking the SMS send delay
        setTimeout(() => {
            setSmsMessage("");
            setIsSendingSms(false);
            alert("SMS skickat till alla registrerade anhöriga (Demofunktion).");
        }, 1500);
    };

    const toggleStaffExpanded = (staff: string) => {
        setExpandedStaff(prev => prev === staff ? null : staff);
    };

    // Group contacts by staffName
    const groupedContacts = contacts.reduce((acc, contact) => {
        if (!acc[contact.staffName]) {
            acc[contact.staffName] = [];
        }
        acc[contact.staffName].push(contact);
        return acc;
    }, {} as Record<string, NextOfKin[]>);

    const uniqueStaffCount = Object.keys(groupedContacts).length;

    if (!isLoaded) return null; // Avoid hydration mismatch

    return (
        <div className="p-4 md:p-8 space-y-8 w-full max-w-7xl mx-auto">
            <div className="flex flex-col mb-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 flex items-center">
                    <Users className="w-8 h-8 text-indigo-500 mr-4" />
                    Anhöriga
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl">
                    Här kan du registrera och visa kontaktuppgifter till anhöriga för personal.
                    Använd formuläret för att skicka mass-SMS till samtliga anhöriga.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Column: Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-1 space-y-6"
                >
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                            {editingId ? (
                                <>
                                    <Edit2 className="w-5 h-5 mr-3 text-indigo-400" />
                                    Redigera anhörig
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5 mr-3 text-indigo-400" />
                                    Lägg till anhörig
                                </>
                            )}
                        </h3>

                        <form onSubmit={handleAddContact} className="space-y-4 relative z-10">
                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Personalens namn (Kollega) *</label>
                                <input
                                    type="text"
                                    value={staffName}
                                    onChange={(e) => setStaffName(e.target.value)}
                                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
                                    placeholder="T.ex. Anna Andersson"
                                    required
                                />
                            </div>

                            <div className="h-px bg-zinc-800/50 my-4" />

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Anhörigs namn *</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
                                    placeholder="För- och efternamn"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Telefonnummer *</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
                                    placeholder="07x-xxx xx xx"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Relation till personal *</label>
                                <input
                                    type="text"
                                    value={relation}
                                    onChange={(e) => setRelation(e.target.value)}
                                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
                                    placeholder="T.ex. Partner, Förälder, Barn"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-400 mb-1">Adress (Valfritt)</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-zinc-600"
                                    placeholder="Gatuadress, Postnummer Ort"
                                />
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={!name.trim() || !phone.trim() || !relation.trim() || !staffName.trim()}
                                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {editingId ? (
                                        <>
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Uppdatera
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Spara
                                        </>
                                    )}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center border border-zinc-700 hover:border-zinc-600"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Avbryt
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </motion.div>

                {/* Right Column: List & SMS */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-2 space-y-8"
                >
                    {/* SMS Broadcast Header */}
                    <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-opacity opacity-50 group-hover:opacity-100" />

                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                            <MessageSquare className="w-5 h-5 mr-3 text-blue-400" />
                            Skicka mass-SMS till anhöriga
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Detta meddelande kommer att skickas till {contacts.length} registrerade {contacts.length === 1 ? 'telefonnummer' : 'telefonnummer'}.
                        </p>

                        <form onSubmit={handleSendSms} className="relative z-10">
                            <textarea
                                value={smsMessage}
                                onChange={(e) => setSmsMessage(e.target.value)}
                                className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-zinc-600 resize-none h-28"
                                placeholder="Skriv in krismeddelande här..."
                                disabled={contacts.length === 0}
                            />
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={!smsMessage.trim() || contacts.length === 0 || isSendingSms}
                                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSendingSms ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    ) : (
                                        <Send className="w-4 h-4 mr-2" />
                                    )}
                                    {isSendingSms ? 'Skickar...' : 'Skicka SMS'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Grouped Contacts List */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">Registrerade</h3>
                            <div className="flex items-center gap-3">
                                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 py-1 px-3 rounded-full text-xs font-medium">
                                    {uniqueStaffCount} {uniqueStaffCount === 1 ? 'anställd' : 'anställda'}
                                </span>
                                <span className="bg-zinc-800 text-zinc-300 py-1 px-3 rounded-full text-xs font-medium">
                                    {contacts.length} {contacts.length === 1 ? 'anhörig' : 'anhöriga'} totalt
                                </span>
                            </div>
                        </div>

                        {contacts.length === 0 ? (
                            <div className="bg-[#111] border border-zinc-800 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                                    <ShieldAlert className="w-8 h-8 text-zinc-600" />
                                </div>
                                <h4 className="text-lg font-medium text-zinc-300 mb-2">Inga anhöriga registrerade</h4>
                                <p className="text-zinc-500 max-w-sm">
                                    Använd formuläret för att lägga till kontaktuppgifter till anhöriga. Fyll i både personalens namn och den anhöriges uppgifter.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {Object.entries(groupedContacts).map(([staff, kinList]) => {
                                        const isExpanded = expandedStaff === staff;

                                        return (
                                            <motion.div
                                                key={staff}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className={`bg-[#111] border rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-zinc-700 ring-1 ring-white/5 shadow-xl' : 'border-zinc-800/80 hover:border-zinc-700'
                                                    }`}
                                            >
                                                {/* Staff Header (Clickable) */}
                                                <div
                                                    onClick={() => toggleStaffExpanded(staff)}
                                                    className="p-5 flex items-center justify-between cursor-pointer group select-none"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-indigo-500/20' : 'bg-black border border-white/5 group-hover:border-white/10'
                                                            }`}>
                                                            <User className={`w-5 h-5 ${isExpanded ? 'text-indigo-400' : 'text-zinc-400 group-hover:text-zinc-300'}`} />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-lg text-zinc-100 group-hover:text-white transition-colors">{staff}</h4>
                                                            <p className="text-sm text-zinc-500">{kinList.length} {kinList.length === 1 ? 'anhörig' : 'anhöriga'} registrerade</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-zinc-400 group-hover:text-white transition-colors">
                                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                    </div>
                                                </div>

                                                {/* Expanded Kin List */}
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <div className="px-5 pb-5 pt-2 border-t border-zinc-800/50 space-y-3 bg-black/20">
                                                                {kinList.map((kin) => (
                                                                    <div key={kin.id} className="p-4 bg-[#151515] border border-zinc-800/80 rounded-lg relative group">

                                                                        <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                            <button
                                                                                onClick={(e) => handleEditContact(kin, e)}
                                                                                className="p-1.5 text-zinc-600 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-md transition-colors focus:opacity-100"
                                                                                title="Redigera"
                                                                            >
                                                                                <Edit2 className="w-4 h-4" />
                                                                            </button>
                                                                            <button
                                                                                onClick={(e) => handleDeleteContact(kin.id, e)}
                                                                                className="p-1.5 text-zinc-600 hover:text-rose-400 hover:bg-rose-400/10 rounded-md transition-colors focus:opacity-100"
                                                                                title="Ta bort"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </button>
                                                                        </div>

                                                                        <div className="flex flex-col gap-1 pr-16">
                                                                            <div className="flex items-center gap-2">
                                                                                <span className="font-medium text-zinc-200">{kin.name}</span>
                                                                                <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                                                                                    {kin.relation}
                                                                                </span>
                                                                            </div>

                                                                            <div className="flex items-center gap-4 mt-2">
                                                                                <div className="flex items-center text-sm">
                                                                                    <Phone className="w-3.5 h-3.5 text-zinc-500 mr-2" />
                                                                                    <a href={`tel:${kin.phone}`} className="text-zinc-400 hover:text-indigo-400 transition-colors">
                                                                                        {kin.phone}
                                                                                    </a>
                                                                                </div>

                                                                                {kin.address && (
                                                                                    <div className="flex items-center text-sm">
                                                                                        <MapPin className="w-3.5 h-3.5 text-zinc-500 mr-2" />
                                                                                        <span className="text-zinc-400">{kin.address}</span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
