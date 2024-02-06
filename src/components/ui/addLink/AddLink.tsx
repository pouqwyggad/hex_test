import classes from './AddLink.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {TextField} from "../textField/TextField";
import {Button} from "../button/Button";
// @ts-ignore
import DOMPurify from 'dompurify';
import {Table} from "../../pages/main/Main";


interface AddLinkProps {
    addLink: React.Dispatch<React.SetStateAction<Table[]>>;
}

export const AddLink: FC<PropsWithChildren<AddLinkProps>> = ({addLink}) => {
    const [link, setLink] = useState("");
    const [error, setError] = useState(false);

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value);
    };

    const request = async () => {

       if( validateHandler(link)) {
           const response = await fetch(`https://front-test.hex.team/api/squeeze?link=${link}`, {
               method: "POST",
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   Authorization: "Bearer " + localStorage.getItem("token"),
               },
           });

           const data = await response.json();

           addLink((prevState) => ([
               data,
               ...prevState,
           ]));

       } else {
           alert("Неверная ссылка!")
       }
    }

    const validateHandler = (link: string) => {
        const urlPattern = /^(https?:\/\/)/;

        if (!urlPattern.test(link)) return false;

        const clearLink = DOMPurify.sanitize(link);

        if (clearLink !== link) return false;

        return true;
    }


    return (
        <div className={classes.AddLink}>

            <TextField
                user={link}
                name={"link"}
                onChange={handleChangeValue}
                text={"Добавьте ссылку"}
            />

            <Button
                text={"Добавить"}
                onClick={request}
            />

        </div>
    )
}