// Import the SVG sprite - this will inject all icons into the page
import 'virtual:svg-sprite'

console.log('🎨 SVG Sprite loaded!')
console.log('Icons are now available as #icon-[name]')

// Example: Dynamically create icons
function createIcon(name, className = 'icon') {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  
  svg.setAttribute('class', className)
  use.setAttribute('href', `#icon-${name}`)
  
  svg.appendChild(use)
  return svg
}

// Add a dynamic icon example
const dynamicIcon = createIcon('user', 'icon dynamic-icon')
dynamicIcon.style.cssText = 'width: 24px; height: 24px; color: blue; margin-right: 8px;'

const title = document.querySelector('h1')
title.insertBefore(dynamicIcon, title.firstChild)