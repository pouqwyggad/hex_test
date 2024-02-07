import React, {FC, PropsWithChildren, useState} from 'react';
import {TextField} from '../TextField/TextField';
import {Button} from '../Button/Button';
import {squeezeLink} from '../../../api/api';
import classes from './AddLink.module.scss';

interface AddLinkProps {
    request: () => void
}

export const AddLink: FC<PropsWithChildren<AddLinkProps>> = ({request}) => {
    const [link, setLink] = useState("");
    const [error, setError] = useState(false);

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value);

    const requestHandler = async () => await squeezeLink(link, setError).then(() => {
        setLink("");
        request();
    });

    return (
        <div className={classes.AddLink}>

            <TextField
                user={link}
                name={"link"}
                onChange={handleChangeValue}
                text={"Добавьте ссылку"}
                error={error}
            />

            <Button
                text={"Добавить"}
                onClick={requestHandler}
            />

        </div>
    );
};