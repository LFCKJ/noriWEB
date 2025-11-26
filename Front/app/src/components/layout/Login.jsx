import { Dialog } from '../ui';
import naver from '../../images/naver.png'
import google from '../../images/google.png'
import kakao from '../../images/kakao.png'

export default function Login({ open, onClose }) {
    const handleSocialLogin = (provider) => {
        const baseUrl = "/oauth2/authorization/";
        const registrationId = provider.toLowerCase();
       // alert(`${provider} 로그인으로 이동합니다.`);
        // 실제 로그인 시:
         window.location.href = baseUrl + registrationId;
    };

    if (!open) return null;

    return (
        <Dialog open={open} onClose={onClose} title="" width={"245px"}>
            <div style={styles.modal}>
                <h3 style={styles.title}>로그인</h3>
                <hr style={styles.divider} />

                <div style={styles.iconRow}>
                    {/* Kakao */}
                    <div style={styles.iconBox} onClick={() => handleSocialLogin('Kakao')}>
                        <img
                            src={kakao}
                            alt="Kakao"
                            style={styles.icon}
                        />
                    </div>

                    {/* Naver */}
                    <div style={styles.iconBox} onClick={() => handleSocialLogin('Naver')}>
                        <img
                            src={naver}
                            alt="Naver"
                            style={styles.icon}
                        />
                    </div>

                    {/* Google */}
                    <div style={styles.iconBox} onClick={() => handleSocialLogin('Google')}>
                        <img
                            src={google}
                            alt="Google"
                            style={styles.icon}
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

const styles = {
    modal: {
        padding: '20px',
        textAlign: 'center',
        minHeight: '250px',     // 모달 세로
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    title: { fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' },
    divider: { margin: '10px 0 20px 0', borderTop: '1px solid #ccc' },

    // 아이콘 가로 배치
    iconRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '24px',
        marginTop: '45px',
    },

    // 아이콘 + 텍스트 컨테이너
    iconBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
    },

    icon: {
        width: '50px',
        height: '50px',
        marginBottom: '7px',
        transition: 'transform 0.15s ease',
    },

    label: {
        fontSize: '14px',
        marginTop: '4px',
    },
};
