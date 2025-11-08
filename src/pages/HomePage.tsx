import { type Student } from '../App';

type Props = {
    students: Student[];
};
export default function HomePage({ students }: Props) {
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
                                    <h5 className="card-title">{student.name}</h5>
                                    <p className="card-text">Curso: {student.course}</p>
                                    <p className="card-text">Email: {student.email}</p>
                                    <p className="card-text">Edad: {student.edad}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}