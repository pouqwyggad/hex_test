import React, {FC, PropsWithChildren} from 'react';
import type {Filters} from '../../../interfaces/global';
import {DropDownArrowIcon} from '../../icons/DropDownArrowIcon';
import classes from './ListHeader.module.scss';


interface ListHeaderProps {
    changeFilters: React.Dispatch<React.SetStateAction<Filters>>
    filters: Filters
}

export const ListHeader: FC<PropsWithChildren<ListHeaderProps>> = (
    {
        changeFilters,
        filters,
    }) => {

    const handleChangeFilter = (value: string, target: string) => {
        changeFilters(prevState => ({
            ...prevState,
            [target]: value === `asc_${target}` ? `desc_${target}` : `asc_${target}`,
        }))
    };

    return (
        <div className={classes.HeaderRow}>

            <div className={classes.HeaderRowOne}>
                id
            </div>


            <div
                className={classes.HeaderRowTwo}
            >
              <span
                  className={classes.ClickSection}
                  onClick={() => handleChangeFilter(filters.target, "target")}
              >
                    target

                <DropDownArrowIcon
                    rotate={filters.target === "asc_target" ? 0 : 180}
                />

              </span>

            </div>


            <div className={classes.HeaderRowThree}>
               <span
                   className={classes.ClickSection}
                   onClick={() => handleChangeFilter(filters.short, "short")}
               >
                short

                <DropDownArrowIcon
                    rotate={filters.short === "asc_short" ? 0 : 180}
                />
                 </span>
            </div>

            <div className={classes.HeaderRowFour}>
                  <span
                      className={classes.ClickSection}
                      onClick={() => handleChangeFilter(filters.counter, "counter")}
                  >
                counter

                <DropDownArrowIcon
                    rotate={filters.counter === "asc_counter" ? 0 : 180}
                />
                  </span>
            </div>

        </div>
    )
}
