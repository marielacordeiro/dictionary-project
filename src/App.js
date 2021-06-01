import './App.css';
import Dictionary from "./Dictionary";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <main>
          <Dictionary defaultKeyword="sunset"/>
        </main>
      <footer className="App-footer">
        <small>
          <a href="https://github.com/marielacordeiro/dictionary-project" target="_blank" rel="noreferrer">
            Coded by Mariela Cordeiro
          </a>
        </small>
      </footer>  
      </div>
    </div>
  );
}
