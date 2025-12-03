import './Footer.css';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="footer">
            <div className="footer-wapper">
                <div className="footer-left-space"></div>
                <div className="footer-content-side-wrapper">
                    <div className="footer-sidebar">사이드바 컨텐츠</div>
                </div>
                <div className="footer-content-column-wrapper">
                    <ul className="footer-column-list">
                        <li className="footer-column-list-item title">
                            <p>사이트 링크</p>
                        </li>
                        <li className="footer-column-list-item" onClick={() => navigate('/')}>
                            Home
                        </li>
                        <li className="footer-column-list-item" onClick={() => navigate('/about')}>
                            About
                        </li>
                        <li
                            className="footer-column-list-item"
                            onClick={() => navigate('/contact')}>
                            Contact
                        </li>
                        <li className="footer-column-list-item" onClick={() => navigate('/test')}>
                            Test
                        </li>
                    </ul>
                    <ul className="footer-column-list">
                        <li className="footer-column-list-item title">
                            <p>사이트 링크</p>
                        </li>
                        <li className="footer-column-list-item" onClick={() => navigate('/')}>
                            Home
                        </li>
                        <li className="footer-column-list-item" onClick={() => navigate('/about')}>
                            About
                        </li>
                        <li
                            className="footer-column-list-item"
                            onClick={() => navigate('/contact')}>
                            Contact
                        </li>
                        <li className="footer-column-list-item" onClick={() => navigate('/test')}>
                            Test
                        </li>
                        <li
                            className="footer-column-list-item"
                            onClick={() => navigate('/personal')}>
                            Personal
                        </li>
                    </ul>
                </div>
                <div className="footer-right-space"></div>
            </div>
        </footer>
    );
}
