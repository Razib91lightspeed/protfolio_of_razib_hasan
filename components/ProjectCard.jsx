import Image from 'next/image';

export default function ProjectCard({ project }) {
  // prefix for GitHub Pages subpath ('' locally)
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // If the image is an absolute URL, keep it. If it's local, prefix it.
  const imgSrc = project?.image
    ? (project.image.startsWith('http')
        ? project.image
        : `${prefix}${project.image}`)
    : `${prefix}/images/proj_1.jpg`;

  return (
    <a href={project.html_url} target="_blank" rel="noreferrer" className="card overflow-hidden group">
      <div className="relative w-full h-48">
        <Image
          src={imgSrc}
          alt={project.name || 'Project'}
          fill
          className="object-cover group-hover:scale-105 transition"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          priority={false}
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold">{project.name}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-4 flex gap-3 text-sm">
          <span className="px-2 py-1 rounded bg-white/10">GitHub</span>
          {project.homepage ? <span className="px-2 py-1 rounded bg-white/10">Demo</span> : null}
        </div>
      </div>
    </a>
  );
}
