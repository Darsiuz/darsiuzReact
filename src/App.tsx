import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

export type Student = {
    id: number;
    name: string;
    email: string;
    course: string;
    edad: number;
};

function App() {

    const [students, setStudents] = useState<Student[]>([]);

    const handleAddStudent = (name: string, course: string, email: string, edad: number) => {
        const newStudent: Student = {
            id: Date.now(),
            name: name,
            email: email,
            course: course,
            edad: edad
        };

        setStudents(prevStudents => [...prevStudents, newStudent]);
    };
    return (
        <>
            {/* El Header tendrá los links de navegación */}
            <Header />
            <div className="container mt-4">
                {/* Aquí se define qué componente mostrar según la URL */}
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage students={students} />}
                    />
                    <Route
                        path="/register"
                        element={<RegisterPage onAddStudent={handleAddStudent} />}
                    />
                </Routes>
            </div>
        </>
    )
}
export default App