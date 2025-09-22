
import { sidebarHandler } from "./utils.js";
//--------------------------------------------Variables


let swiper = new Swiper(".statistics", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    loop: true,
});

const data = {
    labels: ['مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    datasets: [{
        label: 'درآمد',
        data: [100, 450, 300, 360, 400, 500],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        fill: false,
        tension: 0.4,
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            title: {
                display: false,

            },
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            }
        }
    },
};

new Chart(document.getElementById('myChart'), config);

const dataSales = {
    labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
    datasets: [{
        label: 'فروش',
        data: [12, 19, 15, 9, 14, 20, 10],
        backgroundColor: 'rgb(239 239 255)',
        hoverBackgroundColor: 'rgb(43, 127, 255)',
        borderRadius: 10,
        borderWidth: 0
    }]
};

const configSales = {
    type: 'bar',
    data: dataSales,
    options: {
        responsive: true,
        maintainAspectRatio: true,

        plugins: {
            legend: { display: false },
            title: {
                display: false,

            }
        },
        scales: {
            x: {
                display: true,
                grid: { display: false },
                ticks: {
                    color:'#374151',
                    font: { size: 12 }
                },


            },
            y: {
                display: false
            }
        }
    },
};

new Chart(document.getElementById('sales'), configSales);

const dataTicket = {
    labels: ['باز', 'تیکت جدید'],
    datasets: [{
        label: 'تیکت',
        data: [38, 140],
        backgroundColor: [
            'rgb(185 248 207)',
            'rgb(252 206 232)'
        ],
        hoverBackgroundColor: [
            'rgb(185 248 208)',
            'rgb(252 206 233)'
        ]
    }]
};

const configTicket = {
    type: 'pie',
    data: dataTicket,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        family: 'IRANYekanX',
                        size: 14
                    }
                },
            },
            title: {
                display: false,

            }
        }
    },
};

new Chart(document.getElementById('ticketChart'), configTicket);



//--------------------------------------------Functions
//--------------------------------------------Events

