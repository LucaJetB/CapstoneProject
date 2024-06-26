//* Created by: Ariana Martell

// Fetch recent meal data from server 
export async function getRecentMeals(token) {
    try {
        const response = await fetch('/api/meal', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if(!response.ok) {
            console.error('Request failed!');
        } else {
            const data = await response.json();
            return data
        }
    } catch(e) {
        throw e
    }
}