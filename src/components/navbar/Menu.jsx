import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <div className="navbar-menu">
      
      <div className="navbar-start">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/projects" className="navbar-item">
          Projects
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <a href="https://github.com/spencerstith" className="button is-dark">
            <strong>GitHub</strong>
          </a>
        </div>
        <div className="navbar-item">
          <a href="https://www.linkedin.com/in/spencer-stith/" className="button is-info">
            <strong>LinkedIn</strong>
          </a>
        </div>
      </div>
    </div>
  );
}