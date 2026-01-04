import { FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8">
            <span className="text-6xl">👨🏻‍💻</span>
          </div>
        </div>
        
        
        <p className="text-xl md:text-2xl text-claude-text-light mb-12 max-w-3xl mx-auto leading-relaxed">
          Learn by doing.<br />
          How to work with AI.<br />
          How AI works.<br />
          What to build with AI.<br />
          Build Systems.
        </p>
        
        <div className="flex items-center justify-center gap-6">
          <a 
            href="https://www.instagram.com/albert_dachi/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-claude-orange hover:text-claude-brown p-4 rounded-lg text-4xl transition-all duration-300 hover:scale-105"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://www.linkedin.com/in/dachi-chen/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-claude-orange hover:text-claude-brown p-4 rounded-lg text-4xl transition-all duration-300 hover:scale-105"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  )
}