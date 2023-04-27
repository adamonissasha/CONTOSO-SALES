import s from './clientCard.module.scss';

export default function ClientCard({ setUpdateClientButtonActive, setSendMessageButtonActive, setDeleteWindowActive }) {
    return (
        <div className={s.card}>
            <h2 style={{ paddingLeft: "20px", width: "70px" }}>1</h2>
            <h2 style={{ width: "150px" }}>Иван</h2>
            <h2 style={{ width: "250px" }}>ivan1234ivanyshka1234@mail.ru</h2>
            <h2 style={{ width: "160px" }}>+375441234567</h2>
            <h2 style={{ width: "300px" }}>г. Минск, ул. Якуба Коласа, 28</h2>
            <h2 style={{ textAlign: "center", width: "40px" }}>3%</h2>
            <img onClick={() => setUpdateClientButtonActive(true)} className={s.edit} src=".\images\edit.png" alt="edit" />
            <img onClick={() => setSendMessageButtonActive(true)} className={s.send} src=".\images\letter.png" alt="send" />
            <img onClick={() => setDeleteWindowActive(true)} className={s.remove} src=".\images\remove.png" alt="delete" />
        </div>
    );
}