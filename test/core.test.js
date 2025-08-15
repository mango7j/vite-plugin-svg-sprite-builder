import { promises as fs } from 'fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { generateSprite, createIIFEScript } from '../dist/core.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Simple test framework
let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    console.log(`✓ ${name}`)
    passed++
  } catch (error) {
    console.log(`✗ ${name}`)
    console.error(`  ${error.message}`)
    failed++
  }
}

async function asyncTest(name, fn) {
  try {
    await fn()
    console.log(`✓ ${name}`)
    passed++
  } catch (error) {
    console.log(`✗ ${name}`)
    console.error(`  ${error.message}`)
    failed++
  }
}

// Create test fixtures
async function setupTestFixtures() {
  const testDir = path.join(__dirname, 'fixtures')
  await fs.mkdir(testDir, { recursive: true })
  
  // Create test SVG files
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>`
  
  const userSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>`
  
  await fs.writeFile(path.join(testDir, 'home.svg'), iconSvg)
  await fs.writeFile(path.join(testDir, 'user.svg'), userSvg)
  
  return testDir
}

// Clean up test fixtures
async function cleanupTestFixtures() {
  const testDir = path.join(__dirname, 'fixtures')
  try {
    await fs.rm(testDir, { recursive: true })
  } catch (error) {
    // Ignore cleanup errors
  }
}

// Tests
async function runTests() {
  console.log('Running tests...\n')
  
  const testDir = await setupTestFixtures()
  
  await asyncTest('generateSprite should create sprite from SVG files', async () => {
    const result = await generateSprite({ iconDir: testDir })
    
    if (!result.sprite) throw new Error('No sprite generated')
    if (!result.sprite.includes('<svg')) throw new Error('Invalid sprite format')
    if (!result.sprite.includes('icon-home')) throw new Error('Missing home icon')
    if (!result.sprite.includes('icon-user')) throw new Error('Missing user icon')
    if (result.iconCount !== 2) throw new Error(`Expected 2 icons, got ${result.iconCount}`)
  })
  
  await asyncTest('generateSprite should handle empty directory', async () => {
    const emptyDir = path.join(__dirname, 'empty')
    await fs.mkdir(emptyDir, { recursive: true })
    
    const result = await generateSprite({ iconDir: emptyDir })
    
    if (result.iconCount !== 0) throw new Error(`Expected 0 icons, got ${result.iconCount}`)
    
    await fs.rm(emptyDir, { recursive: true })
  })
  
  test('createIIFEScript should generate valid JavaScript', () => {
    const sprite = '<svg><symbol id="test">content</symbol></svg>'
    const script = createIIFEScript(sprite)
    
    if (!script.includes('function()')) throw new Error('Missing IIFE wrapper')
    if (!script.includes('document.createElement')) throw new Error('Missing DOM manipulation')
    if (!script.includes(sprite)) throw new Error('Missing sprite content')
  })
  
  await cleanupTestFixtures()
  
  console.log(`\nTest Results: ${passed} passed, ${failed} failed`)
  
  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch(console.error)