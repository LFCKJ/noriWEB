import { useState } from 'react';
import { Button, Dialog } from '../components';

export default function Test() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Open Dialog</Button>

            <Dialog open={open} onClose={() => setOpen(false)} title="Dialog Title">
                <p>다이얼로그 창 테스트</p>
                <Button onClick={() => setOpen(false)}>닫기</Button>
            </Dialog>
        </div>
    );
}
