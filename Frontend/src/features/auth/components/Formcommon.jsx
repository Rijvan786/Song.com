import React from 'react'

const Formcommon = ({
  type = 'text',
  label,
  placeholder,
  value,
  setvalue,
  id,
  required = false,
  headerAction,
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="form-group">
      {label && (
        <div className="form-label-row">
          <label htmlFor={inputId}>{label}</label>
          {headerAction}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        placeholder={placeholder}
        id={inputId}
        required={required}
        autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : 'on'}
      />
    </div>
  )
}

export default Formcommon