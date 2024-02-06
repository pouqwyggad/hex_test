import React, {
    FC, PropsWithChildren,
} from 'react';
import {motion} from "framer-motion";
import classes from './Pagination.module.scss';
import {PagArrowLeftIcon} from '../../icons/PagArrowLeftIcon';
import {PagArrowRightIcon} from '../../icons/PagArrowRightIcon';


export const paginationMotion = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: 30,
    },
};

interface PaginationProps {
    onClick: (number: number) => void;
    clickHandler: (type: number) => void;
    separator: string;
    current: number;
    total: number;
}

export const Pagination: FC<PropsWithChildren<PaginationProps>> = (
    {
        clickHandler,
        separator,
        onClick,
        current,
        total,
    },
) => {
    const showAfterFirst = current < 5;
    const showBeforeLast = current > total - 4;

    const createArrayButtons = (quantity: number, startNumber: number) => {
        const newArr = [...Array.from({length: quantity})];
        return newArr.map((n, i) => startNumber + i);
    };

    const buttonsToRender = total > 8
        ? [
            1,
            showAfterFirst && createArrayButtons(4, 2),
            !showAfterFirst && separator,
            !(showAfterFirst || showBeforeLast) && createArrayButtons(3, current),
            !showBeforeLast && separator,
            showBeforeLast && createArrayButtons(4, total - 4),
            total,
        ]
            .flat()
            .filter(Boolean)
        : createArrayButtons(total, 1);

    return (
        <motion.div
            variants={paginationMotion}
            className={classes.PaginationWrapper}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <div className={classes.PaginationContainer}>

                <PagArrowLeftIcon onClick={() => clickHandler(-1)}/>

                <div className={classes.PaginationRow}>

                    {
                        buttonsToRender.map((number, index) => (number === separator ? (
                                    <div
                                        key={index}
                                        className={classes.Separator}
                                    >
                                        {separator}
                                    </div>
                                ) : (
                                    <button
                                        className={`${classes.Item} ${number === current ? classes.ItemActive : ''}`}
                                        onClick={() => onClick(+number)}
                                        data-page={number}
                                        type="button"
                                        key={index}
                                    >
                                        {number}
                                    </button>
                                )
                            )
                        )
                    }

                </div>

                <PagArrowRightIcon onClick={() => clickHandler(1)}/>

            </div>

        </motion.div>
    );
};
