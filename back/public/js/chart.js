const datas = fetch("/admin/dashboard/chart", {
    hearders: "application/json",
    method:"GET"
}).then(res=> res.json())
.then(res => res)


window.addEventListener("load", () => {
    datas.then(datas => {
        const ctx = document.getElementById("chartjs")
        const myChart = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: datas.product,
                label:'red',
                datasets: [{
                    data: datas.data,
                    backgroundColor: ["#cee5f2", "#accbe1", "#7c98b3", "#637081", "#536b78"]
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    easing: "easeOutBounce",
                    animateScale: true,
                    duration:2000
                },
                title: {
                    display: true,
                    text: 'Top des ventes',
                    position: "left",
                    fontColor: "rgb(44, 61, 78)",
                    fontSize: 33
                },
                legend: {
                    position: "bottom",
                    labels: {
                        fontSize: 18,
                        fontColor: "rgb(44, 61, 78)"
                    }
                },
                tooltips:{
                    xPadding:8,
                    yPadding:8,
                    bodyFontSize:16,
                    backgroundColor:"#ffffff",
                    bodyFontColor: "rgb(44, 61, 78)",
                    titleFontFamily:"Helvetica"
                }
            }
        })
    })
})