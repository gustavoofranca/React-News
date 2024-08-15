import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [suggestedNews, setSuggestedNews] = useState([]);

  useEffect(() => {
    const apiKey = '8b3fd962c4db0561e0aaa07688791b20';
    const url = `https://gnews.io/api/v4/top-headlines?&token=${apiKey}&lang=en&country=us`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setNews(data.articles.slice(0, 5)))
      .catch((error) => console.error('Erro ao buscar as notícias:', error));
    fetch(url)
      .then((response) => response.json())
      .then((data) => setSuggestedNews(data.articles.slice(5, 10)))
      .catch((error) => console.error('Erro ao buscar as sugestões:', error));
  }, []);

  return (
    <div className='app'>
      <header className='cabecalho-site'>
        <div className='titulo-site'>React News</div>
        <nav className='nav-site'>
          <button className='botao-nav'>Home</button>
          <button className='botao-nav'>Política</button>
          <button className='botao-nav'>Tecnologia</button>
          <button className='botao-nav'>Esportes</button>
        </nav>
        <div className='container-barra-busca'>
          <input type='text' className='input-busca' placeholder='Buscar...' />
          <button className='botao-busca'>Buscar</button>
        </div>
      </header>
      <div className='container-principal'>
        <div className='container-noticias'>
          {news.length > 0 ? (
            news.map((item, index) => (
              <article className='artigo-noticia' key={index}>
                <div className='container-imagem-noticia'>
                  <img className='imagem-noticia' src={item.image} alt={item.title} />
                </div>
                <div className='conteudo-noticia'>
                  <h2 className='titulo-noticia'>{item.title}</h2>
                  <p className='descricao-noticia'>{item.description}</p>
                  <a href={item.url} target='_blank' rel='noopener noreferrer'>
                    <button className='botao-noticia'>Acessar</button>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <p>Nenhuma notícia encontrada.</p>
          )}
        </div>
        <div className='container-sugeridas'>
          <h3>Notícias Sugeridas</h3>
          {suggestedNews.length > 0 ? (
            suggestedNews.map((item, index) => (
              <article className='artigo-sugerida' key={index}>
                <div className='container-imagem-sugerida'>
                  <img className='imagem-sugerida' src={item.image} alt={item.title} />
                </div>
                <div className='conteudo-sugerida'>
                  <h4 className='titulo-sugerida'>{item.title}</h4>
                  <a href={item.url} target='_blank' rel='noopener noreferrer'>
                    <button className='botao-sugerida'>Ler Mais</button>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <p>Nenhuma sugestão encontrada.</p>
          )}
        </div>
      </div>
      <Rodape />
    </div>
  );
}

function Rodape() {
  return (
    <footer className="rodape-site">
      <p>&copy; 2024 React News. Todos os direitos reservados.</p>
      <p>
        Desenvolvido por <strong>Gustavo Henrique</strong>
      </p>
    </footer>
  );
}

export default App;
