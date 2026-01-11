export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { source } = req.query;

  try {
    if (source === 'airgradient') {
      const response = await fetch(
        `https://api.airgradient.com/public/api/v1/locations/73973/latest/air-data`,
        {
          headers: { 'x-api-key': '1fdbb68d-73a2-4d82-b6aa-05cb7d9c0ec1' }
        }
      );
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (source === 'weather') {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=3fef9b51-6144-468b-b09c-7e93282c4ad3&units=metric`
      );
      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Unknown source' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
