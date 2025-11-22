import { useStudents } from '../context/StudentContext';

export default function HomePage() {
    const { students, deleteStudent } = useStudents();

    return (
        <div>
            <h2>Lista de Alumnos Registrados</h2>
            <hr />
            {students.length === 0 ? (
                <p className="text-muted">Aún no hay alumnos registrados. Ve a la pestaña "Registrar".</p>
            ) : (
                <div className="row">

                    {students.map(student => (
                        <div className="col-md-4" key={student.id}>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title">{student.name}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">ID: {student.id}</h5>
                                    </div>
                                    <p className="card-text">Curso: {student.course}</p>
                                    <p className="card-text">Email: {student.email}</p>
                                    <p className="card-text">Edad: {student.edad}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button className="btn btn-danger" onClick={() => deleteStudent(student.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}