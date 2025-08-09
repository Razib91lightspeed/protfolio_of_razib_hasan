'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import ProjectCard from '../../../components/ProjectCard';
import { getRepos } from '../../../lib/github';

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
    name: 'Smart_House',
    description: 'Smart Home Control System (Qt)',
    html_url: 'https://github.com/Razib91lightspeed/Smart_House',
    homepage: '',
    image: '/images/proj_5.jpg',
  },
];

export default function SectionProjects() {
  const [repos, setRepos] = useState(LOCAL_PROJECTS);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const r = await getRepos().catch(() => []);
        if (mounted && Array.isArray(r) && r.length) {
          // Dedupe by repo name in case local list overlaps remote
          const names = new Set();
          const merged = [...r, ...LOCAL_PROJECTS].filter(p => {
            const n = (p.name || '').toLowerCase();
            if (names.has(n)) return false;
            names.add(n);
            return true;
          });
          setRepos(merged);
        }
      } catch (e) {
        // stay on LOCAL_PROJECTS and show a soft message
        setError('GitHub rate limit reached or network error — showing local projects.');
      } finally {
        mounted && setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // Debounce the search input for nicer UX
  const [debouncedQ, setDebouncedQ] = useState('');
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQ(q), 150);
    return () => clearTimeout(debounceRef.current);
  }, [q]);

  const filtered = useMemo(() => {
    const query = debouncedQ.trim().toLowerCase();
    if (!query) return repos;
    return repos.filter((p) =>
      (p.name || '').toLowerCase().includes(query) ||
      (p.description || '').toLowerCase().includes(query)
    );
  }, [debouncedQ, repos]);

  return (
    <section id="projects" className="section py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Below are some of my notable projects.
          </p>
          {error && <p className="mt-2 text-sm text-amber-400">{error}</p>}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects…"
          aria-label="Search projects"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
        />
      </div>

      {loading && (
        <div className="mt-8 text-sm text-gray-500">Loading from GitHub…</div>
      )}

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProjectCard key={`${p.html_url}-${p.name}`} project={p} />
        ))}
      </div>

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
