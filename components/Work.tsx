export default function Work() {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce solution built with Next.js, featuring real-time inventory management and secure payment processing.",
      tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      image: "project1"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and intuitive design.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: "project2"
    },
    {
      title: "Analytics Dashboard",
      description: "A comprehensive analytics dashboard with interactive charts, real-time data visualization, and custom reporting.",
      tags: ["React", "D3.js", "Python", "FastAPI"],
      image: "project3"
    }
  ]

  return (
    <section id="work" className="py-20 px-6 bg-claude-beige">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-claude-text mb-12 text-center">
          Selected Work
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-claude-cream rounded-xl h-48 mb-6 flex items-center justify-center">
                <span className="text-claude-text-light">Project Image</span>
              </div>
              
              <h3 className="text-xl font-semibold text-claude-text mb-3">
                {project.title}
              </h3>
              
              <p className="text-claude-text-light mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="bg-claude-cream text-claude-text px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <button className="text-claude-orange hover:text-claude-brown font-medium transition-colors">
                View Project →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}