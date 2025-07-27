import { Link } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";

export const meta: MetaFunction = () => {
  return [
    { title: "FAQ | what2buy" },
    {
      name: "description",
      content: "what2buy 서비스의 자주 묻는 질문 (FAQ) 페이지입니다.",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // 이 페이지는 정적 콘텐츠를 표시하므로, loader에서 특별히 로드할 데이터는 없습니다.
  return null;
};

const faqs = [
  {
    category: "기능 및 사용 방법",
    items: [
      {
        q: "What2Buy는 어떤 서비스인가요? 인공지능은 어떤 기준으로 주식을 추천해주나요?",
        a: "What2Buy는 복잡한 주식 시장 데이터 분석을 통해 사용자에게 유망한 투자 종목을 추천해주는 인공지능(AI) 기반 서비스입니다. 저희 AI는 PER, PBR, ROE와 같은 주요 재무 지표와 시장 동향, 기업 성장성 등을 종합적으로 분석하여 저평가된 우량주나 성장 가능성이 높은 주식을 발굴합니다. 기술적 분석보다는 기업의 내재 가치에 중점을 둔 추천을 제공하는 것이 특징입니다.",
      },
      {
        q: "'추천권'은 무엇이고, 어떻게 사용해야 하나요?",
        a: " '추천권'은 인공지능의 분석 리포트, 즉 1회의 주식 추천을 받아볼 수 있는 이용권입니다. 사용 방법은 간단합니다.\n1. 로그인 후 메인 화면의 [주식 추천 받으러 가기] 버튼을 클릭하세요.\n2. 보유 중인 추천권이 있다면 자동으로 사용 처리되며, AI가 분석을 시작합니다.\n3. 분석이 완료되면 3개의 추천 주식과 상세한 분석 리포트를 확인하실 수 있습니다.",
      },
      {
        q: "제가 받았던 추천 기록을 나중에 다시 확인할 수 있나요?",
        a: "네, 물론입니다. 고객님께서 받으셨던 모든 추천 기록은 안전하게 보관됩니다. 상단 메뉴의 [Histories] > [추천 기록] 페이지로 이동하시면, 과거에 추천받았던 모든 주식 리포트와 당시의 분석 내용을 언제든지 다시 확인하실 수 있습니다.",
        link: { to: "/histories", text: "추천 기록 페이지 바로가기" },
      },
      {
        q: "추천받은 주식의 수익률은 어떻게 계산되나요?",
        a: "수익률은 AI가 주식을 추천한 날짜의 종가와, 고객님께서 수익률을 확인하는 시점의 가장 최근 종가를 비교하여 계산됩니다. 이를 통해 추천 시점 대비 현재 얼마나 가치가 변동되었는지 직관적으로 파악하실 수 있도록 돕고 있습니다. 각 주식의 상세 페이지에서 추천일과 기준 가격, 현재 가격, 그리고 수익률을 투명하게 확인하실 수 있습니다.",
      },
    ],
  },
  {
    category: "구매 및 결제",
    items: [
      {
        q: "가입하면 바로 무료로 이용해볼 수 있나요?",
        a: "네! what2buy에 처음 가입하시는 모든 분들께는 서비스 체험을 위한 무료 추천권 3매를 선물로 드리고 있습니다. 별도의 결제 정보 입력 없이, 가입 즉시 첫 주식 추천을 받아보실 수 있으니 부담 없이 AI의 분석력을 경험해 보세요.",
      },
      {
        q: "추천권은 어떻게 구매하나요? 결제 방법은 어떤 것이 있나요?",
        a: "추천권이 모두 소진되면 [추천권 구매] 페이지에서 추가로 구매하실 수 있습니다. 현재 신용카드 및 주요 간편 결제(카카오페이, 네이버페이 등)를 지원하고 있습니다. 원하시는 수량의 추천권을 선택하고 안내에 따라 결제를 진행해 주세요.",
        link: { to: "/tickets/buy", text: "추천권 구매 페이지 바로가기" },
      },
      {
        q: "결제한 추천권에 대해 환불을 받을 수 있나요?",
        a: "네, 환불 정책은 다음과 같습니다.\n- 사용하지 않은 추천권은 결제일로부터 7일 이내에 전액 환불이 가능합니다.\n- 이미 사용하여 추천 리포트를 받은 추천권에 대해서는 서비스 특성상 환불이 어려운 점 양해 부탁드립니다.\n환불을 원하실 경우, 고객 지원팀으로 문의해 주세요.",
      },
    ],
  },
  {
    category: "접근성 및 계정 관리",
    items: [
      {
        q: "스마트폰에서도 이용할 수 있나요? 별도의 앱을 설치해야 하나요?",
        a: "네, what2buy는 반응형 웹으로 설계되어 별도의 앱 설치 없이 스마트폰, 태블릿, PC 등 모든 기기의 웹 브라우저에서 최적화된 화면으로 이용하실 수 있습니다. 즐겨찾기나 홈 화면에 추가해두시면 앱처럼 편리하게 접속이 가능합니다.",
      },
      {
        q: "비밀번호를 변경하거나, 가입한 소셜 계정을 변경할 수 있나요?",
        a: "네, 가능합니다. 로그인 후 [내 정보] > [설정] 페이지에서 비밀번호를 변경하실 수 있습니다. 소셜 로그인 연동 해제나 변경과 관련된 문의는 보안을 위해 고객 지원팀의 본인 확인 절차를 거쳐 처리해드리고 있습니다.",
        link: { to: "/users/my-profile", text: "내 정보 페이지 바로가기" },
      },
    ],
  },
  {
    category: "고객 지원",
    items: [
      {
        q: "서비스 이용 중 문제가 생기거나 궁금한 점이 있으면 어디에 문의해야 하나요?",
        a: "서비스 이용에 불편을 드려 죄송합니다. 궁금하신 점이나 기술적인 문제가 발생했을 경우, 언제든지 아래 이메일로 문의 내용을 보내주세요. 최대한 신속하게 확인하고 답변드리겠습니다.\n\n고객 지원 이메일: support@what2buy.cool",
      },
    ],
  },
];

export default function SupportPage() {
  return (
    <div className="space-y-20 w-full">
      <Hero
        title="자주 묻는 질문 (FAQ)"
        subtitle="what2buy를 처음 이용하시는 분들을 위해, 자주 묻는 질문과 답변을 정리했습니다."
      />

      <div>
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
              {section.category}
            </h2>
            <div className="space-y-8 mb-20">
              {section.items.map((item) => (
                <div key={item.q}>
                  <p className="text-lg font-semibold text-gray-800">
                    <span className="text-indigo-600 font-bold mr-2">Q:</span>
                    {item.q}
                  </p>
                  <p className="mt-2 text-base text-gray-700 whitespace-pre-line">
                    <span className="text-gray-500 font-bold mr-2">A:</span>
                    {item.a}
                  </p>
                  {item.link && (
                    <div className="mt-2">
                      <Link
                        to={item.link.to}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        👉 {item.link.text}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
