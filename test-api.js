
async function testAPI() {
    try {
        console.log("Testing http://api.open-notify.org/iss-pass.json...");
        const res = await fetch("http://api.open-notify.org/iss-pass.json?lat=40.7128&lon=-74.0060");
        console.log("Status:", res.status);
        if (res.ok) {
            const data = await res.json();
            console.log("Data received:", data);
        } else {
            console.log("Error response:", await res.text());
        }
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

testAPI();
