import type { Route } from "./+types/terms-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "이용약관 | what2buy" },
    { name: "description", content: "What2Buy 이용약관" },
  ];
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          What2Buy 이용약관
        </h1>

        <p className="text-gray-600 text-center mb-8">
          마지막 업데이트: 2025‑07‑27
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            본 약관은 주식 추천 서비스 "What2Buy"(이하 "서비스")를 제공하는
            What2Buy 운영팀(이하 "회사")과 서비스 이용자(이하 "회원") 간의
            권리‧의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              제1조 (정의)
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>서비스:</strong> 회사가 https://what2buy.cool 및 관련
                도메인을 통해 제공하는 주식 추천·정보 조회·티켓 구매 등 일체의
                온라인 서비스.
              </li>
              <li>
                <strong>회원:</strong> 본 약관에 동의하고 서비스에 가입하여
                계정을 생성한 자.
              </li>
              <li>
                <strong>티켓/추천권:</strong> AI 주식 추천 기능을 이용하기 위해
                회원이 구매하거나 부여받는 이용권.
              </li>
              <li>
                <strong>콘텐츠:</strong> 서비스 내에서 제공되거나 회원이
                업로드한 텍스트, 그래픽, 데이터, 알고리즘 결과 등 일체의 정보.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              제2조 (약관의 효력 및 변경)
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                본 약관은 서비스 초기 화면 또는 연결화면에 게시함으로써 효력이
                발생합니다.
              </li>
              <li>
                회사는 관계 법령을 위배하지 않는 범위에서 약관을 개정할 수
                있으며, 변경 시 시행일 7일 전(회원에게 불리하거나 중대한 변경은
                30일 전)부터 공지합니다.
              </li>
              <li>
                회원이 변경 약관에 명시된 시행일까지 거부 의사를 표하지 않을
                경우, 변경 약관에 동의한 것으로 간주합니다.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              제3조 (회원가입)
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                회원이 되고자 하는 자는 회사가 정한 절차에 따라 계정을 생성하고
                본 약관 및 개인정보처리방침에 동의해야 합니다.
              </li>
              <li>
                회사는 다음 각 호의 사유가 있는 경우 가입 신청을 거절하거나
                사후에 회원 자격을 제한·정지·상실시킬 수 있습니다.
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• 타인의 명의·이메일을 도용한 경우</li>
                  <li>• 허위 정보를 기재한 경우</li>
                  <li>
                    • 기타 회사의 합리적 판단으로 가입을 승인할 수 없는 경우
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              제4조 (서비스의 제공)
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                회사가 회원에게 제공하는 주요 서비스는 다음과 같습니다.
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• 가치주 선별 및 AI 기반 주식 추천</li>
                  <li>• 주식 차트·지표·수익률 조회</li>
                  <li>• 티켓/추천권 구매 및 사용 내역 관리</li>
                </ul>
              </li>
              <li>
                회사는 무료 체험, 유료 구독·티켓 등 다양한 요금제를 제공할 수
                있으며, 구체적인 내용은 서비스 화면에 별도 표시합니다.
              </li>
              <li>
                회사는 시스템 점검, 서비스 개편, 법적·정책적 사유 등으로 서비스
                일부 또는 전부의 제공을 일시 중단할 수 있으며, 사전에
                공지합니다. 다만 긴급 사유가 있는 경우 사후 공지할 수 있습니다.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              제5조 (회원의 의무)
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                회원은 관계 법령, 본 약관, 이용안내 및 서비스 관련 공지사항을
                준수해야 합니다.
              </li>
              <li>
                회원은 아래 행위를 하여서는 안 됩니다.
                <ul className="mt-2 ml-4 space-y-1">
                  <li>• 타인의 개인정보 무단 수집·사용</li>
                  <li>
                    • 서비스 운영을 방해하거나 서버에 과도한 부하를 유발하는
                    행위
                  </li>
                  <li>• 회사 또는 제3자의 저작권 및 지적재산권 침해 행위</li>
                  <li>• 주식·투자 관련 허위 정보 유포, 불법 행위 조장</li>
                </ul>
              </li>
              <li>
                회원이 본 조를 위반할 경우, 회사는 게시물 삭제, 서비스 이용
                제한, 회원 자격 박탈 등 적절한 조치를 취할 수 있습니다.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              제6조 (지적 재산권)
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                서비스 및 회사가 제작한 콘텐츠에 대한 저작권 등 지적재산권은
                회사에 귀속됩니다.
              </li>
              <li>
                회원이 작성한 게시물의 저작권은 해당 회원에게 있으나, 회원은
                회사가 서비스 운영‧홍보를 위해 게시물을 무상으로
                사용·수정·저장·복제·공개할 수 있는 범위의 이용권을 부여합니다.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              제7조 (유료 서비스 및 결제)
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                회원은 티켓 또는 구독 상품을 유료로 구매할 수 있습니다. 가격,
                결제 방식, 환불 정책 등은 서비스 화면에 명시합니다.
              </li>
              <li>
                결제 오류 발생 시 회원은 고객센터에 통보할 수 있으며, 회사는
                관계 법령에 따라 적절히 처리합니다.
              </li>
              <li>
                정기결제 구독의 경우 회원이 해지 의사를 밝히지 않는 한 동일
                조건으로 자동 갱신됩니다.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              제8조 (면책조항)
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                회사는 천재지변, DDos 공격, ISP 장애 등 불가항력으로 인한 서비스
                장애에 대해 책임을 지지 않습니다.
              </li>
              <li>
                회사는 AI 추천 결과가 향후 투자 수익을 보장하지 않으며, 투자
                판단 및 손익에 대한 책임은 전적으로 회원에게 있습니다.
              </li>
              <li>
                회사는 회원 상호 간 및 회원과 제3자 사이에서 발생한 분쟁에
                개입하지 않으며, 그에 따른 손해배상 책임을 지지 않습니다.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              제9조 (분쟁 해결 및 준거법)
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                회사와 회원 간 분쟁은 원활한 해결을 위해 고객센터를 통해
                협의합니다.
              </li>
              <li>
                협의가 이루어지지 않을 경우, 분쟁의 관할 법원은 민사소송법이
                정한 관할에 따르며, 준거법은 대한민국 법령입니다.
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              약관 동의 및 문의
            </h3>

            <div className="text-sm text-gray-600 space-y-2">
              <p className="mb-4">
                본 약관 대한 동의는 회원가입 시 체크박스로 수집되며, 전문은
                언제든지 다음 링크에서 확인할 수 있습니다.
              </p>

              <div className="space-y-2">
                <p>
                  <strong>이용약관:</strong>{" "}
                  <a
                    href="https://what2buy.cool/terms"
                    className="text-blue-600 hover:underline"
                  >
                    https://what2buy.cool/terms
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
