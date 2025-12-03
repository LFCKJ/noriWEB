// src/temp/SettingsModal.jsx
import React from "react";
import "./SettingsModal.css";

function SettingsModal({ isOpen, onClose }) {
  // 열려있지 않으면 아무 것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // 안쪽 클릭 시 배경 클릭 이벤트 막기
      >
        <h2>설정</h2>

        <div className="modal-body">
          <label>
            닉네임
            <input type="text" />
          </label>
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
