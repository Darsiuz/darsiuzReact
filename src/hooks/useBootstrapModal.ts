import { useRef, useEffect } from "react";
import { Modal } from "bootstrap";

export function useBootstrapModal() {
    const modalReff = useRef<HTMLDivElement | null>(null);
    let modalInstance: Modal | null = null;

    useEffect(() => {
        if (modalReff.current) {
            modalInstance = new Modal(modalReff.current, { focus: true });
        }
    }, []);

    const open = () => {
        modalInstance?.show();
    };

    const close = () => {
        modalInstance?.hide();
    };

    return { modalReff, open, close };
}
