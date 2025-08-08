export async function getRepos() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || process.env.GITHUB_USERNAME || 'Razib91lightspeed';
  try {
    const headers = {};
    if (process.env.GITHUB_TOKEN) headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, { headers, next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('GitHub error');
    const data = await res.json();
    return data.map(r => ({
      name: r.name,
      description: r.description,
      html_url: r.html_url,
      homepage: r.homepage,
      image: guessImage(r.name)
    }));
  } catch {
    return [];
  }
}

function guessImage(name) {
  const map = {
    'Automated_Drone_Delivery_System_With_SpringBoot': '/images/proj_1.jpg',
    'Traffic-Sign-Classification-using-CNN': '/images/proj_2.jpg',
    'House-Price-Prediction-Model': '/images/proj_3.jpg',
    'Autonomous_Vehicle': '/images/proj_4.jpg',
    'Smart_House': '/images/proj_5.jpg'
  };
  return map[name] || '/images/proj_1.jpg';
}