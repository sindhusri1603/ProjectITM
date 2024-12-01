var city = "";

function getLoc() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Properly close the backticks and quotes in the fetch URL
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
                .then(res => res.json()) // Correctly close the .then function
                .then(data => {
                    console.log(data);
                    city = data.city || "Unknown"; // Safely capture the city name
                    document.getElementById('locationDisplay').innerText = `Location: ${city}`; // Display the location
                })
                .catch(error => {
                    console.error("Error fetching location: ", error);
                });
        },
        (error) => {
            console.error("Error getting geolocation: ", error);
            document.getElementById('locationDisplay').innerText = "Unable to fetch location.";
        }
    );
}

function handleSubmit(event) {
    alert(city);
    event.preventDefault(); // Prevent the form from submitting the default way

    // Collecting data from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const className = document.getElementById('className').value;

    // Proceed with form submission to server
    fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, className, location: city }), // Sending location as city
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('message').innerText = data.message; // Display success message
        window.location.href = "success.html"; // Redirect to success page
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        document.getElementById('message').innerText = 'Error: try in college campus'; // Display error messages
    });
}


// Event listener for the form submission
document.getElementById('dataForm').addEventListener('submit', handleSubmit);

// Call getLoc() to fetch the location when the script runs

