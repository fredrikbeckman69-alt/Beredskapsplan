import React from 'react';
import EmailList from '@/components/EmailList';
import ComposeEmail from '@/components/ComposeEmail';
import { Mail } from 'lucide-react';

export const metadata = {
  title: 'Emails | Beredskapsplan',
  description: 'Shared mailbox administration',
};

export default function EmailsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="flex items-center space-x-3">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Exchange Mailbox</h1>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ComposeEmail />
        </div>
        <div className="lg:col-span-2">
          <EmailList />
        </div>
      </div>
    </div>
  );
}
