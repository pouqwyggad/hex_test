import React, {FC, PropsWithChildren, useState} from 'react';
import type {User} from '../../../interfaces/global';
import {TextField} from '../../ui/TextField/TextField';
import {Button} from '../../ui/Button/Button';
import {useNavigate} from '@tanstack/react-router';
import {login} from '../../../api/api';
import {pageMotion} from '../../../motions/pageMotion';
import {motion} from 'framer-motion';
import classes from './Login.module.scss';

interface LoginProps {

}

export const Login: FC<PropsWithChildren<LoginProps>> = ({}) => {
    const navigate = useNavigate({from: "/auth/Login"});
    const [error, setError] = useState(false);

    const [user, setUser] = useState<User>({username: "", password: ""});

    const changeUserValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }))

    };

    const handleLogin = async () => {
        try {
            const data = await login(user);

            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", user.username);

            navigate({ to: "/", replace: true });
        } catch (error) {
            console.error(`Произошла ошибка при входе: ${error}`);
            setError(true);
        }
    };

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
