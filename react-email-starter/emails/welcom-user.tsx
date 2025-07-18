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
          <strong>@{username}</strong>님, What2Buy에 오신 것을 환영합니다.
        </Text>

        <Section style={section}>
          <Text style={text}>
            <strong>{username}</strong>님,
          </Text>
          <Text style={text}>
            저는 주식 추천 서비스 What2Buy의 개발자 Wonder2021입니다.
            <br />
            <br />
            저는 오랫동안 소액투자자, 일명 개미로 주식투자를 해었습니다. 그러나
            부족한 주식시장에 대한 정보로 인해 어떤 주식을 사야할지 몰라 유튜브
            영상을 보거나 주변사람들의 추천을 받아 주식을 사고 있었습니다.
            그러다가 대부분의 경우 손실을 입고 의도하지 않은 장기투자를 하기도
            하였습니다.
            <br />
            <br />
            수년 전, 경제학을 공부하다가 저의 과거 투자 습관이 잘못된 것임을
            알게 되었습니다. 기업의 주식 가치를 파악하는 방법을 배우고 그 방법을
            적용하여 투자를 하였습니다. 이러한 투자방식은 손실을 줄여주었습니다.
            <br />
            <br />
            또한 최근 저는 인공지능에 대해 학습을 하다가 인공지능이 투자조언을
            해줄 수 있다는 사실도 알게 되었습니다. 그리하여 저는 인공지능을
            활용하여 주식 추천 서비스 What2Buy를 만들게 되었습니다.
            <br />
            <br />
            투자는 도박이 아닙니다. 투자는 기업의 가치를 파악하고 그 가치를에
            투자하는 것입니다. What2Buy는 건전한 주식투자를 위한 서비스로,
            단기간에 큰 수익을 얻기 위한 서비스가 아닙니다.
            <strong>@{username}</strong>님의 소중한 돈을 잃지않게 하고 은행이
            예적금하는 것보다는 높은 수익을 얻게 하는 것이 목표입니다.
            <br />
            <br />
            주식 추천을 받고 싶다면 아래 버튼을 클릭하세요.
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
