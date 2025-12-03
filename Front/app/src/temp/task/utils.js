// 상태별 색상 매핑
export const getStatusColor = status => {
    const colors = {
        완료: 'bg-green-100 text-green-700',
        '할 일': 'bg-gray-100 text-gray-700',
        '진행 중': 'bg-blue-100 text-blue-700',
        검토: 'bg-purple-100 text-purple-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
};

// 우선순위별 색상 매핑
export const getPriorityColor = priority => {
    const colors = {
        긴급: 'bg-red-100 text-red-700',
        높음: 'bg-orange-100 text-orange-700',
        보통: 'bg-yellow-100 text-yellow-700',
        낮음: 'bg-green-100 text-green-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
};

// 날짜 포맷 변환: "2025-12-03" → "2025. 12. 03."
export const formatDateToDisplay = dateString => {
    if (!dateString) return '미정';
    return new Date(dateString)
        .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        .replace(/\. /g, '. ');
};

// 날짜 포맷 변환: "2025. 12. 03." → "2025-12-03"
export const formatDateToInput = dateString => {
    if (!dateString || dateString === '미정') return '';
    const parts = dateString.split('. ').filter(p => p);
    if (parts.length === 3) {
        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return '';
};
