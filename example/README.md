# Example Usage

이 예제는 `vite-plugin-svg-sprite-builder`의 사용법을 보여줍니다.

## 실행 방법

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 빌드:
```bash
npm run build
```

## CLI 사용 예시

```bash
# JavaScript 파일로 스프라이트 생성
npm run build:sprites

# SVG 파일로 스프라이트 생성
npx build-svg-sprite --icons ./icons --out dist/sprite.svg --format svg
```

## 다른 모드 테스트

`vite.config.js`에서 모드를 변경해보세요:

- `mode: 'inline'` - 런타임에 주입 (현재 설정)
- `mode: 'file'` - 정적 파일로 생성
- `mode: 'hybrid'` - 개발에서는 inline, 프로덕션에서는 file

각 모드의 차이점을 확인할 수 있습니다.