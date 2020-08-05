import React from 'react';
import wppIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';

interface TeacherItemProps {

}
const TeacherItem: React.FC<TeacherItemProps> = (props) => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/56237020?s=460&u=aa49fd043174adc745117f430038b7e38b5c7206&v=4" alt="jef" />
                <div >
                    <strong>Jeferson Souza</strong>
                    <span>Quimica</span>
                </div>
            </header>
            <p>
                Adora explodir termometros no lab
            </p>
            <footer>
                <p>
                    Preco/Hora
                    <strong>80,00</strong>
                </p>
                <button>
                    <img src={wppIcon} alt="whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}
export default TeacherItem;