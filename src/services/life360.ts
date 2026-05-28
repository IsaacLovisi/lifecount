import "dotenv/config";

export async function fetchCircles() {
    const url = "https://api-cloudfront.life360.com/v3/circles.json";
    const token = process.env.LIFE360_360;

    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    });

    if(!response.ok){
        throw new Error(`Falha na Api Life360: ${response.status}`);
    }

    return response.json();
}