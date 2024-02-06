import React, {FC, PropsWithChildren} from "react"
import classes from './ListItem.module.scss'
import type {Table} from "../../pages/main/Main";
import {handleCopyClick} from "../../../utils/copyUrl";
interface ListItemProps {
    data: Table
}

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({data}) => {

    return (
        <div className={classes.Row}>
            <div className={classes.RowItemOne}>{data.id}</div>
            <div className={classes.RowItemTwo} title={data.target}>{data.target}</div>
            <div className={classes.RowItemThree} onClick={() => handleCopyClick(data.short)}>
                {`https://front-test.hex.team/s/${data.short}`}
            </div>
            <div className={classes.RowItemFour}>{data.counter}</div>
        </div>
    );
};