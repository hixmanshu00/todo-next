import React from 'react'
interface ModalProps{
    modelOpen: boolean,
    setModelOpen : (open: boolean) => boolean | void,
    children: React.ReactNode
}
const Modal: React.FC<ModalProps> = ({modelOpen, setModelOpen, children}) => {
    
    return (
        <div>
            <dialog id="my_modal_3" className={`modal ${modelOpen ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={()=> setModelOpen(false)}>✕</button>
                    {children}
                </div>
            </dialog>
        </div>
    )
}

export default Modal