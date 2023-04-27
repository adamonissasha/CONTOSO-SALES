import s from './header.module.scss';

function Header() {
    return (
        <div className={s.header}>
            <div className={s.label}>CONTOSO sales</div>
            {!localStorage.getItem('user') &&
                <h2>Выйти</h2>}
        </div>
    );
}

export default Header;