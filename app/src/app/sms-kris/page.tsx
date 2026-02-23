"use client";

import { useState, useEffect } from 'react';
import { Contact } from '@/types/contact';
import {
    Users,
    UserPlus,
    Trash2,
    Edit2,
    Save,
    X,
    Phone,
    Briefcase,
    ShieldAlert,
    Loader2,
    CheckCircle2
} from 'lucide-react';

const defaultContacts: Contact[] = [
    { id: 'c1', name: 'Adem Aslani', role: 'Medarbetare', phone: '+46790063187' },
    { id: 'c2', name: 'Alemi Rahimullah', role: 'Medarbetare', phone: '+46790063188' },
    { id: 'c3', name: 'Alexander Lavrov', role: 'Logistikansvarig (Reserv)', phone: '+46726486262' },
    { id: 'c4', name: 'Artis Dukulis', role: 'Medarbetare', phone: '+46795851114' },
    { id: 'c5', name: 'Avdullah Veseli', role: 'Logistikansvarig', phone: '+46790063186' },
    { id: 'c6', name: 'Carina Broman', role: 'Medarbetare', phone: '+46790064837' },
    { id: 'c7', name: 'Eva Nilsson', role: 'Ekonomi', phone: '+46733351120' },
    { id: 'c8', name: 'Helena Truedsson', role: 'Medarbetare', phone: '+46760202642' },
    { id: 'c9', name: 'Lina Gustasson', role: 'IT-ansvarig (Reserv)', phone: '+46790063189' },
    { id: 'c10', name: 'Nihat Gicic', role: 'Medarbetare', phone: '+46765899971' },
    { id: 'c11', name: 'Towa Malmberg', role: 'Medarbetare', phone: '+46790063184' },
    { id: 'c12', name: 'Peter Salmnien', role: 'Medarbetare', phone: '+46708944230' },
    { id: 'c13', name: 'Thomas Pettersson', role: 'Medarbetare', phone: '+46709371793' },
    { id: 'c14', name: 'Fredrik Beckman', role: 'Beredskapsledare', phone: '+46732323232' },
    { id: 'c15', name: 'Tore Robertsson', role: 'VD', phone: '+46708949560' },
];

