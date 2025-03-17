import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal, Cpu, Code2, CircuitBoard, ChevronDown } from 'lucide-react';
import { FirmwareBackground } from './components/FirmwareBackground';
import { ErrorLogger } from './components/ErrorLogger';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Track mouse movement for card hover effects
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ErrorLogger />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CircuitBoard className="text-blue-400" />
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
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <FirmwareBackground variant="code" opacity={0.5} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 mt-24"
            >
              <div className="terminal-window max-w-3xl mx-auto mb-12">
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

              <motion.div 
                className="flex justify-center space-x-6 mb-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full tech-card text-gray-400 hover:text-blue-400"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full tech-card text-gray-400 hover:text-blue-400"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="mailto:maheshwar@example.com"
                  className="w-12 h-12 flex items-center justify-center rounded-full tech-card text-gray-400 hover:text-blue-400"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </motion.div>

              <motion.button 
                onClick={() => scrollToSection('skills')}
                className="mx-auto flex items-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown className="text-blue-400" size={32} />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 relative">
          <div className="absolute inset-0 w-full h-full">
            <FirmwareBackground variant="code" opacity={0.5} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-16 text-center section-title"
            >
              Technical Expertise
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <SkillCard 
                icon={<CircuitBoard className="w-6 h-6" />}
                title="Microcontrollers"
                items={['ESP32', 'Arduino UNO', 'ATmega328PU', 'Raspberry Pi']}
              />
              <SkillCard 
                icon={<Terminal className="w-6 h-6" />}
                title="Languages & Libraries"
                items={['C/C++', 'Python', 'OpenCV', 'TensorFlow Lite']}
              />
              <SkillCard 
                icon={<Code2 className="w-6 h-6" />}
                title="Communication"
                items={['UART', 'I2C', 'SPI', 'WiFi/BLE']}
              />
              <SkillCard 
                icon={<Cpu className="w-6 h-6" />}
                title="Tools & Frameworks"
                items={['PlatformIO', 'Arduino IDE', 'Git', 'Docker']}
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 relative">
          <div className="absolute inset-0 w-full h-full">
            <FirmwareBackground variant="code" opacity={0.5} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-16 text-center section-title"
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="tech-card p-6 rounded-lg circuit-line"
                >
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm text-blue-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 relative">
          <div className="absolute inset-0 w-full h-full">
            <FirmwareBackground variant="code" opacity={0.5} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
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
        <section id="contact" className="py-32 relative">
          <div className="absolute inset-0 w-full h-full">
            <FirmwareBackground variant="code" opacity={0.5} />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-8 section-title">Let's Connect</h2>
            <p className="text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
              Looking for a firmware developer with expertise in industrial automation and embedded vision systems? 
              Let's discuss how I can help bring your industrial IoT and automation projects to life with efficient and reliable solutions.
            </p>
            <motion.a 
              href="mailto:maheshwar@example.com"
              className="inline-flex items-center px-8 py-4 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 contact-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="mr-2" size={24} />
              Get in Touch
            </motion.a>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 Maheshwar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

function SkillCard({ icon, title, items }: SkillCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="tech-card rounded-xl p-6 circuit-line"
    >
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
    </motion.div>
  );
}

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

function ExperienceCard({ title, company, period, description, achievements }: ExperienceCardProps) {
  return (
    <div className="tech-card rounded-xl p-8">
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
          <li key={i} className="text-gray-400 flex items-start">
            <Cpu size={16} className="mr-2 mt-1 text-blue-400 flex-shrink-0" />
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  );
}

const skills = [
  {
    name: 'Embedded Systems',
    description: 'Development of firmware for microcontrollers and embedded systems',
  },
  {
    name: 'Real-time Systems',
    description: 'Design and implementation of real-time operating systems and applications',
  },
  {
    name: 'Hardware Interfaces',
    description: 'Integration with various communication protocols and peripherals',
  },
  {
    name: 'System Architecture',
    description: 'Design of scalable and efficient embedded system architectures',
  },
  {
    name: 'Testing & Debugging',
    description: 'Comprehensive testing and debugging of embedded systems',
  },
  {
    name: 'Documentation',
    description: 'Creation of detailed technical documentation and specifications',
  },
];

const projects = [
  {
    title: 'Smart Home Controller',
    description: 'Developed a firmware solution for a smart home controller using ESP32.',
    tech: ['ESP32', 'FreeRTOS', 'MQTT', 'WiFi'],
  },
  {
    title: 'Industrial Sensor Network',
    description: 'Created a robust sensor network for industrial monitoring applications.',
    tech: ['STM32', 'CAN Bus', 'Modbus', 'C++'],
  },
  {
    title: 'Wearable Health Monitor',
    description: 'Built firmware for a wearable device tracking vital health metrics.',
    tech: ['nRF52', 'BLE', 'Sensors', 'Battery Management'],
  },
];