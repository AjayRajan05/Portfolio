import { resumeData } from "@/data/resume"

interface ResumeChunk {
  text: string
  source: string
  relevance: number
}

// Create chunks from resume data
function createResumeChunks(): ResumeChunk[] {
  const chunks: ResumeChunk[] = []

  // Add basics
  chunks.push({
    text: resumeData.basics.summary,
    source: 'summary',
    relevance: 0
  })
  chunks.push({
    text: resumeData.basics.longBio,
    source: 'bio',
    relevance: 0
  })

  // Add projects
  resumeData.projects.forEach(project => {
    chunks.push({
      text: `${project.name}: ${project.description}`,
      source: `project:${project.name}`,
      relevance: 0
    })
  })

  // Add work experience
  resumeData.work.forEach(work => {
    chunks.push({
      text: `${work.position} at ${work.company}: ${work.summary}`,
      source: `work:${work.company}`,
      relevance: 0
    })
  })

  // Add skills
  resumeData.skills.forEach(category => {
    category.skills.forEach(skill => {
      chunks.push({
        text: `${skill.name}: ${skill.keywords.join(", ")}`,
        source: `skill:${category.category}`,
        relevance: 0
      })
    })
  })

  return chunks
}

// Calculate relevance score for a chunk based on query
function calculateRelevance(chunk: ResumeChunk, query: string): number {
  const queryWords = query.toLowerCase().split(/\s+/)
  const chunkText = chunk.text.toLowerCase()
  let score = 0

  // Count word matches
  queryWords.forEach(word => {
    if (chunkText.includes(word)) {
      score += 1
    }
  })

  // Boost score for exact matches
  if (chunkText.includes(query.toLowerCase())) {
    score += 2
  }

  // Boost score for certain sources
  if (chunk.source === 'bio' || chunk.source === 'summary') {
    score += 1
  }

  return score
}

// Search through resume chunks
export function searchResumeChunks(query: string): string {
  const chunks = createResumeChunks()
  const queryLower = query.toLowerCase()

  // Calculate relevance for each chunk
  chunks.forEach(chunk => {
    chunk.relevance = calculateRelevance(chunk, queryLower)
  })

  // Sort chunks by relevance
  chunks.sort((a, b) => b.relevance - a.relevance)

  // Get top 3 most relevant chunks
  const topChunks = chunks.slice(0, 3)

  // If no relevant chunks found, return the bio as fallback
  if (topChunks.length === 0 || topChunks[0].relevance === 0) {
    return resumeData.basics.longBio
  }

  // Combine top chunks into context
  return topChunks
    .map(chunk => chunk.text)
    .join('\n\n')
} 