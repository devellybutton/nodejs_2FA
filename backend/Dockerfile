# Node.js 이미지 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --prefer-offline

# 애플리케이션 소스 복사
COPY . .

# 포트 개방
EXPOSE 3000

# 개발 모드로 애플리케이션 시작
CMD ["npm", "run", "start:dev"]