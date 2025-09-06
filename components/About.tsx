export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-claude-text mb-12 text-center">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-claude-text-light leading-relaxed">
              I'm a creative professional with a passion for building meaningful digital experiences. 
              With expertise in modern web technologies and a keen eye for design, I bring ideas to life 
              through clean, efficient code and thoughtful user interfaces.
            </p>
            
            <p className="text-lg text-claude-text-light leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source 
              projects, or enjoying the outdoors. I believe in continuous learning and am always excited 
              to take on new challenges.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-8">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Python'].map((skill) => (
                <span 
                  key={skill}
                  className="bg-claude-beige text-claude-text px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-claude-beige rounded-2xl p-8 h-80 flex items-center justify-center">
            <div className="text-claude-text-light text-lg">
              Your photo would go here
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}