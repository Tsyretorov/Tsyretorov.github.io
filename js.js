const csvUrl = "https://your-domain.com/data.csv";

Papa.parse(csvUrl, {
    header: true,
    download: true,
    complete: function(results) {
        const data = results.data;

        // Очистка canvas
        const ctxRevenue = document.getElementById('chart-revenue').getContext('2d');
        const ctxProfit = document.getElementById('chart-profit').getContext('2d');
        ctxRevenue.clearRect(0, 0, ctxRevenue.canvas.width, ctxRevenue.canvas.height);
        ctxProfit.clearRect(0, 0, ctxProfit.canvas.width, ctxProfit.canvas.height);

        // Обработка данных и построение графиков
        // ...

        // Пример построения графика выручки
        const revenueData = data.map(d => d.Выручка);
        const labels = data.map(d => d.Order_ID);
        new Chart(ctxRevenue, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Выручка',
                    data: revenueData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        // Пример построения графика прибыли
        const profitData = data.map(d => d.Прибыль);
        new Chart(ctxProfit, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Прибыль',
                    data: profitData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
});
