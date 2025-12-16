import { useState } from 'react';
import SettingsModal from './SettingsModal';

export default function SettingsTest() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
        설정 열기
      </button>

      <SettingsModal
        open={open}
        onClose={() => setOpen(false)}
        user={{
          name: '김민수',
          initial: '김'
        }}
      />
    </div>
  );
}
