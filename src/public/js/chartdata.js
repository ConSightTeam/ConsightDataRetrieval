
    //--------------
    //- AREA CHART -
    //--------------

    var areaChartData = {
      labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label               : 'Digital Goods',
          backgroundColor     : 'rgba(60,141,188,0.9)',
          borderColor         : 'rgba(60,141,188,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : [28, 48, 40, 19, 86, 27, 90]
        },
        {
          label               : 'Electronics',
          backgroundColor     : 'rgba(210, 214, 222, 1)',
          borderColor         : 'rgba(210, 214, 222, 1)',
          pointRadius         : false,
          pointColor          : 'rgba(210, 214, 222, 1)',
          pointStrokeColor    : '#c1c7d1',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data                : [65, 59, 80, 81, 56, 55, 40]
        },
      ]
    }

    var areaChartOptions = {
      maintainAspectRatio : false,
      responsive : true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines : {
            display : false,
          }
        }],
        yAxes: [{
          gridLines : {
            display : false,
          }
        }]
      }
    }

    //-------------
    //- LINE CHART -
    //--------------

    var lineChartCanvas = document.getElementById('lineChart')
    console.log("chart_data : lineChartCanvas")
    console.log(lineChartCanvas)

    var line_ctx = lineChartCanvas.getContext('2d')
    var lineChartOptions = jQuery.extend(true, {}, areaChartOptions)
    var lineChartData = jQuery.extend(true, {}, areaChartData)
    for(i = 0; i < lineChartData.datasets.length; i++)
    {
      lineChartData.datasets[i].fill = false
    }

    lineChartOptions.datasetFill = false

    var lineChart = new Chart(line_ctx, { 
      type: 'line',
      data: lineChartData, 
      options: lineChartOptions
    })

    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas = document.getElementById('barChart')
    console.log("chart_data : barChartCanvas")
    console.log(barChartCanvas)

    var bar_ctx = barChartCanvas.getContext('2d')
    
    var barChart = new Chart(bar_ctx, {
      type: 'bar', 
      data: areaChartData,
      options: areaChartOptions
    })