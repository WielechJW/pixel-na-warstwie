import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, afterAll, expect } from 'vitest'

let payload: Payload
let categoryId: number
const postIds: number[] = []

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    const category = await payload.create({
      collection: 'categories', data: { name: 'Review test', slug: `review-${Date.now()}` },
    })
    categoryId = category.id
    for (const status of ['draft', 'published'] as const) {
      const post = await payload.create({
        collection: 'posts',
        data: {
          title: `Review ${status}`, slug: `review-${status}-${Date.now()}`, status,
          category: categoryId, publishedAt: new Date().toISOString(), readingTime: '2 min',
          description: 'Integration fixture',
          sections: [{ heading: 'Test', paragraphs: [{ text: 'Test paragraph' }] }],
          takeaways: [{ text: 'Test takeaway' }],
        },
      })
      postIds.push(post.id)
    }
  }, 30_000)

  afterAll(async () => {
    if (!payload) return
    for (const id of postIds) await payload.delete({ collection: 'posts', id })
    if (categoryId) await payload.delete({ collection: 'categories', id: categoryId })
    await payload.destroy()
  })

  it('anonymous visitors see published posts, never drafts', async () => {
    const result = await payload.find({
      collection: 'posts', overrideAccess: false, user: null,
      where: { id: { in: postIds } },
    })
    expect(result.docs.map((post) => post.id)).toEqual([postIds[1]])
  })

  it('anonymous visitors cannot list users', async () => {
    await expect(payload.find({ collection: 'users', overrideAccess: false, user: null }))
      .rejects.toThrow()
  })

  it('anonymous visitors cannot create categories', async () => {
    await expect(payload.create({
      collection: 'categories', overrideAccess: false, user: null,
      data: { name: 'Forbidden', slug: 'forbidden' },
    })).rejects.toThrow()
  })

  it('rejects slugs that cannot be addressed by the frontend route', async () => {
    await expect(payload.update({
      collection: 'posts', id: postIds[0], data: { slug: 'bad/slug' },
    })).rejects.toThrow()
  })
})
