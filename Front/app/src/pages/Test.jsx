import { useState } from "react";
import { Button, Dialog } from "../components";
import * as motion from "motion/react-client";

export default function Test() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>

      <Dialog open={open} onClose={() => setOpen(false)} title="Dialog Title">
        <p>다이얼로그 창 테스트</p>
        <Button onClick={() => setOpen(false)}>닫기</Button>
      </Dialog>

      <motion.div
        style={{
          width: 100,
          height: 100,
          backgroundColor: "#ff0088",
          borderRadius: 5,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
