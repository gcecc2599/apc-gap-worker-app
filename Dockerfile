# Node.js 프로덕션 빌드용 Dockerfile
FROM node:20-alpine

WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# 프로덕션 실행
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# 서버 시작
CMD ["npm", "run", "start"]
