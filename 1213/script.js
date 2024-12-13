function show() {
    const ctx = document.getElementById("c").getContext("2d");

    const rows = document.querySelectorAll("table tbody tr");
    const lb = [];
    const d = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const year = cells[0].innerText;
        lb.push(year);
        d.push(parseInt(cells[1].innerText));
    });

    const xd = lb.map((l, i) => ({
        l: l,
        d: d[i]
    }));

    xd.sort((a, b) => a.l - b.l);

    const slb = xd.map(item => item.l);
    const sdt = xd.map(item => item.d);

    let chartStatus = Chart.getChart("c");
    if (chartStatus !== undefined) {
        chartStatus.destroy();
    }
    let delayed;
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: slb,
            datasets: [{
                label: 'Adatok',
                data: sdt,
                borderWidth: 2,
                backgroundColor: '#9f6f3f'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#000'
                    },
                    ticks: {
                        color: '#000'
                    }
                },
                x: {
                    grid: {
                        color: '#000'
                    },
                    ticks: {
                        color: '#000'
                    }
                }
            },
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#000'
                    }
                }
            }
        }
    });
}
