const apiSrc = process.env.API_URL;
const key = process.env.API_KEY;

export default async function handler(req, res) {
  const mappedUrl = req.url.replace(/\/api/, apiSrc)
  + (req.url.includes('?') ? '&key=' : '?key=') + key;

  const result = await fetch(mappedUrl);
  const data = await result.json();

  return res.status(200).json(data);
}
