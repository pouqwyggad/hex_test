import React, {FC, PropsWithChildren} from 'react';
import type {Table} from '../../../interfaces/global';
import {handleCopyClick} from '../../../utils/copyUrl';
import classes from './ListItem.module.scss';

interface ListItemProps {
    data: Table
}

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({data}) => (
    <div className={classes.Row}>

        <div className={classes.RowItemOne}>{data.id}</div>

        <div
            className={classes.RowItemTwo}
            title={data.target}
        >
            {data.target}
        </div>

        <div
            className={classes.RowItemThree}
            onClick={() => handleCopyClick(data.short)}
        >
            {`https://front-test.hex.team/s/${data.short}`}
        </div>

        <div className={classes.RowItemFour}>{data.counter}</div>
    </div>
);
