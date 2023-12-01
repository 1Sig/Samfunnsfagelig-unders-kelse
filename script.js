document.addEventListener('DOMContentLoaded', function () {
  const questionsContainer = document.getElementById('questions-container');
  const pointsLeftContainer = document.getElementById('points-left');
  const chartContainer = document.getElementById('chart-container');
  const legendContainer = document.getElementById('legend');
  const chartCanvas = document.getElementById('chart');
  const chartContext = chartCanvas.getContext('2d');

  // Define your questions and their default points
  const maxPoints = 100;
  const minPointsPerQuestion = 1;
  const questions = Array.from({ length: 12 }, () => ({ points: 1 }));

  // Function to update points and re-render questions
  window.updatePoints = function (index, value) {
    value = parseInt(value);

    // Check if the change is valid (within the maxPoints limit)
    if (value >= minPointsPerQuestion && value <= questions[index].points + maxPoints - getCurrentTotalPoints(index)) {
      questions[index].points = value;
      updateChart();
      updatePointsLeft();
    } else {
      // If the input is invalid, reset the input
      questionsContainer.children[index].querySelector('input').value = questions[index].points;
    }
  };

  // Function to get the current total points assigned to questions
  function getCurrentTotalPoints(excludeIndex) {
    return questions.reduce((sum, question, index) => (index !== excludeIndex ? sum + question.points : sum), 0);
  }

  // Function to update the points left counter
  function updatePointsLeft() {
    const pointsLeft = maxPoints - getCurrentTotalPoints();
    pointsLeftContainer.textContent = pointsLeft;
  }

  // Function to update the chart
  function updateChart() {
    // Extract labels and data from questions
    const labels = questions.map((question, index) => `Question ${index + 1}`);
    const data = questions.map(question => question.points);

    // Destroy the existing chart (if any)
    if (window.myChart) {
      window.myChart.destroy();
    }

    // Create a new pie chart
    window.myChart = new Chart(chartContext, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 69, 0, 0.7)',
            'rgba(0, 128, 0, 0.7)',
            'rgba(128, 0, 128, 0.7)',
            'rgba(0, 0, 255, 0.7)',
            'rgba(255, 0, 255, 0.7)',
            'rgba(128, 128, 128, 0.7)',
          ],
        }],
      },
      options: {
        legend: {
          display: false,
        },
      },
    });

    // Update legend
    const legendItems = labels.map((label, index) => {
      return `<div><span style="background-color:${window.myChart.data.datasets[0].backgroundColor[index]}"></span>${label}</div>`;
    });

    legendContainer.innerHTML = legendItems.join('');
  }

  // Function to submit the form
  window.submitForm = function () {
    // Update the chart when the form is submitted
    updateChart();

    // Show the chart container and hide the questions container
    questionsContainer.style.display = 'none';
    chartContainer.style.display = 'block';
  };

  // Initial update of points left counter
  updatePointsLeft();
});