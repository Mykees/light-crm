import React from "react";


const Input = ({name, label, value, onChange, placeholder, type="text", error=""}) => {
    return (
        <div className="form-group mb-3">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                id={name}
                name={name}
                type={type}
                className={"form-control" + (error && " is-invalid")}
                placeholder={placeholder}/>
            {error && <p className="invalid-feedback">{error}</p>}

        </div>
    )
}

export default Input