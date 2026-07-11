export type ProjectCategory = 'branding' | 'product' | 'editorial' | 'web'

export interface Project {
  slug: string
  title: string
  year: number
  category: ProjectCategory
  description: string
  tags: string[]
  coverImage: string
  images: string[]
  role: string
  client?: string
  url?: string
}
