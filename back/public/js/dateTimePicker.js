$(document).ready(() => {
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
  $(function() {
    $("#datetimepicker1").datetimepicker({
      format: "LT",
      allowInputToggle: true
    });
    $("#datetimepicker2").datetimepicker({
      format: "LT",
      allowInputToggle: true
    });
    $("#datetimepicker3").datetimepicker({
      format: "LT",
      allowInputToggle: true
    });
    $("#datetimepicker4").datetimepicker({
      format: "LT",
      allowInputToggle: true
    });
    $("#datetimepicker5").datetimepicker({
      format: "LL",
      allowInputToggle: true
    });
    $("#datetimepicker6").datetimepicker({
      format: "LL",
      allowInputToggle: true
    });
    $("#datetimepicker8").datetimepicker({
      format: "LL",
      allowInputToggle: true
    });
    $("#datetimepicker9").datetimepicker({
      format: "LL",
      allowInputToggle: true
    });
  });
});
