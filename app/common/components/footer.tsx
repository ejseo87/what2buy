import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What2Buy
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              AI 기반 주식 추천 서비스
            </p>
            <p className="text-gray-500 text-xs">
              © 2025 What2Buy. All rights reserved.
            </p>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/recommendation"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  주식 추천 받기
                </Link>
              </li>
              <li>
                <Link
                  to="/histories"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  추천 기록
                </Link>
              </li>
              <li>
                <Link
                  to="/histories/stocks"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  추천 주식 목록
                </Link>
              </li>
              <li>
                <Link
                  to="/tickets"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  추천권 관리
                </Link>
              </li>
            </ul>
          </div>

          {/* 법적 정보 */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">정보</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/my/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  이용약관
                </Link>
              </li>
              <li>
                <Link
                  to="/my/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  to="/my/support"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@what2buy.cool"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  문의하기
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 및 투자 경고 문구 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">
              <strong>투자 위험 고지:</strong> 본 서비스는 AI 분석을 통한 주식
              추천 서비스로, 투자 결과에 대한 책임은 투자자 본인에게 있습니다.
            </p>
            <p className="text-xs text-gray-500">
              주식 투자는 원금 손실의 위험이 있으며, 과거 수익률이 미래 수익률을
              보장하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
