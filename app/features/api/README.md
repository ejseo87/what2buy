# Stock API Documentation

이 API는 Yahoo Finance API를 사용해서 전 세계 주식 시장의 종목 정보를 가져오는 기능을 제공합니다.

## API Endpoints

### 1. 전체 종목 목록 조회

**URL:** `/api/stocks`

**Method:** GET

**Query Parameters:**

- `exchange` (optional): 거래소 타입 (기본값: "KRX")
  - "KRX": 전체 종목
  - "KOSPI": 코스피 종목
  - "KOSDAQ": 코스닥 종목

**Example:**

```
GET /api/stocks
GET /api/stocks?exchange=KOSPI
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "Code": "005930",
      "Name": "삼성전자",
      "Market": "KOSPI",
      "Sector": "전기전자",
      "Industry": "전자부품",
      "ListingDate": "1975-06-11",
      "MarketCap": 400000000000000,
      "Shares": 5969782550,
      "ForeignShares": 3000000000,
      "ForeignRatio": 50.25
    }
  ],
  "exchange": "KRX",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. 특정 종목 상세 정보 조회

**URL:** `/api/stocks/:symbol`

**Method:** GET

**Path Parameters:**

- `symbol`: 종목 코드 (예: "005930" 또는 "AAPL")

**Query Parameters:**

- `start` (optional): 시작 날짜 (기본값: "2020-01-01")
- `end` (optional): 종료 날짜 (기본값: 현재 날짜)

**Example:**

```
GET /api/stocks/005930
GET /api/stocks/AAPL?start=2023-01-01&end=2023-12-31
```

**Response:**

```json
{
  "success": true,
  "data": {
    "symbol": "005930",
    "name": "삼성전자",
    "market": "KOSPI",
    "sector": "전기전자",
    "industry": "전자부품",
    "listingDate": "1975-06-11",
    "marketCap": 400000000000000,
    "shares": 5969782550,
    "foreignShares": 3000000000,
    "foreignRatio": 50.25,
    "priceData": [
      {
        "date": "2023-01-01",
        "open": 70000,
        "high": 72000,
        "low": 69000,
        "close": 71000,
        "volume": 1000000
      }
    ]
  },
  "symbol": "005930",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3. 종목 검색

**URL:** `/api/stocks/search/:query`

**Method:** GET

**Path Parameters:**

- `query`: 검색어 (종목명 또는 종목코드)

**Query Parameters:**

- `market` (optional): 거래소 필터 (기본값: "all")
  - "all": 전체
  - "KOSPI": 코스피
  - "KOSDAQ": 코스닥
- `limit` (optional): 결과 개수 제한 (기본값: 20)

**Example:**

```
GET /api/stocks/search/삼성
GET /api/stocks/search/AAPL?market=NASDAQ&limit=10
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "Code": "005930",
      "Name": "삼성전자",
      "Market": "KOSPI",
      "Sector": "전기전자",
      "Industry": "전자부품",
      "MarketCap": 400000000000000,
      "ForeignRatio": 50.25
    }
  ],
  "query": "삼성",
  "market": "all",
  "limit": 20,
  "totalResults": 1,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Yahoo Finance API 연동

이 API는 Yahoo Finance API를 사용해서 실시간 주식 데이터를 가져옵니다.

### **지원하는 주식 시장**

- **한국 주식**: KOSPI, KOSDAQ (예: 005930.KS)
- **미국 주식**: NASDAQ, NYSE (예: AAPL, MSFT)
- **기타 전 세계 주식**: Yahoo Finance에서 지원하는 모든 시장

### **데이터 소스**

- **실시간 주가**: Yahoo Finance API
- **과거 데이터**: Yahoo Finance Historical Data API
- **기업 정보**: Yahoo Finance Quote API

## 사용 예시

### 브라우저에서 직접 접근

```
http://localhost:3000/api/stocks
http://localhost:3000/api/stocks/005930
http://localhost:3000/api/stocks/AAPL
http://localhost:3000/api/stocks/search/삼성
```

### JavaScript에서 API 호출

```typescript
// 전체 종목 목록 조회
const response = await fetch("/api/stocks?exchange=KOSPI");
const data = await response.json();

// 특정 종목 상세 정보 조회 (한국 주식)
const stockResponse = await fetch(
  "/api/stocks/005930?start=2023-01-01&end=2023-12-31"
);
const stockData = await stockResponse.json();

// 특정 종목 상세 정보 조회 (미국 주식)
const usStockResponse = await fetch(
  "/api/stocks/AAPL?start=2023-01-01&end=2023-12-31"
);
const usStockData = await usStockResponse.json();

// 종목 검색
const searchResponse = await fetch(
  "/api/stocks/search/삼성?market=KOSPI&limit=10"
);
const searchData = await searchResponse.json();
```

### TypeScript 서비스 직접 사용

```typescript
import {
  StockDataService,
  KoreanStockDataService,
} from "./utils/stock-data-service";

// 실시간 주가 데이터
const quote = await StockDataService.getStockQuote("AAPL");
console.log("Apple price:", quote.price);

// 한국 주식 데이터
const samsungQuote = await StockDataService.getStockQuote("005930.KS");
console.log("Samsung price:", samsungQuote.price);

// 과거 데이터
const historicalData = await StockDataService.getStockHistoricalData(
  "AAPL",
  "2023-01-01",
  "2023-12-31"
);

// 종목 검색
const searchResults = await StockDataService.searchStocks("Apple");
```

## 에러 처리

모든 API는 일관된 에러 응답 형식을 제공합니다:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 주의사항

1. **실시간 데이터**: Yahoo Finance API를 사용하므로 실시간 데이터를 제공합니다.

2. **API 제한**: Yahoo Finance API는 호출 제한이 있을 수 있으므로 적절한 캐싱을 권장합니다.

3. **한국 주식**: 한국 주식은 종목코드 뒤에 `.KS`를 붙여야 합니다 (예: 005930.KS).

4. **CORS**: 브라우저에서 직접 Yahoo Finance API를 호출할 때 CORS 문제가 있을 수 있으므로, 서버 사이드에서 프록시를 사용합니다.

5. **데이터 정확성**: Yahoo Finance의 데이터 소스 변경에 따라 API 응답 형식이 변경될 수 있습니다.

## 기술 스택

- **TypeScript**: 타입 안전성 보장
- **Yahoo Finance API**: 실시간 주식 데이터
- **React Router**: API 라우팅
- **Tailwind CSS**: UI 스타일링

## 향후 개선 사항

1. **캐싱 시스템**: Redis를 사용한 데이터 캐싱
2. **실시간 업데이트**: WebSocket을 통한 실시간 데이터 스트리밍
3. **차트 데이터**: 차트 라이브러리 연동
4. **알림 시스템**: 주가 변동 알림 기능
5. **포트폴리오 관리**: 사용자별 포트폴리오 추적
