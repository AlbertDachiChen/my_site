export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-claude-text mb-8">
          Let's Work Together
        </h2>
        
        <p className="text-xl text-claude-text-light mb-12 max-w-2xl mx-auto">
          I'm always interested in new opportunities and exciting projects. 
          Whether you have a question or just want to say hi, I'd love to hear from you.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-claude-beige rounded-xl p-6">
            <div className="w-12 h-12 bg-claude-orange rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-claude-text mb-2">Email</h3>
            <p className="text-claude-text-light">your.email@example.com</p>
          </div>
          
          <div className="bg-claude-beige rounded-xl p-6">
            <div className="w-12 h-12 bg-claude-orange rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 11.914c2.234 0 4.042-1.81 4.042-4.042s-1.808-4.042-4.042-4.042-4.042 1.81-4.042 4.042 1.808 4.042 4.042 4.042zm6.14 4.042c0 2.234-1.808 4.042-4.042 4.042s-4.042-1.808-4.042-4.042c0-2.234 1.808-4.042 4.042-4.042s4.042 1.808 4.042 4.042z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-claude-text mb-2">LinkedIn</h3>
            <p className="text-claude-text-light">linkedin.com/in/yourname</p>
          </div>
          
          <div className="bg-claude-beige rounded-xl p-6">
            <div className="w-12 h-12 bg-claude-orange rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-claude-text mb-2">GitHub</h3>
            <p className="text-claude-text-light">github.com/yourusername</p>
          </div>
        </div>
        
        <button className="bg-claude-orange hover:bg-claude-brown text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg">
          Send Message
        </button>
      </div>
    </section>
  )
}