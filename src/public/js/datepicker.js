  // Datepicker
  var currentDate = moment();
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('date')){
      currentDate = urlParams.get('date'); // Get date from URL instead of current time
  }
  $(function () {
    // Hour
    if (window.location.href.indexOf("hour") > -1) {
        $('#StatisticDateTimePicker').datetimepicker({
          viewMode: 'days',
          format: 'DD/MM/YYYY',
          defaultDate: currentDate
        });
        $('#StatisticDateTimePicker').on("hide.datetimepicker", function (e) {
          var userSelectedDate = moment(e.date).format("YYYY-MM-DD");
          window.location.href = "?date=" + userSelectedDate;
        });
    // Month
    } else if (window.location.href.indexOf("month") > -1) {
        $('#StatisticDateTimePicker').datetimepicker({
            viewMode: 'years',
            format: 'YYYY',
            defaultDate: currentDate
        });
        $('#StatisticDateTimePicker').on("hide.datetimepicker", function (e) {
          var userSelectedDate = moment(e.date).format("YYYY");
          window.location.href = "?date=" + userSelectedDate;
        });
    // Day
    } else {
      $('#StatisticDateTimePicker').datetimepicker({
          viewMode: 'months',
          format: 'MM/YYYY',
          defaultDate: currentDate
      });
      $('#StatisticDateTimePicker').on("hide.datetimepicker", function (e) {
        var userSelectedDate = moment(e.date).format("YYYY-MM");
        window.location.href = "?date=" + userSelectedDate;
      });
    }
  });