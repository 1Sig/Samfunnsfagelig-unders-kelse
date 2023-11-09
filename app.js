    /* Firebbas config */
    const firebaseConfig = {
        apiKey: "your-api-key",
        authDomain: "your-auth-domain",
        projectId: "your-project-id",
        storageBucket: "your-storage-bucket",
        messagingSenderId: "your-messaging-sender-id",
        appId: "your-app-id"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();


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
            console.log('Question submitted successfully');
        })
        .catch((error) => {
            console.error('Error submitting question: ', error);
        });
    });
