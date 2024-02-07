import React, {
    FC, PropsWithChildren,
} from 'react';
import {motion} from "framer-motion";
import {PagArrowLeftIcon} from '../../icons/PagArrowLeftIcon';
import {PagArrowRightIcon} from '../../icons/PagArrowRightIcon';
import {paginationMotion} from "../../../motions/paginationMotion";
import {createArrayButtons} from "../../../utils/createArrayButtons";
import classes from './Pagination.module.scss';

interface PaginationProps {
    clickHandler: (type: number) => void;
    onClick: (number: number) => void;
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
            className={classes.PaginationWrapper}
            variants={paginationMotion}
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
