import { Dialog } from '../ui';

export default function Login({ open, onClose }) {
    const handleSocialLogin = (provider) => {
        alert(`${provider} 로그인으로 이동합니다.`);
        // 실제 로그인 시:
        // window.location.href = `/auth/${provider}`
    };

    if (!open) return null;

    return (
        <Dialog open={open} onClose={onClose} title="">
            <div style={styles.modal}>
                <h3 style={styles.title}>로그인</h3>
                <hr style={styles.divider} />

                <div style={styles.iconRow}>
                    {/* Kakao */}
                    <div style={styles.iconBox} onClick={() => handleSocialLogin('Kakao')}>
                        <img
                            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
                            alt="Kakao"
                            style={styles.icon}
                        />
                        <span style={styles.label}>Kakao</span>
                    </div>

                    {/* Naver */}
                    <div style={styles.iconBox} onClick={() => handleSocialLogin('Naver')}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2d/NAVER_Whale_Logo.png"
                            alt="Naver"
                            style={styles.icon}
                        />
                        <span style={styles.label}>Naver</span>
                    </div>

                    {/* Google */}
                    <div style={styles.iconBox} onClick={() => handleSocialLogin('Google')}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
                            alt="Google"
                            style={styles.icon}
                        />
                        <span style={styles.label}>Google</span>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

const styles = {
    modal: {
        padding: '30px',
        textAlign: 'center',
        minHeight: '300px',     // 모달 세로
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
        gap: '40px',
        marginTop: '30px',
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
