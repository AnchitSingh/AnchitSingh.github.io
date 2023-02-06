$("#expand-button").click(function () {
    $("#square").css("width", "12rem");
    $("#square").css("height", "12rem");
    $('#close-button-fontsearch').click()
});
$('#close-button').click(function () {
    $("#square").css("width", "0rem");
    $("#square").css("height", "0rem");
});
$("#expand-button-fontsearch").click(function () {
    $("#square-search").css("width", "15rem");
    $("#square-search").css("height", "18rem");
    $('#close-button').click()
});
$('#close-button-fontsearch').click(function () {
    $("#square-search").css("width", "0rem");
    $("#square-search").css("height", "0rem");
});
