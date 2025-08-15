# vite-plugin-svg-sprite-builder

아이콘 디렉토리에서 SVG 스프라이트를 빌드하는 유연한 Vite 플러그인입니다. 개발 및 프로덕션 모드에서 다양한 출력 형식을 지원합니다.

## 주요 기능

- 🔥 **핫 모듈 교체** - 개발 중 아이콘이 즉시 업데이트
- 📦 **다양한 모드** - 인라인, 파일 기반, 하이브리드 방식 지원
- ⚡ **빠른 개발** - 개발 모드에서 파일 I/O 없는 가상 모듈 사용
- 🎯 **프로덕션 준비** - 최적 성능을 위한 정적 파일 생성
- 🛠️ **CLI 지원** - 독립 실행형 명령줄 도구
- 📝 **TypeScript** - 타입 정의가 포함된 완전한 TypeScript 지원
- 🎨 **SVGO 통합** - 자동 SVG 최적화

## 설치

```bash
npm install vite-plugin-svg-sprite-builder --save-dev
```

## 사용법

### 1. Vite 플러그인 (권장)

#### 기본 설정

```js
// vite.config.js
import { resolve } from 'path'
import { svgSpritePlugin } from 'vite-plugin-svg-sprite-builder'

export default {
  plugins: [
    svgSpritePlugin({
      iconDir: resolve(__dirname, './assets/icons')
    })
  ]
}
```

```js
// 앱 진입점에서
import 'virtual:svg-sprite'
```

```html
<!-- HTML에서 아이콘 사용 -->
<svg>
  <use href="#icon-home"></use>
</svg>
```

#### 플러그인 옵션

```js
svgSpritePlugin({
  iconDir: './assets/icons',        // SVG 파일이 있는 디렉토리
  mode: 'inline',                   // 'inline' | 'file' | 'hybrid'
  outputFile: 'dist/sprite.svg',    // 출력 파일 경로 ('file', 'hybrid' 모드용)
  autoInject: true,                 // HTML에 스프라이트 자동 주입
  svgoConfig: {                     // 사용자 정의 SVGO 설정
    overrides: {
      removeViewBox: false
    }
  }
})
```

#### 모드 비교

| 모드 | 개발 환경 | 프로덕션 환경 | 적합한 용도 |
|------|-----------|---------------|-------------|
| `inline` | 런타임 주입 | 번들에 포함 | 작은 아이콘 세트, SPA |
| `file` | 정적 파일 + fetch | 정적 파일 + fetch | 큰 아이콘 세트, SSR |
| `hybrid` | 런타임 주입 | 정적 파일 + fetch | 두 방식의 장점 결합 |

### 2. CLI 도구

전역 설치하거나 npx로 사용:

```bash
# IIFE가 포함된 JavaScript 파일 생성
npx build-svg-sprite --icons ./assets/icons --out dist/sprite.js

# SVG 파일 생성
npx build-svg-sprite --icons ./assets/icons --out dist/sprite.svg --format svg

# 사용자 정의 경로
npx build-svg-sprite --icons ./src/icons --out public/sprites.js
```

#### CLI 옵션

- `--icons <path>` - 아이콘 디렉토리 (기본값: `./assets/icons`)
- `--out <path>` - 출력 파일 경로 (기본값: `dist/sprite.js`)
- `--format <type>` - 출력 형식: `js` 또는 `svg` (기본값: `js`)

### 3. 프로그래매틱 API

```js
import { generateSprite, createIIFEScript } from 'vite-plugin-svg-sprite-builder/core'

// 스프라이트 데이터 생성
const { sprite, symbols, iconCount } = await generateSprite({
  iconDir: './assets/icons',
  svgoConfig: { /* 사용자 정의 설정 */ }
})

// JavaScript IIFE 생성
const jsCode = createIIFEScript(sprite)

console.log(`${iconCount}개의 아이콘으로 스프라이트 생성`)
```

## 아이콘 구조

지정된 디렉토리에 SVG 파일을 구성하세요:

```
assets/icons/
├── home.svg
├── user.svg
├── settings.svg
└── subfolder/
    └── arrow.svg
```

아이콘은 다음과 같이 사용할 수 있습니다:
- `#icon-home`
- `#icon-user`
- `#icon-settings`
- `#icon-arrow`

## 사용 예시

### React 컴포넌트

```tsx
interface IconProps {
  name: string
  className?: string
}

const Icon: React.FC<IconProps> = ({ name, className }) => (
  <svg className={className}>
    <use href={`#icon-${name}`} />
  </svg>
)

// 사용법
<Icon name="home" className="w-6 h-6" />
```

### Vue 컴포넌트

```vue
<template>
  <svg :class="className">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  name: string
  className?: string
}

defineProps<Props>()
</script>
```

### Package.json 스크립트

```json
{
  "scripts": {
    "build:sprites": "build-svg-sprite --icons ./src/icons --out public/sprite.js",
    "build:sprites:svg": "build-svg-sprite --icons ./src/icons --out public/sprite.svg --format svg"
  }
}
```

## 설정

### SVGO 최적화

SVG 최적화 사용자 정의:

```js
svgSpritePlugin({
  iconDir: './assets/icons',
  svgoConfig: {
    overrides: {
      removeViewBox: false,
      removeUselessStrokeAndFill: false,
      removeUnknownsAndDefaults: false,
      // 추가 SVGO 옵션
    }
  }
})
```

### TypeScript

플러그인은 완전한 TypeScript 지원을 포함합니다:

```ts
import type { SvgSpritePluginOptions } from 'vite-plugin-svg-sprite-builder'

const config: SvgSpritePluginOptions = {
  iconDir: './assets/icons',
  mode: 'hybrid'
}
```

## 개발

```bash
# 의존성 설치
npm install

# 플러그인 빌드
npm run build

# 워치 모드
npm run dev
```

## 라이선스

MIT

## 기여하기

1. 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 열어주세요

---

Vite 생태계를 위해 ❤️로 제작