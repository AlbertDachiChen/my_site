'use client';

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="fixed top-0 w-full bg-claude-cream/95 backdrop-blur-sm z-50 border-b border-claude-brown/10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold text-claude-text hover:text-claude-orange transition-colors">
            Albert Chen
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/projects" className="text-claude-text-light hover:text-claude-text transition-colors">
              Projects
            </Link>
            <Link href="/reads" className="text-claude-text-light hover:text-claude-text transition-colors">
              Books
            </Link>
            <Link href="/technicals" className="text-claude-text-light hover:text-claude-text transition-colors">
              Technicals
            </Link>
            <Link href="/photos" className="text-claude-text-light hover:text-claude-text transition-colors">
              Photos
            </Link>
          </div>

          <button 
            className="md:hidden flex flex-col space-y-1 p-2 hover:bg-claude-beige rounded transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-claude-text transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-claude-text transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-claude-text transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-64 opacity-100 border-t border-claude-brown/10' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 space-y-2">
            <Link 
              href="/projects" 
              className="block px-4 py-2 text-claude-text-light hover:text-claude-text hover:bg-claude-beige rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              href="/reads" 
              className="block px-4 py-2 text-claude-text-light hover:text-claude-text hover:bg-claude-beige rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>
            <Link 
              href="/technicals" 
              className="block px-4 py-2 text-claude-text-light hover:text-claude-text hover:bg-claude-beige rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Technicals
            </Link>
            <Link 
              href="/photos" 
              className="block px-4 py-2 text-claude-text-light hover:text-claude-text hover:bg-claude-beige rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Photos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}