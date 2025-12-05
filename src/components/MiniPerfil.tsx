import { useRef } from "react";
import { Modal as BootstrapModal } from "bootstrap";

type Props = {
    id: number;
    name: string;
    email: string;
    course: string;
    edad: number;
};

export default function MiniPerfil({ id, name, email, course, edad }: Props) {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const openModal = () => {
        if (modalRef.current) {
            const modal = new BootstrapModal(modalRef.current, {
                focus: false
            });
            modal.show();
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={openModal}>
                Detalles
            </button>

            <div className="modal" ref={modalRef} data-bs-focus="false" aria-labelledby={`label-${id}`}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`label-${id}`}>
                                Perfil de Estudiante
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                tabIndex={-1}
                            />
                        </div>

                        <div className="modal-body">
                            <p>ID: {id}</p>
                            <p>Nombre: {name}</p>
                            <p>Email: {email}</p>
                            <p>Curso: {course}</p>
                            <p>Edad: {edad}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
