import {FC, PropsWithChildren, useEffect, useState} from 'react';
import type {Filters, Table} from '../../../interfaces/global';
import {Header} from '../../ui/Header/Header';
import {useNavigate} from '@tanstack/react-router';
import {ListItem} from '../../ui/ListItem/ListItem';
import {Pagination} from '../../ui/Pagination/Pagination';
import {AddLink} from '../../ui/AddLink/AddLink';
import {ListHeader} from '../../ui/ListHeader/ListHeader';
import {getStatistics} from '../../../api/api';
import {ROWS_PER_PAGE} from '../../../constants/constants';
import classes from './Main.module.scss';

interface MainProps {
}

export const Main: FC<PropsWithChildren<MainProps>> = ({}) => {
    const navigate = useNavigate({from: "/"});

    const [tableInfo, setTableInfo] = useState<Table[]>([]);
    const [step, setStep] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState<Filters>({
        short: "asc_short",
        target: "asc_target",
        counter: "asc_counter",
    });

    const handleStep = (stepType: number) => {
        const newStep = step + stepType * ROWS_PER_PAGE;

        if (newStep < 0 || newStep >= totalPages * ROWS_PER_PAGE) return;

        setStep(newStep);

        if (stepType < 0 && currentPage > 1) {
            setCurrentPage(s => s - 1);
        } else if (stepType > 0 && currentPage < totalPages) {
            setCurrentPage(s => s + 1);
        }
    };

    const buttonPageClick = (number: number) => {
        const newStep = (number - 1) * ROWS_PER_PAGE;
        setStep(newStep);
        setCurrentPage(number);
    };

    const fetchData = async () => {
        try {
            const {data, total} = await getStatistics(filters, step);

            setTotalPages(total);
            setTableInfo(data);

        } catch (error) {
            console.error(`Ошибка при запросе данных: ${error}`);
        }
    }

    useEffect(() => {

        if (localStorage.getItem("token")) {
            fetchData();
            return;
        }

        navigate({to: "/auth/login", replace: true});

    }, [step, filters]);

    return (
        <div className={classes.Container}>

            <Header/>

            <main className={classes.Main}>

                <AddLink request={fetchData}/>

                <div className={classes.Table}>

                    <ListHeader
                        filters={filters}
                        changeFilters={setFilters}
                    />

                    <div className={classes.Body}>
                        {
                            tableInfo.length && tableInfo.map((el: Table) => (
                                    <ListItem
                                        key={el.id}
                                        data={el}
                                    />
                                )
                            )
                        }
                    </div>

                </div>

                <Pagination
                    clickHandler={handleStep}
                    onClick={buttonPageClick}
                    current={currentPage}
                    total={totalPages}
                    separator={"..."}
                />

            </main>

        </div>
    );
};
