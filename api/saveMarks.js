export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxtssdb78D-BH6_Xj35GaOPlmf4LAAI1FMpZf4vGiXGYffhvOVMev6C_Fn6JOsiWuNbdw/exec';

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text(); // Log HTML response
            console.error('Non-JSON response from AppScript:', text);
            return res.status(500).json({ error: 'Invalid response from AppScript', details: text });
        }

        const data = await response.json(); // Parse response from AppScript
        res.status(200).json(data); // Relay response back to frontend
    } catch (error) {
        console.error('Error in proxy:', error);
        res.status(500).json({ error: 'Failed to communicate with AppScript.', details: error.message });
    }
}
