import classes from './Login.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {TextField} from "../../ui/textField/TextField";
import {Button} from "../../ui/button/Button";
import {motion} from "framer-motion";
import {pageMotion} from "../../../motions/pageMotion";
import {Link, useNavigate} from "@tanstack/react-router";

interface LoginProps {

}

export const Login: FC<PropsWithChildren<LoginProps>> = ({}) => {

    const navigate = useNavigate({from: "/auth/login"});

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

        const data = await response.json();
// обработать ошибку
        console.log(response)

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", user.username);

        console.log(data)

         navigate({to: "/", replace: true})
    }

    return (
        <motion.div
            key={1}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
            variants={pageMotion}
            className={classes.Login}
        >

            <TextField
                onChange={changeUserValueHandler}
                user={user.username}
                name="username"
                text="Username"
            />

            <TextField
                onChange={changeUserValueHandler}
                user={user.password}
                name="password"
                text="Password"
            />

            <Button
                onClick={handleLogin}
                text="Войти"
            />

        </motion.div>
    )
}