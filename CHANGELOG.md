# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-15

### Added
- New configuration option support
- Enhanced functionality

### Fixed
- Fixed deprecated option usage
- Fixed module resolution issue for 'node' mode (모듈 해석 'node' 경우 오류 수정)

## [1.0.0] - 2025-01-15

### Added
- 🚀 Initial release of vite-plugin-svg-sprite-builder
- ⚡ Vite plugin with 3 modes: inline, file, hybrid
- 🛠️ CLI tool for standalone sprite generation
- 📦 TypeScript support with full type definitions
- 🎨 SVGO integration for automatic SVG optimization
- 🔥 Hot Module Replacement support in development
- 📝 Comprehensive documentation in Korean and English
- 🎯 Support for both development and production builds

### Features
- **Multiple Output Modes**
  - `inline`: Runtime injection for development
  - `file`: Static file generation for production
  - `hybrid`: Best of both worlds
- **CLI Tool**: `build-svg-sprite` command for standalone usage
- **Programmatic API**: Core functions exportable for custom usage
- **TypeScript**: Full type safety and IDE support
- **SVGO Integration**: Customizable SVG optimization
- **Virtual Modules**: `virtual:svg-sprite` import support

### Technical Details
- Node.js 16+ support
- Vite 4+ and 5+ compatibility
- ESM module format
- TypeScript source with compiled JavaScript output
- Comprehensive error handling and logging

[1.1.0]: https://github.com/mango7j/vite-plugin-svg-sprite-builder/releases/tag/v1.1.0
[1.0.0]: https://github.com/mango7j/vite-plugin-svg-sprite-builder/releases/tag/v1.0.0