

export async function fetchCreditCardData() {
    const response = await fetch("http://localhost:8080/getAllCreditCards");
    if (!response.ok) throw new Error("Fetch failed");
    return await response.json();
}

export async function addCreditCardToDatabase(creditCard) {
    const response = await fetch("http://localhost:8080/saveCreditCard", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creditCard)
    });
    if (!response.ok) throw new Error("Add failed");
}