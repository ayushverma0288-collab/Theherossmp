'use client';
import { useState } from 'react';
import AuthModal from './components/AuthModal';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Auth Modal Box */}
      <AuthModal />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-red-600 text-center mb-6">THEHEROSMP</h1>
        
        {/* Rest of the homepage content */}
      </div>
    </main>
  );
}
