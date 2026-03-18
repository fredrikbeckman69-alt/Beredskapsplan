"use client";

import { useState } from 'react';
import { Send, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ComposeEmail() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, bodyText }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send email');
      }

      setStatus('success');
      setTo('');
      setSubject('');
      setBodyText('');
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Send className="w-5 h-5 mr-2 text-gray-500" />
          New Message
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {status === 'success' && (
          <div className="p-3 bg-green-50 text-green-700 rounded-md flex items-center text-sm">
            <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
            Email sent successfully!
          </div>
        )}

        {status === 'error' && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md flex items-start text-sm">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
            {errorMessage}
          </div>
        )}

        <div>
          <label htmlFor="to" className="block text-xs font-medium text-gray-700 mb-1">To</label>
          <input
            type="email"
            id="to"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={status === 'sending'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50"
            placeholder="recipient@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            id="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={status === 'sending'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50"
            placeholder="Message subject"
          />
        </div>

        <div>
          <label htmlFor="bodyText" className="block text-xs font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="bodyText"
            required
            rows={6}
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            disabled={status === 'sending'}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none disabled:bg-gray-50"
            placeholder="Write your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'sending' ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  );
}
