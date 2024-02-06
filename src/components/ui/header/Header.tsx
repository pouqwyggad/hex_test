import classes from './Header.module.scss'
import {FC, PropsWithChildren} from "react"
import {Link} from "@tanstack/react-router";

interface HeaderProps {

}

export const Header: FC<PropsWithChildren<HeaderProps>> = ({}) => {


    return (
        <div className={classes.Header}>
            {localStorage.getItem("user")}
            <Link
                className={classes.Logout}
                to={"/auth/login"}
            >
                Выйти
            </Link>
        </div>
    )
}