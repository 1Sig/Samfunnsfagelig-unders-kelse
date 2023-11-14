
    const form = document.getElementById('question-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get the values of the form fields
        const title = document.getElementById('question-title').value;
        const details = document.getElementById('question-details').value;

        // Create a new question in the Firestore database
        db.collection('questions').add({
            title: title,
            details: details
        })
        .then(() => {
            console.log('Form submitted successfully');
        })
        .catch((error) => {
            console.error('Error submitting form: ', error);
        });
    });
