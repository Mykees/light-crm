import React from "react";


const Select = ({name, value, label, onChange, placeholder, error="", children}) => {

    return (
        <div className="form-group mb-3">
            <label htmlFor={name}>{label}</label>
            <select value={value} onChange={onChange} className={"form-select" + (error && " is-invalid")} id={name} name={name}>
                {children}
            </select>
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    )
}

export default Select