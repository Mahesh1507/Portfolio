import React, { useState, useEffect, ReactNode } from 'react';
import { Github, Linkedin, Mail, Terminal, Cpu, BrainCircuit as Circuit, Code2, Layers, Workflow, ChevronDown, Wifi, Bluetooth, Settings, CircuitBoard } from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.tech-card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CircuitBoard className="text-blue-400 animate-float" />
              <span className="text-xl font-semibold">MS</span>
            </div>
            <div className="hidden md:flex space-x-4">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="nav-link"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-800/90"></div>
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
            alt="Tech Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="terminal-window max-w-3xl mx-auto mb-12 animate-float">
              <div className="terminal-header">
                <div className="terminal-dot dot-red"></div>
                <div className="terminal-dot dot-yellow"></div>
                <div className="terminal-dot dot-green"></div>
              </div>
              <div className="text-sm md:text-base">
                <span className="text-green-400">user@system</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400">~/firmware</span>
                <span className="text-gray-400">$ </span>
                <span className="terminal-cursor">whoami</span>
                <div className="mt-4 text-xl">
                  <span className="text-blue-400">{'>'}</span> Maheshwar
                  <br />
                  <span className="text-blue-400">{'>'}</span> Firmware Developer
                  <br />
                  <span className="text-gray-400">// Crafting efficient and reliable embedded systems for next-gen devices</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-6 mb-12">
              <SocialLink icon={<Github />} href="#" />
              <SocialLink icon={<Linkedin />} href="#" />
              <SocialLink icon={<Mail />} href="mailto:maheshwar@example.com" />
            </div>

            <button 
              onClick={() => scrollToSection('skills')}
              className="mx-auto flex items-center animate-bounce"
            >
              <ChevronDown className="text-blue-400" size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center section-title">
            Technical Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkillCard 
              icon={<CircuitBoard />}
              title="Microcontrollers"
              items={['ESP32', 'Arduino UNO', 'ATmega328PU', 'Raspberry Pi']}
            />
            <SkillCard 
              icon={<Terminal />}
              title="Languages & Libraries"
              items={['C/C++', 'Python', 'OpenCV', 'TensorFlow Lite']}
            />
            <SkillCard 
              icon={<Wifi />}
              title="Communication"
              items={['UART', 'I2C', 'SPI', 'WiFi/BLE']}
            />
            <SkillCard 
              icon={<Settings />}
              title="Tools & Frameworks"
              items={['PlatformIO', 'Arduino IDE', 'Git', 'Docker']}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-gray-800/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center section-title">Featured Projects</h2>
          <div className="project-grid">
            <ProjectCard 
              icon={<Layers />}
              title="Industrial Vision System"
              description="Developed an embedded vision system for quality control in manufacturing, implementing real-time image processing on ESP32-CAM with custom algorithms."
              tech={["ESP32", "OpenCV", "C++", "I2C"]}
            />
            <ProjectCard 
              icon={<Workflow />}
              title="OCR-based Process Automation"
              description="Created an intelligent OCR system for industrial documentation processing, utilizing Raspberry Pi and machine learning for text detection and extraction."
              tech={["Raspberry Pi", "Python", "TensorFlow", "UART"]}
            />
            <ProjectCard 
              icon={<Circuit />}
              title="Smart Sensor Network"
              description="Engineered a distributed sensor network for industrial monitoring using Arduino and ESP32 devices with custom communication protocols."
              tech={["ATmega328PU", "ESP32", "SPI", "WiFi"]}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center section-title">Professional Journey</h2>
          <div className="space-y-12 max-w-4xl mx-auto">
            <ExperienceCard 
              title="Firmware Developer"
              company="Embedded Solutions Inc."
              period="2023 - Present"
              description="Developing firmware solutions for international clients in industrial automation and smart manufacturing, with a focus on image processing and embedded systems."
              achievements={[
                "Successfully delivered custom firmware solutions for German and US-based industrial clients",
                "Implemented efficient image processing algorithms on resource-constrained devices",
                "Developed robust communication protocols for industrial sensor networks",
                "Created scalable firmware architectures for various microcontroller platforms"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gray-800/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 section-title">Let's Connect</h2>
          <p className="text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
            Looking for a firmware developer with expertise in industrial automation and embedded vision systems? 
            Let's discuss how I can help bring your industrial IoT and automation projects to life with efficient and reliable solutions.
          </p>
          <a 
            href="mailto:maheshwar@example.com"
            className="inline-flex items-center px-8 py-4 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 contact-button"
          >
            <Mail className="mr-2" size={24} />
            Get in Touch
          </a>
        </div>
      </section>

      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>© 2024 Maheshwar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

interface SocialLinkProps {
  icon: ReactNode;
  href: string;
}

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  items: string[];
}

interface ProjectCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tech: string[];
}

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

function SocialLink({ icon, href }: SocialLinkProps) {
  return (
    <a 
      href={href}
      className="w-12 h-12 flex items-center justify-center rounded-full tech-card text-gray-400 hover:text-blue-400"
    >
      {icon}
    </a>
  );
}

function SkillCard({ icon, title, items }: SkillCardProps) {
  return (
    <div className="tech-card rounded-xl p-6 circuit-line animate-slide-up">
      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 text-blue-400 skill-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-gray-400 flex items-center">
            <Code2 size={16} className="mr-2 text-blue-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ icon, title, description, tech }: ProjectCardProps) {
  return (
    <div className="tech-card rounded-xl p-8 animate-slide-up">
      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 text-blue-400 skill-icon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t, i) => (
          <span 
            key={i} 
            className="px-3 py-1 bg-gray-800 rounded-full text-sm text-blue-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({ title, company, period, description, achievements }: ExperienceCardProps) {
  return (
    <div className="tech-card rounded-xl p-8 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-blue-400">{company}</p>
        </div>
        <span className="text-gray-500 mt-2 md:mt-0">{period}</span>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-2">
        {achievements.map((achievement, i) => (
          <li key={i} className="text-gray-400 flex items-start achievement-item">
            <Cpu size={16} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;