// src/pages/SharedDrive.jsx

import React, { useState, useRef } from 'react';

export default function SharedDrive() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // 보기 좋은 파일 크기
  const formatSize = (size) => {
    if (size > 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + ' MB';
    if (size > 1024) return (size / 1024).toFixed(1) + ' KB';
    return size + ' B';
  };

  // 공통 파일 추가 함수 (업로드/드롭 모두 사용)
  const addFiles = (fileList) => {
    const selectedFiles = Array.from(fileList || []);
    if (!selectedFiles.length) return;

    const now = new Date();
    const newItems = selectedFiles.map((file) => ({
      id: `${now.getTime()}-${file.name}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      uploadedAt: now,
      uploader: '나', // 나중에 로그인 유저 이름으로 교체
    }));

    setFiles((prev) => [...prev, ...newItems]);
  };

  // 버튼으로 업로드
  const handleSelectFiles = (e) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // 드래그 앤 드롭
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  // 다운로드
  const handleDownload = (item) => {
    const url = URL.createObjectURL(item.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // 삭제
  const handleDelete = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // 중앙 흰 패널 스타일 (드래그 중일 때 강조)
  const basePanel =
  'h-full w-full bg-white rounded-none shadow-md border-t-0 border-slate-200 flex flex-col';
  const panelClass = isDragging
    ? `${basePanel} ring-2 ring-sky-400 bg-sky-50/60`
    : basePanel;

  return (
    <div className="flex h-full flex-col bg-slate-50">
      {/* 상단 파란 바 + 버튼식 업로드 */}
      <header className="flex items-center justify-between px-6 py-3 bg-sky-600 text-white shadow">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">공유 드라이브</span>
          <span className="text-xs text-sky-100/70">
            팀 파일을 업로드하고 공유하는 공간
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            className="hidden px-3 py-1.5 rounded-md bg-sky-500/70 hover:bg-sky-500 text-xs font-medium md:inline-flex items-center gap-1"
          >
            + 새로 만들기
          </button>

          {/* ⬇️ 여기 버튼이 업로드용 */}
          <button
            type="button"
            onClick={handleClickUpload}
            className="px-3 py-1.5 rounded-md bg-white text-sky-700 text-xs font-semibold shadow-sm hover:bg-sky-50 flex items-center gap-1"
          >
            ⬆ 업로드
          </button>

          <button
            type="button"
            className="hidden px-3 py-1.5 rounded-md bg-sky-500/70 hover:bg-sky-500 text-xs md:inline-flex"
          >
            정렬 ▾
          </button>
        </div>

        {/* 숨겨진 input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleSelectFiles}
        />
      </header>

      {/* 중앙 흰 영역 (전체가 드래그 앤 드롭 가능 영역) */}
      <main className="flex-1 px-0 py-6 overflow-auto">
        <div
        className={panelClass}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        >

          {/* 상단 제목/안내 */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-semibold text-slate-800">
                내 파일
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                위의 <span className="font-semibold text-sky-500">업로드</span>{' '}
                버튼을 누르거나, 이 흰 영역 아무 곳에나 파일을 드래그&드롭하면
                업로드됩니다.
              </p>
            </div>
            <div className="px-3 py-1 text-[11px] rounded-full bg-slate-100 text-slate-500">
              총 <span className="font-semibold">{files.length}</span>개 파일
            </div>
          </div>

          {/* 파일 목록 / 비어 있을 때 메시지 */}
          {files.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
              파일이 없습니다. 파일을 이 영역으로 드래그하거나 상단{' '}
              <span className="font-semibold text-sky-500">업로드</span> 버튼을
              눌러 추가해 보세요.
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-white border-b border-slate-100">
                  <tr className="text-xs text-slate-400">
                    <th className="px-6 py-2 font-medium text-left">이름</th>
                    <th className="px-3 py-2 font-medium text-left">
                      파일 크기
                    </th>
                    <th className="px-3 py-2 font-medium text-left">
                      수정된 날짜
                    </th>
                    <th className="px-3 py-2 font-medium text-left">
                      수정한 사람
                    </th>
                    <th className="px-6 py-2 font-medium text-right">작업</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-100 text-slate-700 hover:bg-slate-50"
                    >
                      <td className="px-6 py-3">
                        <button
                          type="button"
                          onClick={() => handleDownload(item)}
                          className="max-w-[260px] truncate text-left text-sky-600 hover:underline"
                        >
                          {item.name}
                        </button>
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-500">
                        {formatSize(item.size)}
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-500">
                        {item.uploadedAt.toLocaleString('ko-KR', {
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-500">
                        {item.uploader}
                      </td>
                      <td className="px-6 py-3 text-xs text-right">
                        <button
                          type="button"
                          onClick={() => handleDownload(item)}
                          className="px-3 py-1 mr-2 text-[11px] border rounded-full border-slate-300 text-slate-600 hover:bg-slate-100"
                        >
                          다운로드
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 text-[11px] border rounded-full border-rose-200 text-rose-500 hover:bg-rose-50"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
