import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">UTP Alumnos</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio (Lista)</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Registrar Alumno</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}