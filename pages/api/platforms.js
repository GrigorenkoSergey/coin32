const apiSrc = process.env.API_URL;
const key = process.env.API_KEY;

export default async function handler(req, res) {
  const result = await fetch(`${apiSrc}/platforms?${new URLSearchParams({ key })}`);
  const data = await result.json();
  const platforms = data.results.map(({ id, name: text }) => ({ id, text }));

  return res.status(200).json(platforms);
}
