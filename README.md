# 🔐 2단계 인증 데모 프로젝트

- <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white" alt="React" />
- <img src="https://img.shields.io/badge/Backend-NestJS-E0234E?logo=nestjs&logoColor=white" alt="NestJS" />
- <img src="https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
- <img src="https://img.shields.io/badge/ODM-Mongoose-880000?logo=mongoose&logoColor=white" alt="Mongoose" />
- <img src="https://img.shields.io/badge/2FA-Speakeasy-FFA500" alt="Speakeasy" />
- <img src="https://img.shields.io/badge/QR%20Code-qrcode-blue" alt="qrcode" />

---

## 📌 프로젝트 목적

- 의심스러운 로그인 시 Google Authenticator 기반의 **2단계 인증 흐름을 데모**로 구현
- 실제 프로젝트에 적용하기 전, 기능 흐름 및 로직을 시뮬레이션해보는 것이 목적

---

## 🧭 전체 플로우 개요

1. 사용자가 로그인 시도 (`/login`)
2. 서버는 로그인 기록을 저장하고, 직전 로그인 기록과 비교해 **의심스러운 로그인 여부** 판단
3. 의심스러운 로그인으로 판단되면 사용자에게 아래 두 가지 선택지 제공:
   - ✅ **2단계 인증 진행 (Google Authenticator 사용)**
   - ❌ **그냥 로그인 계속 진행**
4. 2단계 인증은 `speakeasy` 기반으로 OTP 토큰을 생성하고 Google Authenticator 앱으로 인증
5. 검증 성공 시 로그인 완료

---

## 🛠️ 구현 방식 요약

### 프론트엔드 (React)

- 로그인 창에는 **샘플 계정 정보가 기본으로 채워진 상태**
- 로그인 버튼 클릭 시 `/login` API 호출
- 의심스러운 로그인 응답 시 다음과 같은 UI 제공:
  - 메시지: _"의심스러운 로그인 정보가 감지되었습니다. 해당 일시 및 기기에서 로그인한 기록이 없다면, 2단계 인증을 진행해주세요."_
  - 버튼:
    - [2단계 인증하기]
    - [그냥 로그인하기]

### 백엔드 (NestJS)

- `/login` API만 구현 _(실제 인증 없이 요청만 처리)_
- MongoDB에 로그인 기록 저장 _(IP, 디바이스 정보 등 포함)_
- 마지막 로그인 기록과 비교하여 `suspicious` 여부 판단
- 의심스러운 경우 2단계 인증 또는 우회 선택지 제공

### 2단계 인증 API 흐름

- `/2fa/setup`  
  - `speakeasy`로 OTP Secret 생성  
  - QR코드 또는 키 반환 → Google Authenticator 앱에 등록

- `/2fa/verify`  
  - 사용자 입력 코드 검증  
  - 성공 시 로그인 처리

---

## ⚠️ 의심스러운 로그인 판단 기준

- 기존 로그인 기록이 존재할 경우,
  - 직전 로그인과 비교하여 `IP`, `브라우저`, `OS`, `기기` 정보 중 **하나라도 다르면** 의심스러운 로그인으로 간주
