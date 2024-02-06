import classes from './TextField.module.scss'
import React, {FC, PropsWithChildren} from "react"

interface TextFieldProps {
    user: string
    name: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    text: string
}

export const TextField: FC<PropsWithChildren<TextFieldProps>> = (
    {
        user,
        name,
        onChange,
        text
    }) => {
    return (
        <div className={classes.FormInput}>
            <input
                required
                className={`${classes.Input} ${user ? classes.InputActive : ""}`}
                value={user}
                type={`${name === 'password' ? "password" : "text"}`}
                name={name}
                placeholder={""}
                onChange={(e) => onChange(e)}
            />
            <label
                htmlFor={name}
                className={classes.Label}
            >
                {text}
            </label>
        </div>
    )
}