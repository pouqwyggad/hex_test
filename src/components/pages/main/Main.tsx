import classes from './Main.module.scss'
import {FC, PropsWithChildren, useEffect, useState} from "react"
import {Header} from "../../ui/header/Header";
import {useNavigate} from "@tanstack/react-router";
import {ListItem} from "../../ui/listItem/ListItem";
import {Pagination} from "../../ui/Pagination/Pagination";
import {AddLink} from "../../ui/addLink/AddLink";
import {ListHeader} from "../../ui/listHeader/ListHeader";

interface MainProps {

}

export interface Table {
    id: number
    short: string
    target: string
    counter: string
}

const ROWS_PER_PAGE = 10;


export interface Filters {
    target: "asc_target" | "desc_target"
    short: "asc_short" | "desc_short"
    counter: "asc_counter" | "desc_counter"
}

export const Main: FC<PropsWithChildren<MainProps>> = ({}) => {
    const navigate = useNavigate({from: "/"})
    const [tableInfo, setTableInfo] = useState<Table[]>([]);
    const [step, setStep] = useState(0);
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);

    const [filters, setFilters] = useState<Filters>({
        short: "asc_short",
        target: "asc_target",
        counter: "asc_counter",
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://front-test.hex.team/api/statistics?order=${filters.short}&order=${filters.target}&order=${filters.counter}&offset=${step}&limit=${ROWS_PER_PAGE}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            const data = await response.json();

            setTotalPages(Math.ceil(Number(response.headers.get("x-total-count")) / ROWS_PER_PAGE));
            setTableInfo(data);
        }

        if (localStorage.getItem("token")) {
            fetchData();
            return;
        }

        navigate({to: "/auth/login", replace: true});

    }, [step, filters]);

    const handleStep = (stepType: number) => {
        const newStep = step + stepType * ROWS_PER_PAGE;

        if (newStep < 0 || newStep >= totalPages * ROWS_PER_PAGE) return;

        setStep(newStep);

        if (stepType < 0 && currentPage > 1) {
            setCurrentPage(s => s - 1);
        } else if (stepType > 0 && currentPage < totalPages) {
            setCurrentPage(s => s + 1);
        }
    }

    const buttonPageClick = (number: number) => {
        const newStep = (number - 1) * ROWS_PER_PAGE;
        setStep(newStep);
        setCurrentPage(number);
    }

    return (
        <div className={classes.Container}>

            <Header/>

            <main className={classes.Main}>

                <AddLink addLink={setTableInfo}/>

                <div className={classes.Table}>

                    <ListHeader
                        filters={filters}
                        changeFilters={setFilters}
                    />

                    <div className={classes.Body}>
                        {
                            tableInfo.map((el: Table) => (
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