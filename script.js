const answers = {};
let categorySums = [0, 0, 0];
const categorynames = ["K1", "K2", "K3"];

function saveAnswers() {
    categorySums = [0, 0, 0];
    
    // Iterate over all questions
    document.querySelectorAll('input[type="radio"]:checked').forEach((radio) => {
        const name = radio.name;
        const value = parseInt(radio.value);
        const category = document.querySelector(`input[name="${name}"]`).closest('.list-group-item').dataset.category;

        // Save individual answer
        answers[name] = value;

        // Calculate sum per category
        const index = categorynames.indexOf(category);
        if (index !== -1) {
            categorySums[index] += value;
        }
    });

    // Example: Print answers and category sums to the console
    console.log("Answers:", answers);
    console.log("Category Sums:", categorySums);
    updateChart();
}

// Sample data for the radar chart
const data = {
    labels: categorynames,
    datasets: [{
        label: 'Deine Antworten',
        data: categorySums,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
        label: 'Vergleichswert',
        data: [8, 8, 8],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
};

// Radar chart configuration
const config = {
    type: 'radar',
    data: data,
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                    lineWidth: 3
                },
                suggestedMin: 0,
                suggestedMax: 10
            }
        }
    },
};

// Initialize the radar chart
const myRadarChart = new Chart(
    document.getElementById('myRadarChart'),
    config
);

// Function to update the chart data
function updateChart() {
    myRadarChart.data.datasets[0].data = categorySums;
    myRadarChart.update();
}
