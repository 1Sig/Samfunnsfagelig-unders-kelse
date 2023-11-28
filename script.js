document.addEventListener('DOMContentLoaded', function () {
  const maxPointsSpan = document.getElementById('max-points');
  const questionsContainer = document.getElementById('questions-container');
  const pieChartCanvas = document.getElementById('pie-chart');
  const pieChartContext = pieChartCanvas.getContext('2d');

  // Define your questions and their default points
  const questions = [
    { points: 0 },
    { points: 0 },
    { points: 0 },
  ];

  // Set the initial max points
  let maxPoints = 100;
  updateMaxPoints();

  // Function to update points and re-render questions
  window.updatePoints = function (index, value) {
    value = parseInt(value);

    // Calculate the change in points
    const change = value - questions[index].points;

    // Check if the change is valid (within the maxPoints limit)
    if (maxPoints - change >= 0) {
      maxPoints -= change; // Deduct the change from maxPoints
      questions[index].points = value;
      updateMaxPoints();
      updatePieChart();
    } else {
      // If the change exceeds the available points, reset the input
      questionsContainer.children[index].querySelector('input').value = questions[index].points;
    }
  };

  // Function to update the total points
  function updateMaxPoints() {
    maxPointsSpan.textContent = maxPoints;
  }

  // Function to update the pie chart
  function updatePieChart() {
    // Extract labels and data from questions
    const labels = questions.map((question, index) => `Question ${index + 1}`);
    const data = questions.map(question => question.points);

    // Destroy the existing chart (if any)
    if (window.pieChart) {
      window.pieChart.destroy();
    }

    // Create a new pie chart
    window.pieChart = new Chart(pieChartContext, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
          borderWidth: 1,
        }],
      },
    });
  }

  // Function to submit the form (you can customize this based on your needs)
  window.submitForm = function () {
    alert('Form submitted!'); // Add your form submission logic here
  };
});
