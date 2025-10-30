const CAT_IMAGE_API_RANDOM_URL = 'https://catfact.ninja/fact'

export const getRandomFact = async () => {
  const res = await fetch(CAT_IMAGE_API_RANDOM_URL)
  const data = await res.json()
  const { fact } = data
  return fact
}
