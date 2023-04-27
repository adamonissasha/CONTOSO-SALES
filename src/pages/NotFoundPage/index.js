import React from 'react';
import s from './notFound.module.scss'

export default function NotFoundPage() {
    return (
        <div className="wrapper">
            <div className={s.text}>
                <h1>404</h1>
                <h2>Страница не найдена</h2>
            </div>
        </div>
    );
}
