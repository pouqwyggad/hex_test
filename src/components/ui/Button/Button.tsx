import React, { FC, PropsWithChildren } from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
    text: string;
    onClick: () => void;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = (
    {
        text,
        onClick,
    },
) => {

    return (
        <button
            type="button"
            className={classes.Button}
            onClick={onClick}
        >
            {text}
        </button>
    );
};