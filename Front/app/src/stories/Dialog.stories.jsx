import React from 'react';
import { Dialog, Button } from '../components';

export default {
    title: 'UI/Dialog',
    component: Dialog,
    parameters: {
        layout: 'fullscreen'
    },
    args: {
        open: true,
        title: 'Dialog 제목',
        width: '400px'
    },
    argTypes: {
        open: {
            control: 'boolean',
            description: '다이얼로그 열림/닫힘 상태'
        },
        title: {
            control: 'text',
            description: '다이얼로그 제목'
        },
        width: {
            control: 'text',
            description: '다이얼로그 너비 (CSS 단위)'
        },
        onClose: {
            action: 'closed',
            description: '닫기 이벤트 핸들러'
        },
        children: {
            description: '다이얼로그 내용'
        }
    }
};

// 기본 다이얼로그
export const Default = {
    render: args => (
        <Dialog {...args}>
            <p>이것은 기본 다이얼로그 내용입니다.</p>
            <p>ESC 키를 누르거나 X 버튼을 클릭하여 닫을 수 있습니다.</p>
        </Dialog>
    )
};

// 제목 없는 다이얼로그
export const WithoutTitle = {
    args: {
        title: undefined
    },
    render: args => (
        <Dialog {...args}>
            <h3 style={{ marginTop: 0 }}>커스텀 제목</h3>
            <p>제목 prop 없이 자체 제목을 가진 다이얼로그입니다.</p>
        </Dialog>
    )
};

// 작은 다이얼로그
export const Small = {
    args: {
        width: '300px',
        title: '작은 다이얼로그'
    },
    render: args => (
        <Dialog {...args}>
            <p>작은 크기의 다이얼로그입니다.</p>
        </Dialog>
    )
};

// 큰 다이얼로그
export const Large = {
    args: {
        width: '600px',
        title: '큰 다이얼로그'
    },
    render: args => (
        <Dialog {...args}>
            <p>큰 크기의 다이얼로그입니다.</p>
            <p>더 많은 내용을 포함할 수 있습니다.</p>
            <div
                style={{
                    height: '200px',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    padding: '16px'
                }}>
                <p>추가 콘텐츠 영역</p>
            </div>
        </Dialog>
    )
};

// 버튼이 있는 다이얼로그
export const WithButtons = {
    args: {
        title: '확인 다이얼로그'
    },
    render: args => (
        <Dialog {...args}>
            <p>이 작업을 계속하시겠습니까?</p>
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end',
                    marginTop: '24px'
                }}>
                <Button variant="secondary" onClick={args.onClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={args.onClose}>
                    확인
                </Button>
            </div>
        </Dialog>
    )
};

// 폼이 있는 다이얼로그
export const WithForm = {
    args: {
        title: '새 그룹 만들기',
        width: '450px'
    },
    render: args => (
        <Dialog {...args}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        그룹 이름
                    </label>
                    <input
                        type="text"
                        placeholder="그룹 이름을 입력하세요"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        설명
                    </label>
                    <textarea
                        placeholder="그룹 설명을 입력하세요 (선택사항)"
                        rows="3"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            resize: 'vertical'
                        }}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'flex-end',
                        marginTop: '8px'
                    }}>
                    <Button variant="secondary" onClick={args.onClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={args.onClose}>
                        만들기
                    </Button>
                </div>
            </form>
        </Dialog>
    )
};

// 인터랙티브 다이얼로그 (열기/닫기)
export const Interactive = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div style={{ padding: '20px' }}>
            <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>

            <Dialog open={open} onClose={() => setOpen(false)} title="인터랙티브 다이얼로그">
                <p>이 다이얼로그는 실제로 열고 닫을 수 있습니다!</p>
                <p>다음 방법으로 닫을 수 있습니다:</p>
                <ul>
                    <li>X 버튼 클릭</li>
                    <li>ESC 키 누르기</li>
                    <li>오버레이 클릭</li>
                    <li>아래 버튼 클릭</li>
                </ul>
                <div style={{ marginTop: '16px', textAlign: 'right' }}>
                    <Button onClick={() => setOpen(false)}>닫기</Button>
                </div>
            </Dialog>
        </div>
    );
};
