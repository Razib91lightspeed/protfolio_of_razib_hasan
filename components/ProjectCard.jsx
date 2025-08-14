import Image from 'next/image';

export default function ProjectCard({ project }) {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const imgSrc = project?.image
    ? (project.image.startsWith('http') ? project.image : `${prefix}${project.image}`)
    : `${prefix}/images/proj_1.jpg`;

  const isSpecialProject = project.name === 'Snake_Game' || project.name === 'Pot_Hole';
  const imageContainerClasses = isSpecialProject ? 'relative w-full h-64' : 'relative w-full h-48';
  const imageClasses = isSpecialProject
    ? 'object-contain bg-black group-hover:scale-105 transition'
    : 'object-cover group-hover:scale-105 transition';

  return (
    <a
      href={project.html_url}
      target="_blank"
      rel="noreferrer"
      className="group rounded-2xl border border-yellow-300/20 bg-gradient-to-b from-yellow-400/10 to-yellow-300/5 shadow-lg hover:shadow-yellow-400/30 hover:-translate-y-1 transition overflow-hidden"
    >
      <div className={imageContainerClasses}>
        <Image
          src={imgSrc}
          alt={project.name || 'Project'}
          fill
          className={imageClasses}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          priority={false}
        />
      </div>
      <div className="p-5">
        {/* Title: wrap long words */}
        <h3 className="font-semibold text-lg break-words leading-snug">
          {project.name.replace(/_/g, ' ')}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 break-words">
          {project.description}
        </p>
        <div className="mt-4 flex gap-3 text-sm flex-wrap">
          <span className="px-2 py-1 rounded bg-white/10">GitHub</span>
          {project.homepage && <span className="px-2 py-1 rounded bg-white/10">Demo</span>}
        </div>
      </div>
    </a>
  );
}
