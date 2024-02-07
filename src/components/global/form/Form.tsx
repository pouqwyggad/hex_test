import classes from './Form.module.scss';
import {FC, PropsWithChildren} from 'react';
import {Link, Outlet} from '@tanstack/react-router';

interface FormProps {
}

export const Form: FC<PropsWithChildren<FormProps>> = ({}) => {
    return (
        <div className={classes.Form}>
            <div className={classes.Container}>
                <div className={classes.Navigation}>

                    <Link
                        to={'/auth/login'}
                        activeProps={{className: classes.ActiveLink}}
                        className={classes.Link}
                    >
                        Вход
                    </Link>

                    <Link
                        to={'/auth/registration'}
                        activeProps={{className: classes.ActiveLink}}
                        className={classes.Link}
                    >
                        Регистрация
                    </Link>

                </div>

                <Outlet/>

            </div>
        </div>
    );
};
