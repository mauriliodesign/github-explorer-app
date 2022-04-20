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

    if (!newRepository) {
      fetch(`https://api.github.com/orgs/microsoft/repos`)
        .then((response) => response.json())
        .then((data) => setRepositories(data))
    } else {
      fetch(`https://api.github.com/orgs/${[newRepository]}/repos`)
        .then((response) => {
        //Verifica se a resposta é válida (não é um erro como 404, etc)
        if(response.ok) {
          // Caso seja válida, retorna o json da mesma maneira
          return response.json()
        } else {
          //Caso a response não seja válida, retorna um erro
          throw new Error('Não foi possível encontrar o repositório')
        }
      })
        .then((data) => setRepositories(data))
        .catch(err => alert(err.message)) //Adiciona um catch para recuperar caso dê um erro na requisição e exibir o erro em tela
    }
  }

  return (
    <section className="repository-list">
      <h1>Search Repository</h1>
      <div className="input-group">
          <input 
           className="input-search"
            type="text" 
            placeholder="Search for a organization github repository" 
            onChange={(e) => setNewRepository(e.target.value)}
            value={newRepository}
          />
          <button className="button-search" type="submit" onClick={getRepository}>
            Search repository
          </button>
        </div>
      <ul>
        {repositories.map((repository) => (
          <RepositoryItem  key={repository.name} repository={repository} />
        ))}
      </ul>
    </section>
  );
}
