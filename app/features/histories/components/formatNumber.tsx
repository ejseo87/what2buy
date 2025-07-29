// 숫자 포맷팅 함수 (천단위 콤마 + 소수점 아래 2자리까지)
export default function formatNumber(value: any): string {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return "N/A";
  }

  // 정수인 경우 천단위 콤마만, 소수인 경우 천단위 콤마 + 2자리까지 표시
  if (numValue % 1 === 0) {
    return numValue.toLocaleString("ko-KR");
  } else {
    return numValue.toLocaleString("ko-KR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
