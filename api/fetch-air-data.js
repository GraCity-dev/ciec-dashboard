export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const locationId = '73973';
    const apiKey = '1fdbb68d-73a2-4d82-b6aa-05cb7d9c0ec1';
    
    const response = await fetch(
      `https://api.airgradient.com/public/api/v1/locations/${locationId}/latest/air-data`,
      {
        headers: {
          'x-api-key': apiKey
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: `AirGradient: ${response.statusText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
