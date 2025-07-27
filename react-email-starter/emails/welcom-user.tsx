import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface GithubAccessTokenEmailProps {
  username?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WelcomeUser = ({ username }: GithubAccessTokenEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        A fine-grained personal access token has been added to your account
      </Preview>
      <Container style={container}>
        <Text style={title}>
          <strong>@{username}</strong>님, 가입을 환영합니다! what2buy에서 주식
          추천을 받아보세요.
        </Text>

        <Section style={section}>
          <Text style={text}>
            <strong>{username}</strong>님,
          </Text>
          <Text style={text}>
            안녕하세요, 반가워요! 이제부터 어떤 주식에 투자할지에 대한 고민은
            저희에게 맡기세요.
            <br />
            <br />
            what2buy는 주식시장이 어렵고 부담스러운 분들을 위해 만들어졋어요.
            은행 예적금보다는 높은 수익을 꿈꾸지만, 손실은 두렵고... 그런 마음,
            저희도 너무 잘 알아요.
            <br />
            <br />
            그래서 준비했습니다. 가입하신 모든 분께 인공지능 주식추천권을 무료로
            3매 드려요. 오늘 바로 써보시고, 부담 없이 첫 발을 내딛어 보세요.
            <br />
            <br />
            지금이 바로 시작하기 딱 좋은 순간이에요 아래 버튼을 눌러, 당신만을
            위한 주식 추천을 받아보세요.
            <br />
            <br />
          </Text>

          <Button style={button} href="https://what2buy.cool">
            추천 받으러 가기
          </Button>
        </Section>

        <Text style={footer}>What2Buy.cool</Text>
      </Container>
    </Body>
  </Html>
);

WelcomeUser.PreviewProps = {
  username: "alanturing",
} as GithubAccessTokenEmailProps;

export default WelcomeUser;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
