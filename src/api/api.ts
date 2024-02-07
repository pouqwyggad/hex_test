import React from 'react';
import type {Filters, StatisticsResponse, User} from '../interfaces/global';
import {validateHandler} from '../utils/validateLink';
import {ROWS_PER_PAGE} from '../constants/constants';

export const API_URL = 'https://front-test.hex.team/api';

export const squeezeLink = async (
    link: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    try {
        setError(false);

        if (validateHandler(link)) {
            const response = await fetch(`${API_URL}/squeeze?link=${link}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log(response)

            if (!response.ok) {
                console.error(`Ошибка запроса: ${response.status}`);
                setError(true);
                return;
            }

            setError(false);

        } else {
            alert('Неверная ссылка!');
            setError(true);
        }
    } catch (error) {
        console.error(`Произошла ошибка: ${error}`);
        setError(true);
    }
};

export const getStatistics = async (filters: Filters, step: number): Promise<StatisticsResponse> => {
    try {
        const response = await fetch(`${API_URL}/statistics?order=${filters.short}&order=${filters.target}&order=${filters.counter}&offset=${step}&limit=${ROWS_PER_PAGE}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = '/auth/Login';
            } else {
                return {
                    data: [],
                    total: 0,
                };
            }
        }

        const data = await response.json();

        return {
            data,
            total: Math.ceil(Number(response.headers.get("x-total-count")) / ROWS_PER_PAGE),
        };
    } catch (error) {
        console.error(`Ошибка при запросе данных: ${error}`);
        return {
            data: [],
            total: 0,
        };
    }
};


export const register = async (user: User): Promise<Response> => {
    const response = await fetch(`${API_URL}/register?username=${user.username}&password=${user.password}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Ошибка при регистрации: ${response.status}`);
    }

    return response;
};

export const login = async (user: User) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error(`Ошибка при входе: ${response.status}`);
    }

    return await response.json();
};

