
(e) => {
    e.preventDefault();

    // add submit event listener
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        // get question input
        const questionInput = document.getElementById('question');
        const question = questionInput.value.trim();
    
        // check if question exists
        if (question) {
            // send post request to api
            const response = await fetch('your_api_endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question })
            });
    
            // handle response
            if (response.ok) {
                questionInput.value = '';
                const result = await response.json();
                console.log('Question submitted:', result);
            } else {
                console.error('Error submitting:', response.statusText);
            }
        } else {
            console.log('Please enter a valid question.');
        }
    });
}