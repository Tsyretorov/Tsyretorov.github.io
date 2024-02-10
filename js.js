const loadData = async () => {
    const response = await fetch("../data/data.csv");
    const data = await response.text();
    const rows = data.split("\n");
    const headers = rows[0].split(",");
    const values = rows.slice(1).map(row => row.split(","));
    console.log(headers)
    console.log(values)

    return { headers, values };
};

const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: regions,
    datasets: [{
      label: "Прибыль",
      data: profits,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    }],
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  },
});


const init = async () => {
    const data = await loadData();
    const metric = document.getElementById("metric").value;
    drawChart(data, metric);

    document.getElementById("metric").addEventListener("change", (event) => {
        const newMetric = event.target.value;
        drawChart(data, newMetric);
    });
};


init();
