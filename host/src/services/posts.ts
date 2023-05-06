export const getPosts = () =>
  fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
    response.json()
  )

export const getPostById = (id: number) =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((response) =>
    response.json()
  )
