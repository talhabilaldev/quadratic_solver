$(document).ready(function () {
    var msg = document.querySelector('#msg_txt')
    $("#submit_form").on('click', function (e) {
        e.preventDefault();
        var a = $("#valueA").val()
        var b = $("#valueB").val()
        var c = $("#valueC").val()
        if (a != "" && b != "" && c != "") {
            $.ajax({
                url: "/quadratic_calculate?a=" + a + "&b=" + b + "&c=" + c,
                type: "GET",
                success: function (data) {
                    if(data.error){
                        msg.innerHTML = data.error
                    }
                    else if(data._id){
                        msg.innerHTML = "Quadratic equation has been solved. Answer is ("+data.Solution_1+","+data.Solution_2+")"
                    }
                    else{
                        msg.innerHTML = "Could not connect to database."
                    }
                    setTimeout(() => {
                        msg.innerHTML = ""
                    }, 5000);
                }
            });
        }
        else {
            alert("Input all values")
        }
    })
    $("#get_data").on('click', function (e) {
        $.ajax({
            url: "/quadratic_retrieve",
            type: "GET",
            success: function (data) {
                if(data.error){
                    msg.innerHTML = data.error
                }
                else if (data.length > 0) {
                    var rows = "";
                    var i = 1;
                    $.each(data, function () {
                        rows += "<tr><td>" + i + "</td><td>" + this.A + "</td><td>" + this.B + "</td><td>" + this.C + "</td><td>" + this.Solution_1 + "</td><td>" + this.Solution_2 + "</td></tr>";
                        i++;
                    });
                    $("#datalist tbody").empty();
                    $(rows).appendTo("#datalist tbody");
                }
                else{
                    msg.innerHTML = "There is no data in the database."
                }
                setTimeout(() => {
                    msg.innerHTML = ""
                }, 3000);
            }
        });
    })
})