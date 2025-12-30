import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'

export default function Modal({ children, open, className = '', ...props }) {
  const dialogRef = useRef()
  useEffect(() => {
    if (open) {
      dialogRef.current.showModal()
    }
  }, [open])
  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal')
  )
}
