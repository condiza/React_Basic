import { useEffect, useState } from 'react'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch image')
        return res.json()
      })
      .then(data => {
        const { url } = data
        console.log('imageUrl: ', url)
        setImageUrl(url)
      })
  }, [fact])

  return { imageUrl }
}
