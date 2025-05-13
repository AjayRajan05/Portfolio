/**
 * A simple SplitText utility for splitting text into characters and words
 * Similar to GSAP's SplitText but much simpler and without the dependency
 */
export class SplitText {
  private element: HTMLElement
  private originalHTML: string
  private splitOptions: { type: string }
  public chars: HTMLElement[] = []
  public words: HTMLElement[] = []
  public lines: HTMLElement[] = []

  constructor(element: HTMLElement, options: { type: string }) {
    this.element = element
    this.originalHTML = element.innerHTML
    this.splitOptions = options
    this.split()
  }

  private split() {
    const types = this.splitOptions.type.split(',')
    const text = this.element.textContent || ''
    this.element.innerHTML = ''
    
    if (types.includes('words')) {
      const words = text.split(' ')
      
      words.forEach((word, i) => {
        const wordSpan = document.createElement('span')
        wordSpan.className = 'split-word'
        wordSpan.style.display = 'inline-block'
        wordSpan.textContent = word
        
        if (i < words.length - 1) {
          wordSpan.textContent += ' '
        }
        
        this.element.appendChild(wordSpan)
        this.words.push(wordSpan)
      })
      
      if (types.includes('chars')) {
        this.words.forEach(word => {
          const text = word.textContent || ''
          word.textContent = ''
          
          for (let i = 0; i < text.length; i++) {
            const charSpan = document.createElement('span')
            charSpan.className = 'split-char'
            charSpan.style.display = 'inline-block'
            charSpan.textContent = text[i]
            word.appendChild(charSpan)
            this.chars.push(charSpan)
          }
        })
      }
    } else if (types.includes('chars')) {
      for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement('span')
        charSpan.className = 'split-char'
        charSpan.style.display = 'inline-block'
        charSpan.textContent = text[i]
        this.element.appendChild(charSpan)
        this.chars.push(charSpan)
      }
    }
  }

  public revert() {
    this.element.innerHTML = this.originalHTML
    this.chars = []
    this.words = []
    this.lines = []
  }
}