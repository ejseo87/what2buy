import type { Route } from "./+types/privacy-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "개인정보처리방침 | what2buy" },
    { name: "description", content: "What2Buy 개인정보처리방침" },
  ];
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          개인정보처리방침
        </h1>

        <p className="text-gray-600 text-center mb-8">
          마지막 업데이트: 2025‑07‑27
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            본 개인정보처리방침은 What2Buy 서비스가 회원의 개인정보를 어떤
            목적으로, 어떠한 방식으로 수집·이용·보관·파기하는지 설명합니다.
            회사는 「개인정보 보호법」 등 관련 법령을 준수합니다.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. 수집하는 개인정보 항목 및 방법
            </h2>

            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      구분
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      수집 항목
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      수집 방법
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                      필수
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      이메일, 이름, 사용자명(username)
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      회원가입·로그인 시 입력
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                      선택
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      프로필 이미지(아바타)
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      회원이 직접 업로드 시
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700">
              서비스 이용 과정에서 IP 주소, 쿠키, 접속 로그, 결제 기록 등이
              자동으로 생성·수집될 수 있습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. 개인정보 이용 목적
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• 회원 식별 및 계정 관리</li>
              <li>• 서비스 제공 및 맞춤형 추천</li>
              <li>• 유료 결제 처리 및 영수증 발급</li>
              <li>• 고객 문의 대응 및 공지 사항 전달</li>
              <li>• 부정 이용 방지, 법령·약관 위반 조사</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. 보유·이용 기간
            </h2>
            <p className="text-gray-700">
              회원 탈퇴 시 즉시 파기합니다. 다만, 전자상거래 등에서의
              소비자보호에 관한 법률 등 관련 법령에 따라 거래기록(결제, 계약,
              전자금융)은 최대 5년간 보관할 수 있습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. 개인정보 제3자 제공
            </h2>
            <p className="text-gray-700 mb-4">
              회사는 원칙적으로 회원의 개인정보를 외부에 제공하지 않습니다. 다만
              다음 경우는 예외로 합니다.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• 회원이 사전에 동의한 경우</li>
              <li>• 법령에 의해 제출 의무가 있는 경우</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. 개인정보 처리 위탁
            </h2>
            <p className="text-gray-700 mb-4">
              회사는 원활한 서비스 제공을 위해 아래 업체에 일부 업무를 위탁할 수
              있습니다.
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      수탁 업체
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      위탁 업무
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      보유·이용 기간
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      Stripe, 토스페이먼츠 등
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      결제 처리
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      위탁 계약 종료 시까지
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      AWS, Vercel
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      인프라·데이터 호스팅
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      위탁 계약 종료 시까지
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. 회원의 권리 및 행사 방법
            </h2>
            <p className="text-gray-700 mb-4">
              회원은 언제든지 본인의 개인정보를 조회·수정·삭제·처리정지 요청할
              수 있습니다.
            </p>
            <p className="text-gray-700">
              '계정 설정' 또는 고객센터를 통해 권리를 행사할 수 있으며, 회사는
              법령에 따라 지체 없이 조치합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. 개인정보 파기 절차 및 방법
            </h2>
            <p className="text-gray-700 mb-4">
              목적 달성, 보유기간 종료, 회원 탈퇴 시 지체 없이 파기합니다.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>전자파일:</strong> 복구 불가능한 방식으로 영구 삭제
              </li>
              <li>
                • <strong>인쇄물:</strong> 분쇄 또는 소각
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. 쿠키(Cookie) 운영
            </h2>
            <p className="text-gray-700 mb-4">
              웹사이트는 로그인 세션 유지를 위해 최소한의 쿠키를 사용합니다.
            </p>
            <p className="text-gray-700">
              회원은 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수
              있습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. 개인정보 보호책임자
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      구분
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      성명
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      연락처
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-medium text-gray-900">
                      이메일
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                      책임자
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      서은주
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      050-7000-0000
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                      privacy@what2buy.cool
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. 고지 의무
            </h2>
            <p className="text-gray-700">
              개인정보처리방침이 변경되는 경우, 서비스 공지사항 및 홈페이지(
              <a
                href="https://what2buy.cool/privacy"
                className="text-blue-600 hover:underline"
              >
                https://what2buy.cool/privacy
              </a>
              )에 최소 7일 전부터 고지합니다.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              개인정보처리방침 동의 및 문의
            </h3>

            <div className="text-sm text-gray-600 space-y-2">
              <p className="mb-4">
                본 개인정보처리방침에 대한 동의는 회원가입 시 체크박스로
                수집되며, 전문은 언제든지 다음 링크에서 확인할 수 있습니다.
              </p>

              <div className="space-y-2">
                <p>
                  <strong>개인정보처리방침:</strong>{" "}
                  <a
                    href="https://what2buy.cool/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    https://what2buy.cool/privacy
                  </a>
                </p>
                <p>
                  <strong>문의:</strong>{" "}
                  <a
                    href="mailto:support@what2buy.cool"
                    className="text-blue-600 hover:underline"
                  >
                    support@what2buy.cool
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
