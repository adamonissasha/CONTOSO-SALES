import s from './productCard.module.scss';

export default function ProductCard({ setUpdateProductButtonActive }) {
    return (
        <div className={s.card}>
            <h2 style={{ paddingLeft: "20px", width: "70px" }}>1</h2>
            <h2 style={{ width: "480px" }}>Шариковая ручка</h2>
            <h2 style={{ width: "120px" }}>123456</h2>
            <h2 style={{ width: "120px" }}>6000</h2>
            <h2 style={{ width: "120px" }}>1200</h2>
            <h2 style={{ width: "120px" }}>2.34</h2>
            <img onClick={() => setUpdateProductButtonActive(true)} className={s.edit} src=".\images\edit.png" alt="edit" />
            <img className={s.remove} src=".\images\remove.png" alt="delete" />
        </div>
    );
}