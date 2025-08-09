'use client';
import Image from 'next/image';

const skills = [
  { label: 'Programming Languages: Java, C++, Python, JavaScript', value: 85 },
  { label: 'Front-End Development: Flutter, Qt Design Studio, JavaFX, React, Vue.js', value: 80 },
  { label: 'Back-End Development: Node.js', value: 70 },
  { label: 'Data Visualization & Analysis: Tableau, Power BI, MySQL, DynamoDB', value: 80 },
  { label: 'DevOps & Tools: Git, Docker, Raspberry Pi, Arduino', value: 90 },
  { label: 'Cloud Platforms: AWS, Azure', value: 80 },
  { label: 'Mobile App Development: React Native, iOS (Swift)', value: 80 },
  { label: 'Machine Learning & Embedded Systems (IoT)', value: 80 },
  { label: 'Operating Systems: macOS, Windows, Linux', value: 98 },
];

export default function SkillsPanel() {
  return (
    <aside className="card p-6 lg:sticky lg:top-24">
      {/* Profile */}
      <div className="flex items-center gap-6">
       {/* Bigger square image */}
<div className="relative !w-32 !h-32 shrink-0 overflow-hidden rounded-lg shadow-lg">
  <Image
    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/about-me.png`}
    alt="Razib Hasan"
    fill
    className="object-cover"
    sizes="128px"
    priority
  />
</div>


        {/* Profile text */}
        <div className="text-base leading-6">
          <div><span className="text-gray-500">Name:</span> Razib Hasan</div>
          <div><span className="text-gray-500">Job Role:</span> Software Engineer</div>
          <div><span className="text-gray-500">Experience:</span> 1 Years 3 Months</div>
          <div><span className="text-gray-500">Address:</span> Ruskontie 55, 33710, Tampere, Finland</div>
        </div>
      </div>

      {/* Skills */}
      <h3 className="mt-6 font-semibold">Skills</h3>
      <ul className="mt-3 space-y-4">
        {skills.map((s, i) => (
          <li key={i}>
            <div className="text-xs mb-2">{s.label}</div>
            <div className="h-2 rounded bg-white/10 overflow-hidden">
              <div
                className="h-2 bg-brand"
                style={{ width: `${s.value}%` }}
                aria-valuenow={s.value}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
