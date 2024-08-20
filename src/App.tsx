import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
}

const App: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/search/repositories?q=stars:>1&s=stars&type=repositories"
        );
        setRepos(response.data.items);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Популярные проекты на GitHub</h1>
      <ul>
        {repos.map((repo: Repository) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name} — ⭐ {repo.stargazers_count}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
