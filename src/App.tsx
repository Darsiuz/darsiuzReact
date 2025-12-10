import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import EditStudent from './pages/EditStudent';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import { StudentContext, type Student } from './context/StudentContext';

const API_URL = 'http://localhost:4000/api/students';
const header = { 'x-secret-key': 'UTP2025' };

const axi = axios.create({
    headers: header
});

function App() {

    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axi.get(API_URL);
                setStudents(response.data);
            } catch (error) {
                console.error('Error al cargar los alumnos:', error);
                toast.error('Error al cargar los alumnos');
                setStudents([]); // Establecer un estado vacío en caso de error
            }
        };
        fetchStudents();
    }, []);

    const handleDeleteStudent = async (id: number) => {
        try {
            await axi.delete(`${API_URL}/${id}`);
            setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
            toast.success('Alumno eliminado exitosamente');
        } catch (error) {
            console.error('Error eliminando estudiante:', error);
            toast.error('Error al eliminar el estudiante');
        }
    };

    const handleAddStudent = async (name: string, email: string, course: string, edad: number) => {
        try {
            const newStudent = { name, email, course, edad };
            const response = await axi.post(API_URL, newStudent);
            setStudents(prevStudents => [...prevStudents, response.data]);
            toast.success('Alumno agregado exitosamente');
        } catch (error) {
            console.error('Error para crear estudiante:', error);
            toast.error('Error al agregar el alumno');
        }
    };

    const handleEditStudent = async (id: number, name: string, email: string, course: string, edad: number) => {
        try {
            const payload = { name, email, course, edad };
            await axi.patch(`${API_URL}/${id}`, payload);
            const updatedStudent: Student = { id, name, email, course, edad };
            setStudents(prevStudents => prevStudents.map(student => student.id === id ? updatedStudent : student));
            toast.success('Alumno actualizado exitosamente');
        } catch (error) {
            console.error('Error actualizando estudiante:', error);
            toast.error('Error al actualizar el estudiante');
        }
    };

    const countStudents = async () => {
        try {
            const response = await axi.get(API_URL+'/total/count');
            return response.data.total;
        } catch (error) {
            console.error('Error al contar estudiantes:', error);
            return 0;
        }
    };

    return (
        <StudentContext.Provider value={{
            students: students,
            addStudent: handleAddStudent,
            deleteStudent: handleDeleteStudent,
            editStudent: handleEditStudent,
            getStudentById: (id: number) => students.find(student => student.id === id),
            countStudents: countStudents
        }}>
            <ToastContainer />
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/edit/:id" element={<EditStudent />} />
                    <Route path="*" element={<h2>Página no encontrada</h2>} />
                </Routes>
            </div>
        </StudentContext.Provider>
    );

}
export default App;