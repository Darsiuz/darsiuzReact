import type { ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
    modalRef: React.RefObject<HTMLDivElement | null>;
};

export default function ModalWrapper({ title, children, modalRef }: Props) {
    return (
        <div className="modal fade" ref={modalRef} tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" />
                    </div>

                    <div className="modal-body">{children}</div>

                </div>
            </div>
        </div>
    );
}
