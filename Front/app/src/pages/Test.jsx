import { useState } from 'react';
import { Button } from '../components/Button';
import { Dialog } from '../components/Dialog';

export default function Test() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button label="Open Dialog" onClick={() => setOpen(true)} />

            <Dialog open={open} onClose={() => setOpen(false)} title="Dialog Title">
                <p>다이얼로그 창 테스트</p>
                <Button label="닫기" onClick={() => setOpen(false)} />
            </Dialog>
        </div>
    );
}
