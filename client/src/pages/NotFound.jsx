import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ backgroundColor: '#111111', color: '#ffffff',height:'69.3vh'
     }}>
      <h1 className="display-1">404</h1>
      <h2>Página não encontrada</h2>
      <p>Desculpe, mas a página que você está tentando acessar não existe.</p>
      <Link to="/" className="btn btn-primary mt-3">Voltar para o Início</Link>
    </div>
  );
}