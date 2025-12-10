import ModalWrapper from "./ModalWrapper";
import { useBootstrapModal } from "../hooks/useBootstrapModal";

type MiniPerfilProps = {
    id: number;
    name: string;
    email: string;
    course: string;
    edad: number;
    onExposeOpen?: (id: number, open: () => void) => void;
};

export default function MiniPerfil({ id, name, email, course, edad, onExposeOpen }: MiniPerfilProps) {
    const { modalReff, open } = useBootstrapModal();

    if (onExposeOpen) onExposeOpen(id, open);

    return (
        <>
            <button className="btn btn-primary" onClick={open}>
                Detalles
            </button>

            <ModalWrapper title="Perfil de Estudiante" modalRef={modalReff}>
                <p>ID: {id}</p>
                <p>Nombre: {name}</p>
                <p>Email: {email}</p>
                <p>Curso: {course}</p>
                <p>Edad: {edad}</p>
            </ModalWrapper>
        </>
    );
}
