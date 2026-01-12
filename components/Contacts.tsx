
import React, { useState } from 'react';
import { EmergencyContact } from '../types';
import { 
  UserPlusIcon, 
  TrashIcon, 
  ChatBubbleBottomCenterTextIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

interface ContactsProps {
  contacts: EmergencyContact[];
  onAdd: (contact: Omit<EmergencyContact, 'id'>) => void;
  onRemove: (id: string) => void;
}

const Contacts: React.FC<ContactsProps> = ({ contacts, onAdd, onRemove }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Phone' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || (!formData.phone && !formData.email)) return;
    onAdd(formData);
    setFormData({ name: '', phone: '', email: '', type: 'Phone' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Emergency Contacts</h2>
          <p className="text-gray-500 text-sm">Trusted individuals who will be alerted after 48h of inactivity.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 font-bold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all"
        >
          <UserPlusIcon className="h-5 w-5" />
          <span>Add Contact</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Smith"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Alert Method</label>
              <select
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as any})}
              >
                <option value="Phone">SMS (Phone)</option>
                <option value="Email">Email</option>
                <option value="AppUser">Existing App User</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1..."
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={() => setIsAdding(false)} 
              className="px-4 py-2 text-gray-500 font-bold hover:text-gray-700"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100"
            >
              Save Contact
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map(contact => (
          <div key={contact.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${
                contact.type === 'Phone' ? 'bg-green-50 text-green-600' :
                contact.type === 'Email' ? 'bg-blue-50 text-blue-600' :
                'bg-purple-50 text-purple-600'
              }`}>
                {contact.type === 'Phone' && <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />}
                {contact.type === 'Email' && <EnvelopeIcon className="h-6 w-6" />}
                {contact.type === 'AppUser' && <DevicePhoneMobileIcon className="h-6 w-6" />}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{contact.name}</h4>
                <p className="text-xs text-gray-500 flex flex-col">
                  {contact.phone && <span>{contact.phone}</span>}
                  {contact.email && <span>{contact.email}</span>}
                </p>
              </div>
            </div>
            <button 
              onClick={() => onRemove(contact.id)}
              className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
        {contacts.length === 0 && (
          <div className="col-span-full py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium italic">No emergency contacts configured yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
