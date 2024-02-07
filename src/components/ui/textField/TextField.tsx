import classes from './TextField.module.scss'
import React, {FC, PropsWithChildren} from "react"

interface TextFieldProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error?: boolean
    user: string
    name: string
    text: string
}

export const TextField: FC<PropsWithChildren<TextFieldProps>> = (
    {
        onChange,
        error,
        user,
        name,
        text,
    }) => {
    return (
        <div className={classes.FormInput}>
            <input
                required
                className={`${classes.Input} ${user ? classes.InputActive : ""}`}
                style={error ? {borderColor: "red"} : {} }
                value={user}
                type={`${name === 'password' ? "password" : "text"}`}
                name={name}
                placeholder={""}
                onChange={(e) => onChange(e)}
            />
            <label
                htmlFor={name}
                style={error ? {color: "red"} : {} }
                className={classes.Label}
            >
                {text}
            </label>
        </div>
    )
}