export default function SMSKrisPage() {
    const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        phone: ''
    });

    const [isSending, setIsSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState<boolean | null>(null);
    const [smsMessage, setSmsMessage] = useState('BEREDSKAPSLARM: En kritisk händelse har inträffat. Vänligen anslut omedelbart till krisledningsmötet i Teams. /Antigravity');

    // Load from localStorage on mount
    useEffect(() => {
        const savedContacts = localStorage.getItem('smsContacts');
        if (savedContacts) {
            const parsed = JSON.parse(savedContacts);
            if (parsed.length > 0) {
                setContacts(parsed);
            }
        }
    }, []);

    // Save to localStorage when contacts change
    useEffect(() => {
        localStorage.setItem('smsContacts', JSON.stringify(contacts));
    }, [contacts]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            setContacts(contacts.map(c =>
                c.id === editingId ? { ...c, ...formData } : c
            ));
            setEditingId(null);
        } else {
            const newContact: Contact = {
                id: Date.now().toString(),
                ...formData
            };
            setContacts([...contacts, newContact]);
        }

        setFormData({ name: '', role: '', phone: '' });
        setIsAdding(false);
    };

    const handleEdit = (contact: Contact) => {
        setFormData({
            name: contact.name,
            role: contact.role,
            phone: contact.phone
        });
        setEditingId(contact.id);
        setIsAdding(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Är du säker på att du vill ta bort den här kontakten?')) {
            setContacts(contacts.filter(c => c.id !== id));
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ name: '', role: '', phone: '' });
    };

    const handleSendSMS = async () => {
        if (contacts.length === 0) return;

        setIsSending(true);
        setSendSuccess(null);

        try {
            const response = await fetch('/api/sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contacts,
                    message: smsMessage
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSendSuccess(true);
                setTimeout(() => setSendSuccess(null), 5000);
            } else {
                console.error("SMS Error:", data);
                alert(`Kunde inte skicka SMS: ${data.message || data.error}`);
                setSendSuccess(false);
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Nätverksfel. Kunde inte ansluta till servern.");
            setSendSuccess(false);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="p-4 md:p-8 space-y-8 w-full animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm mb-2">Beredskap SMS</h2>
                    <p className="text-zinc-400 text-lg md:text-xl font-medium">Hantera mottagare och aktivera Beredskapsplanen.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contacts Section */}
                <div className="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-semibold flex items-center text-white">
                            <Users className="w-6 h-6 mr-3 text-sky-400" />
                            Mottagare (Kontaktlista)
                        </h3>
                        {!isAdding && (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center"
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Lägg till
                            </button>
                        )}
                    </div>

                    {isAdding && (
                        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                            <h4 className="text-lg font-medium text-white mb-4">
                                {editingId ? 'Redigera Kontakt' : 'Ny Kontakt'}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Namn</label>
                                    <div className="relative">
                                        <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            placeholder="T.ex. Anna Andersson"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Roll/Befattning</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            placeholder="T.ex. Skyddsombud"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Telefonnummer</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            placeholder="+46701234567"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm flex items-center"
                                >
                                    <X className="w-4 h-4 mr-1" />
                                    Avbryt
                                </button>
                                <button
                                    type="submit"
                                    className="bg-sky-500 hover:bg-sky-400 text-white px-5 py-2 rounded-xl font-semibold transition-colors shadow-lg shadow-sky-500/20 flex items-center"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Spara
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="space-y-3">
                        {contacts.length === 0 && !isAdding ? (
                            <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                                <Users className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                                <p className="text-zinc-400 font-medium">Inga mottagare tillagda ännu.</p>
                                <p className="text-sm text-zinc-500 mt-1">Lägg till personal i krisledning eller andra nyckelpersoner.</p>
                            </div>
                        ) : (
                            contacts.map(contact => (
                                <div key={contact.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg mr-4 shadow-lg shrink-0">
                                            {contact.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white text-lg leading-tight">{contact.name}</h4>
                                            <div className="flex items-center text-sm text-zinc-400 mt-1">
                                                <span className="flex items-center mr-3">
                                                    <Briefcase className="w-3 h-3 mr-1 opacity-70" />
                                                    {contact.role}
                                                </span>
                                                <span className="flex items-center">
                                                    <Phone className="w-3 h-3 mr-1 opacity-70" />
                                                    {contact.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(contact)}
                                            className="p-2 text-zinc-400 hover:text-sky-400 hover:bg-sky-400/10 rounded-lg transition-colors"
                                            title="Redigera"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(contact.id)}
                                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                            title="Ta bort"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Sender Actions */}
                <div className="col-span-1 border border-white/10 rounded-3xl p-6 md:p-8 bg-black/40 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col h-full">
                        <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                            <ShieldAlert className="w-6 h-6 mr-3 text-red-500" />
                            Aktivera Larm
                        </h3>

                        <div className="space-y-6 flex-1">
                            <div>
                                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">Mottagare ({contacts.length})</label>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-zinc-300">
                                    {contacts.length === 0 ? (
                                        <span className="text-zinc-500 italic">Inga mottagare tillgängliga.</span>
                                    ) : (
                                        <span>Alla mottagare i listan kommer att få larmet via SMS. Vänligen dubbelkolla kontaktlistan innan du skickar.</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">SMS Meddelande</label>
                                <textarea
                                    name="smsMessage"
                                    rows={4}
                                    value={smsMessage}
                                    onChange={(e) => setSmsMessage(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none text-sm placeholder:text-zinc-600"
                                    placeholder="Skriv kris-meddelande här..."
                                ></textarea>
                                <p className="text-xs text-zinc-500 mt-2 flex justify-between">
                                    <span>{smsMessage.length} tecken</span>
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            {sendSuccess === true ? (
                                <div className="w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 py-4 rounded-2xl font-bold flex items-center justify-center animate-in fade-in zoom-in duration-300">
                                    <CheckCircle2 className="w-5 h-5 mr-3" />
                                    <span className="tracking-widest uppercase">LARM SKICKAT</span>
                                </div>
                            ) : (
                                <button
                                    onClick={handleSendSMS}
                                    disabled={contacts.length === 0 || isSending}
                                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white py-4 rounded-2xl font-bold shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group/btn relative overflow-hidden"
                                >
                                    {isSending ? (
                                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    ) : (
                                        <ShieldAlert className="w-5 h-5 mr-3 group-hover/btn:animate-bounce" />
                                    )}
                                    <span className="tracking-widest uppercase">
                                        {isSending ? 'SKICKAR...' : `SKICKA SMS TILL ${contacts.length} PERSONER`}
                                    </span>
                                </button>
                            )}
                            <p className="text-center text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mt-4">
                                Åtgärden går inte att ångra.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
