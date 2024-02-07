import React, {FC, PropsWithChildren, useState} from 'react';
import type {User} from '../../../interfaces/global';
import {TextField} from '../../ui/TextField/TextField';
import {Button} from '../../ui/Button/Button';
import {register} from '../../../api/api';
import {useNavigate} from "@tanstack/react-router";
import {motion} from 'framer-motion';
import {pageMotion} from '../../../motions/pageMotion';
import classes from './Registration.module.scss';

interface RegistrationProps {
}

export const Registration: FC<PropsWithChildren<RegistrationProps>> = ({}) => {
    const navigate = useNavigate({from: "/auth/registration"});
    const [user, setUser] = useState<User>({username: "", password: ""});
    const [error, setError] = useState(false);

    const changeUserValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const registerHandler = async () => {
        try {
            const response = await register(user);

            if (!response.ok) {
                setError(true);
                return;
            }

            navigate({to: "/auth/login"});

        } catch (error) {
            console.error(`Произошла ошибка при регистрации: ${error}`);
        }
    };

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
                onClick={registerHandler}
                text="Регистрация"
            />

        </motion.div>
    )
}
