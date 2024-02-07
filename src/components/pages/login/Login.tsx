import classes from './Login.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {TextField} from "../../ui/textField/TextField";
import {Button} from "../../ui/button/Button";
import {motion} from "framer-motion";
import {pageMotion} from "../../../motions/pageMotion";
import {useNavigate} from "@tanstack/react-router";

interface LoginProps {

}

export const Login: FC<PropsWithChildren<LoginProps>> = ({}) => {
    const navigate = useNavigate({from: "/auth/login"});
    const [error, setError] = useState(false);

    const [user, setUser] = useState<Record<string, string>>({username: "", password: ""});

    const changeUserValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))

    };

    const handleLogin = async () => {
        const response = await fetch(`https://front-test.hex.team/api/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })

        if (!response.ok) {
            setError(true);
            return;
        }

        const data = await response.json();

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", user.username);

        navigate({to: "/", replace: true})
    }

    return (
        <motion.div
            className={classes.Login}
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
                onClick={handleLogin}
                text="Войти"
            />

        </motion.div>
    )
}
