import { RepositoryItem } from "./RepositoryItem";
import { useState, useEffect } from "react";
import "../styles/repositories.scss";

//https://api.github.com/orgs/rocketseat/repos

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [newRepository, setNewRepository] = useState("")

  const getRepository = () => {
    
    setNewRepository(newRepository)

    !newRepository ? 
    fetch(`https://api.github.com/orgs/microsoft/repos`)
      .then((response) => response.json())
      .then((data) => setRepositories(data)) : 
      fetch(`https://api.github.com/orgs/${[newRepository]}/repos`)
      .then((response) => response.json())
      .then((data) => setRepositories(data))
    
    console.log(newRepository)
    return newRepository;
  }

  return (
    <section className="repository-list">
      <h1>Repositories List</h1>
      <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewRepository(e.target.value)}
            value={newRepository}
          />
          <button type="submit" data-testid="add-task-button" onClick={getRepository}>
            Search repository
          </button>
        </div>
      <ul>
        {repositories.map((repository) => (
          <RepositoryItem key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}
