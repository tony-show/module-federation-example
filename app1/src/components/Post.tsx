import { useEffect, useState } from 'react'
import { getPostById } from 'host/posts'

export const Post = () => {
  const id = 1
  const [post, setPost] = useState<Promise<any>>();

  useEffect(() => {
    getPostById(id).then(setPost)
  }, [])

  if (!post) return null

  return (
    <div style={{
      marginTop: "50px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "30px"
    }}>
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    </div>
  )
}
