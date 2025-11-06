import './Test.css';
import { useState } from 'react';
import { Button, Dialog } from '../components';
import * as motion from 'motion/react-client';

export default function Test() {
    const [open, setOpen] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [rotate, setRotate] = useState(0);

    return (
        <>
            <Button onClick={() => setOpen(true)}>Open Dialog</Button>

            <Dialog open={open} onClose={() => setOpen(false)} title="Dialog Title">
                <p>다이얼로그 창 테스트</p>
                <Button onClick={() => setOpen(false)}>닫기</Button>
            </Dialog>

            <div id="motion example1" class="example">
                <div>모션 예제 1</div>
                <motion.div
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#ff0088',
                        borderRadius: 5
                    }}
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ rotate: 360, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>

            <div id="motion example2" class="example">
                <div>모션 예제 2</div>
                <div id="example">
                    <div>
                        <motion.div
                            className="box"
                            animate={{ x, y, rotate }}
                            transition={{ type: 'spring' }}
                        />
                    </div>
                    <div className="inputs">
                        <Input value={x} set={setX}>
                            x
                        </Input>
                        <Input value={y} set={setY}>
                            y
                        </Input>
                        <Input value={rotate} set={setRotate} min={-180} max={180}>
                            rotate
                        </Input>
                    </div>
                    <StyleSheet />
                </div>
            </div>

            <div id="motion example3" class="example">
                <div>모션 예제 3</div>
                <motion.article
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'none' }}
                    transition={{ duration: 1 }}>
                    <p>Article Title</p>
                    <p>adsfasdfasdf</p>
                </motion.article>
            </div>

            <div id="motion example4" class="example">
                <div>모션 예제 4</div>
                <motion.nav
                    style={{
                        width: '300px',
                        height: '60px',
                        backgroundColor: '#ff0088',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 20px'
                    }}
                    initial={{
                        maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
                    }}
                    animate={{
                        maskImage:
                            'linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)'
                    }}
                    transition={{
                        duration: 2,
                        ease: [0.37, 0.2, 0.26, 0.89]
                    }}>
                    <span style={{ color: 'white' }}>Navigation Menu</span>
                </motion.nav>
            </div>

            <div id="motion example5" class="example">
                <div>모션 예제 5</div>
                <motion.div
                    style={{
                        y: -20,
                        width: '300px',
                        height: '60px',
                        backgroundColor: '#ff0088'
                    }}
                    animate={{
                        x: 100,
                        y: 10,
                        scale: 1.2,
                        rotateY: 180,
                        transformPerspective: 1000,
                        backgroundColor: '#00ffaa'
                    }}
                    transition={{ duration: 1, ease: [0.68, -0.55, 0.265, 1.55] }}
                />
                <motion.button
                    initial={{ originX: 0 }}
                    animate={{ x: 10, y: -20, rotate: 10 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}>
                    asdfasdf
                </motion.button>
            </div>

            <div id="motion example6" class="example">
                <div>모션 예제 6 - SVG Circle</div>
                <svg width="600" height="100">
                    <motion.circle
                        cx={500}
                        cy={50}
                        r={20}
                        fill="#ff0088"
                        animate={{
                            cx: [null, 100, 200]
                        }}
                        transition={{
                            duration: 3,
                            times: [0, 0.2, 1],
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                    />
                </svg>
            </div>
        </>
    );
}

function Input({ value, children, set, min = -200, max = 200 }) {
    return (
        <label>
            <code>{children}</code>
            <input
                value={value}
                type="range"
                min={min}
                max={max}
                onChange={e => set(parseFloat(e.target.value))}
            />
            <input
                type="number"
                value={value}
                min={min}
                max={max}
                onChange={e => set(parseFloat(e.target.value) || 0)}
            />
        </label>
    );
}

function StyleSheet() {
    return (
        <style>{`
            #example .box {
                width: 200px;
                height: 200px;
                border-radius: 20px;
                border: 5px dotted #ff0088;
                pointer-events: none;
            }

            #example {
                display: flex;
                align-items: center;
            }

            #example input {
                accent-color: #ff0088;
                font-family: "Azeret Mono", monospace;
            }

            #example .inputs {
                display: flex;
                flex-direction: column;
                padding-left: 50px;
            }

            #example label {
                display: flex;
                align-items: center;
                margin: 10px 0;
            }

            #example label code {
                width: 100px;
            }

            #example input[type="number"] {
                border: 0;
                border-bottom: 1px dotted #ff0088;
                color: #ff0088;
                margin-left: 10px;
            }

            #example input[type="number"]:focus {
                outline: none;
                border-bottom: 2px solid #ff0088;
            }

            #example input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }

            input[type='range']::-webkit-slider-runnable-track {
                height: 10px;
                -webkit-appearance: none;
                background: #0b1011;
                border: 1px solid #1d2628;
                border-radius: 10px;
                margin-top: -1px;
            }

            input[type='range']::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #ff0088;
                top: -4px;
                position: relative;
            }
        `}</style>
    );
}
