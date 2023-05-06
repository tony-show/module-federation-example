import { useEffect, useState } from "react";
import { getPosts } from '../services/posts'

export const Posts = () => {
  const [posts, setPosts] = useState<Record<string, any>[]>();

  useEffect(() => {
    (async () => {
      setPosts(await getPosts())
      return
    })()
  }, [])

  if (!posts) return null

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '30px'
    }}>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
