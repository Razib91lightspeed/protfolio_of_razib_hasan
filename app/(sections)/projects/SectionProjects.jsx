'use client';
import { useMemo, useRef, useState } from 'react';
import ProjectCard from '../../../components/ProjectCard';

const LOCAL_PROJECTS = [
  {
    name: 'Automated_Drone_Delivery_System_With_SpringBoot',
    description: 'Distributed pizza/drone delivery system with Spring Boot microservices',
    html_url: 'https://github.com/Razib91lightspeed/Automated_Drone_Delivery_System_With_SpringBoot',
    homepage: '',
    image: '/images/proj_1.jpg',
  },
  {
    name: 'Traffic-Sign-Classification-using-CNN',
    description: 'Deep learning classifier for traffic signs (CNN)',
    html_url: 'https://github.com/Razib91lightspeed/Traffic-Sign-Classification-using-CNN',
    homepage: '',
    image: '/images/proj_2.jpg',
  },
  {
    name: 'House-Price-Prediction-Model',
    description: 'Finland house price prediction with multiple regressors',
    html_url: 'https://github.com/Razib91lightspeed/House-Price-Prediction-Model',
    homepage: '',
    image: '/images/proj_3.jpg',
  },
  {
    name: 'Autonomous_Vehicle',
    description: 'Self driving car (Embedded/IoT) – Arduino + sensors',
    html_url: 'https://github.com/Razib91lightspeed/Autonomous_Vehicle',
    homepage: '',
    image: '/images/proj_4.jpg',
  },
  {
    name: 'Snake_Game',
    description: 'Snake Game (JavaScript, React)',
    html_url: 'https://github.com/Razib91lightspeed/snake-game',
    homepage: '',
    image: '/images/snake_game.png',
  },
  {
    name: 'Pot_Hole',
    description: 'Pothole Detection App (Swift, iOS)',
    html_url: 'https://github.com/Razib91lightspeed/pothole_app',
    homepage: '',
    image: '/images/pot_hole.png',
  },
  {
    name: 'Smart_House',
    description: 'Smart Home Control System (Qt)',
    html_url: 'https://github.com/Razib91lightspeed/Smart_House',
    homepage: '',
    image: '/images/proj_5.jpg',
  },
];

export default function SectionProjects() {
  const [q, setQ] = useState('');
  const debounceRef = useRef(null);
  const [debouncedQ, setDebouncedQ] = useState('');

  const projects = useMemo(() => {
    return LOCAL_PROJECTS.filter(
      p => p.image && p.html_url && p.image.startsWith('/images/')
    );
  }, []);

  const handleChange = (e) => {
    setQ(e.target.value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQ(e.target.value);
    }, 150);
  };

  const filtered = useMemo(() => {
    const query = debouncedQ.trim().toLowerCase();
    if (!query) return projects;
    return projects.filter(
      (p) =>
        (p.name || '').toLowerCase().includes(query) ||
        (p.description || '').toLowerCase().includes(query)
    );
  }, [debouncedQ, projects]);

  return (
    <section id="projects" className="section py-20">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Below are some of my notable projects.
          </p>
        </div>
        <input
          value={q}
          onChange={handleChange}
          placeholder="Search projects…"
          aria-label="Search projects"
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Project Grid */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div
            key={`${p.html_url}-${p.name}`}
            className="rounded-2xl border border-yellow-300/20 bg-gradient-to-b from-yellow-400/10 to-yellow-300/5 p-4 shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-1 transition"
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* GitHub link */}
      <div className="mt-10 text-center">
        <a
          href="https://github.com/Razib91lightspeed"
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          More on GitHub
        </a>
      </div>
    </section>
  );
}
