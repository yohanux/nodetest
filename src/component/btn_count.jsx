import React from 'react'

const BtnCount = ({ label, value, onCountChange }) => {
  const handleClick = () => {
    onCountChange(value)
  }

  return (
    <button 
      onClick={handleClick}
      style={{
        padding: '8px 16px',
        margin: '4px',
        fontSize: '24px',
        fontWeight: '700',
        cursor: 'pointer',
        color: '#0068ff',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5'
      }}
    >
      {label}
    </button>
  )
}

export default BtnCount
