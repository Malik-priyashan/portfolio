'use client';
import { useState, useEffect } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    setShowErrorPopup(false);
    setShowSuccessPopup(false);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        setStatus('');
        setShowSuccessPopup(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 4000);
      } else {
        setStatus('');
        setErrorMessage(result.error || 'Failed to send message');
        setShowErrorPopup(true);
      }
    } catch (error) {
      setStatus('');
      setErrorMessage('Network error. Please try again.');
      setShowErrorPopup(true);
    }
  };

  // Auto-remove error popup after 3 seconds
  useEffect(() => {
    if (showErrorPopup) {
      const timer = setTimeout(() => {
        setShowErrorPopup(false);
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showErrorPopup]);

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

      {/* Success Popup - Centered in form */}
      {showSuccessPopup && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm rounded-3xl">
          <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white p-8 rounded-2xl shadow-2xl transform animate-bounceIn max-w-sm mx-4">
            {/* Confetti animation background */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-100"></div>
              <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-pink-300 rounded-full animate-ping delay-300"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping delay-500"></div>
              <div className="absolute bottom-0 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-ping delay-700"></div>
            </div>
            
            {/* Success content */}
            <div className="relative text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-green-100 mb-4">Thank you for reaching out! I&apos;ll get back to you soon.</p>
              
              {/* Followers celebration */}
              <div className="flex justify-center items-center gap-2 mt-4 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white animate-pulse"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full border-2 border-white animate-pulse delay-200"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white animate-pulse delay-400"></div>
                </div>
                <div className="text-sm text-green-100">
                  <span className="font-semibold">+3 followers</span>
                  <div className="text-xs opacity-80">joined your network!</div>
                </div>
              </div>
            </div>
            
            {/* Sparkle effects */}
            <div className="absolute -top-2 -right-2 text-2xl animate-spin">✨</div>
            <div className="absolute -bottom-2 -left-2 text-xl animate-spin delay-500">⭐</div>
          </div>
        </div>
      )}

      {/* Error Popup - Centered in form */}
      {showErrorPopup && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm rounded-3xl">
          <div className="relative bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 text-white p-6 rounded-2xl shadow-2xl transform animate-shakeX max-w-sm mx-4">
            {/* Error content */}
            <div className="text-center">
              <div className="text-5xl mb-3 animate-bounce">❌</div>
              <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
              <p className="text-red-100 text-sm mb-3">{errorMessage}</p>
              <div className="text-xs text-red-200 opacity-80">This message will disappear in a moment...</div>
            </div>
            
            {/* Error pulse effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-red-300 animate-ping opacity-20"></div>
          </div>
        </div>
      )}
    </form>
    </div>
  );
}
