import fs from 'node:fs'
import path from 'node:path'
import type { Project } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'projects')

export function getProjects(): Project[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'))
  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
    return JSON.parse(raw) as Project
  })
  return projects.sort((a, b) => b.year - a.year)
}

export function getProject(slug: string): Project | undefined {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return undefined
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as Project
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))
}
