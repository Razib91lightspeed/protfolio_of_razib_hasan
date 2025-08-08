 'use client';
import Image from 'next/image';
 import { motion } from 'framer-motion';
import SkillsPanel from '../../../components/SkillsPanel';
import Counter from '../../../components/Counter'; // keep your relative import

 export default function SectionAbout() {
   return (
     <section id="about" className="section py-20">

     <div className="grid lg:grid-cols-2 gap-10 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <SkillsPanel />
        </motion.div>

         <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
           <h2 className="text-3xl font-bold">About Me</h2>
           <p className="mt-4 text-gray-600 dark:text-gray-300">
             I am a passionate and results‑driven software developer with strong foundations in automation, embedded systems, IoT, cloud computing, and data‑driven ML projects.
           </p>
           <p className="mt-3 text-gray-600 dark:text-gray-300">
             I believe technology should enhance quality of life. I enjoy working with teams to ship impactful products.
           </p>
           <ul className="mt-6 space-y-2 text-sm">
             <li>🔍 <b>Profile:</b> Machine Learning, Data Science & Analytics</li>
             <li>🌐 <b>Domain:</b> Computer Sciences & Software Engineering</li>
             <li>🎓 <b>Education:</b> Bachelor of Engineering</li>
             <li>🌍 <b>Languages:</b> English, Finnish, Bangla, Hindi, Malay</li>
             <li>📊 <b>BI:</b> Power BI, Looker, Tableau</li>
             <li>🛠️ <b>Other:</b> Web Dev, PySpark, Excel, Git, JIRA, Confluence, Bitbucket, GA & SEO</li>
             <li>🚀 <b>Interests:</b> Traveling, Fishing, Astrophysics</li>
           </ul>
         </motion.div>
       </div>

       {/* Counters */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
         <Counter label="Achievements" value={20} />
         <Counter label="Projects" value={42} />
         <Counter label="Competitions Attended" value={10} />
         <Counter label="Won" value={4} />
       </div>
     </section>
   );
 }
