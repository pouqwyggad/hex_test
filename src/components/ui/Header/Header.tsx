import React, {FC, PropsWithChildren} from 'react';
import {Link} from '@tanstack/react-router';
import {clearUserInfo} from "../../../constants/constants";
import classes from './Header.module.scss';

interface HeaderProps {

}

export const Header: FC<PropsWithChildren<HeaderProps>> = ({}) => (
    <div className={classes.Header}>

        {localStorage.getItem("user") || <>&nbsp;</>}

        <Link
            className={classes.Logout}
            onClick={clearUserInfo}
            to={"/auth/login"}
        >
            Выйти
        </Link>

    </div>
);