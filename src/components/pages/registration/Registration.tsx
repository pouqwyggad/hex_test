import classes from './Registration.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {TextField} from "../../ui/textField/TextField";
import {Button} from "../../ui/button/Button";
import {pageMotion} from "../../../motions/pageMotion";
import {motion} from "framer-motion";

interface RegistrationProps {
}

export const Registration: FC<PropsWithChildren<RegistrationProps>> = ({}) => {
    const [user, setUser] = useState<Record<string, string>>({username: "", password: ""});
    const [error, setError] = useState(false);

    const changeUserValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRegister = async () => {
        const response = await fetch(`https://front-test.hex.team/api/register?username=${user.username}&password=${user.password}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            setError(true);
            return;
        }

        const data = await response.json();
    }

    return (
        <motion.div
            className={classes.Registration}
            variants={pageMotion}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            key={1}
        >

            <TextField
                onChange={changeUserValueHandler}
                user={user.username}
                name="username"
                text="Username"
                error={error}
            />

            <TextField
                onChange={changeUserValueHandler}
                user={user.password}
                name="password"
                text="Password"
                error={error}
            />

            <Button
                onClick={handleRegister}
                text="Регистрация"
            />

        </motion.div>
    )
}
