export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { source } = req.query;

  if (!source) {
    return res.status(400).json({ error: 'Missing source parameter' });
  }

  try {
    if (source === 'airgradient') {
      const locationId = '73973';
      const apiKey = '1fdbb68d-73a2-4d82-b6aa-05cb7d9c0ec1';

      const response = await fetch(
        `https://api.airgradient.com/public/api/v1/locations/${locationId}/latest/air-data`,
        {
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} from AirGradient`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    if (source === 'weather') {
      const city = 'Madrid';
      const apiKey = '1633c2c0ae902b6f58dde64c8335ce5b';

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} from OpenWeatherMap`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Unknown source' });
  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).json({
      error: error.message,
      source,
      timestamp: new Date().toISOString(),
    });
  }
}
