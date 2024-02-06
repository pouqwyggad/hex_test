import classes from './Layout.module.scss'
import {FC, PropsWithChildren, useEffect} from "react"
import {Header} from "../../ui/header/Header";
import {useNavigate} from "@tanstack/react-router";

interface LayoutProps {

}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({children}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if ((localStorage.getItem("token") === "undefined" || !localStorage.getItem("token")) && !window.location.href.includes('auth')) {
            navigate({to: "/auth/login"})
        }
    }, [window.location.href]);

    return (
        <div className={classes.Layout}>
            {children}
        </div>
    )
}