
    const form = document.getElementById('question-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();


        form.addEventListener('submit', async (e) => {
            e.preventDefault();
        
            const questionInput = document.getElementById('question');
            const question = questionInput.value.trim();
        
            if (question) {
                const response = await fetch('your_api_endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ question })
                });
        
                if (response.ok) {
                    questionInput.value = '';
                    const result = await response.json();
                    console.log('Question successfully submitted:', result);
                } else {
                    console.error('Error submitting question:', response.statusText);
                }
            } else {
                console.log('Please enter a valid question.');
            }
        });