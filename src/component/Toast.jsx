import React, { useEffect } from 'react'

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000) // 2초 후 자동으로 사라짐

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '0',
        right: '0',
        margin: '0 auto',
        width: 'fit-content',
        backgroundColor: '#ff6b6b',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        fontSize: '16px',
        fontWeight: '500',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      {message}
    </div>
  )
}

export default Toast
