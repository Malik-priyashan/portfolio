'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      setStatus('Message sent!');
      setShowPopup(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        setShowPopup(false);
        setStatus('');
      }, 2000);
    } else {
      setStatus(`Error: ${result.error}`);
    }
  };

return (
  <div className="relative w-full flex justify-center min-h-screen items-center bg-[var(--background)] p-4" style={{ marginTop: '-1cm' }}>

    
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 flex flex-col gap-6 transform transition-all duration-500 hover:shadow-3xl animate-fadeInUp"
    >
    

      {/* Name Field */}
      <div className="relative group">
        <label 
          htmlFor="name" 
          className="absolute -top-2 left-4 px-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 rounded transition-colors group-focus-within:text-blue-700 dark:group-focus-within:text-blue-300"
        >
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your full name"
          onChange={handleChange}
          required
          value={formData.name}
          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-600"
        />
      </div>

      {/* Email Field */}
      <div className="relative group">
        <label 
          htmlFor="email" 
          className="absolute -top-2 left-4 px-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 rounded transition-colors group-focus-within:text-blue-700 dark:group-focus-within:text-blue-300"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="your.email@example.com"
          onChange={handleChange}
          required
          value={formData.email}
          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 hover:border-gray-300 dark:hover:border-gray-600"
        />
      </div>

      {/* Message Field */}
      <div className="relative group">
        <label 
          htmlFor="message" 
          className="absolute -top-2 left-4 px-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 rounded transition-colors group-focus-within:text-blue-700 dark:group-focus-within:text-blue-300"
        >
          Your Message
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Tell us what's on your mind..."
          onChange={handleChange}
          required
          rows={5}
          value={formData.message}
          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-300 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none hover:border-gray-300 dark:hover:border-gray-600"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="relative mt-4 w-full px-8 py-4 rounded-xl border-2 border-blue-600 hover:border-blue-800 dark:border-blue-400 dark:hover:border-blue-300 bg-transparent text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={status === 'Sending...'}
      >
        {/* Button background animation */}
        <div className="absolute inset-0 border-2 border-blue-700 dark:border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        
        {/* Button content */}
        <div className="relative flex items-center justify-center gap-3">
          {status === 'Sending...' ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="animate-pulse">Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </div>
      </button>

      {/* Decorative bottom element */}
      <div className="flex justify-center mt-4">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-400"></div>
        </div>
      </div>
    </form>

      {/* Popup for Message Sent */}
      {showPopup && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white font-bold shadow-2xl animate-fadeInUp text-lg flex items-center gap-2">
            <span className="text-2xl">✅</span> Message sent!
          </div>
        </div>
      )}
      {/* Error message (not popup) */}
      {status && status.startsWith('Error') && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold shadow-2xl animate-fadeInUp text-lg flex items-center gap-2">
            <span className="text-2xl">❌</span> {status}
          </div>
        </div>
      )}
    </div>
  );
}
