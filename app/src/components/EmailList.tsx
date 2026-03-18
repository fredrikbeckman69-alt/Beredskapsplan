"use client";

import { useState, useEffect } from 'react';
import { RefreshCw, Inbox, AlertCircle } from 'lucide-react';

type Email = {
  id: string;
  subject: string;
  from: { emailAddress: { name: string; address: string } };
  receivedDateTime: string;
  isRead: boolean;
  bodyPreview: string;
};

export default function EmailList() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/emails?limit=10');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to fetch emails');
      }
      const data = await res.json();
      setEmails(data.emails || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Inbox className="w-5 h-5 mr-2 text-gray-500" />
          Inbox
        </h2>
        <button
          onClick={fetchEmails}
          disabled={loading}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50"
          title="Refresh"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
        {loading && !emails.length ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-pulse flex flex-col space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-md"></div>
              ))}
            </div>
          </div>
        ) : emails.length === 0 && !error ? (
          <div className="p-12 text-center text-gray-500">
            <Inbox className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>No emails found</p>
          </div>
        ) : (
          emails.map((email) => (
            <div 
              key={email.id} 
              className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                !email.isRead ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm ${!email.isRead ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                  {email.from?.emailAddress?.name || email.from?.emailAddress?.address || 'Unknown Sender'}
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {new Date(email.receivedDateTime).toLocaleDateString(undefined, { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <h3 className={`text-sm mb-1 ${!email.isRead ? 'font-bold text-gray-900' : 'text-gray-800'}`}>
                {email.subject || '(No Subject)'}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {email.bodyPreview}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
