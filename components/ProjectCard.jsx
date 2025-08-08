import Image from 'next/image';

export default function ProjectCard({ project }) {
  return (
    <a href={project.html_url} target="_blank" rel="noreferrer" className="card overflow-hidden group">
      <div className="relative w-full h-48">
        <Image src={project.image || '/images/proj_1.jpg'} alt={project.name} fill className="object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold">{project.name}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{project.description}</p>
        <div className="mt-4 flex gap-3 text-sm">
          <span className="px-2 py-1 rounded bg-white/10">GitHub</span>
          {project.homepage ? <span className="px-2 py-1 rounded bg-white/10">Demo</span> : null}
        </div>
      </div>
    </a>
  );
}