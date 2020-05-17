var mahjang_chips = {};
(function (global) {
    function init() {
        $(".players").on("click", function () {
            $(".diff").text(0);
            for (var i = 1; i < 5; i++) {
                if ($(this).val() == i) {
                    $("#minus" + i).attr("disabled", true);
                    $("#plus" + i).attr("disabled", true);
                } else {
                    $("#minus" + i).attr("disabled", false);
                    $("#plus" + i).attr("disabled", false);
                }
            }
        });

        $(".minus").on("click", function () {
            var i = $("input[name='players']:checked").val();
            if (i == undefined) {
                return;
            }

            base_diff = $("#diff" + i);
            base_diff.text(parseInt(base_diff.text()) + 1);
            current_player = $(this).attr("id").replace("minus", "");
            current_diff = $("#diff" + current_player);
            current_diff.text(parseInt(current_diff.text()) - 1);
        });
        $(".plus").on("click", function () {
            var i = $("input[name='players']:checked").val();
            if (i == undefined) {
                return;
            }

            base_diff = $("#diff" + i);
            base_diff.text(parseInt(base_diff.text()) - 1);
            current_player = $(this).attr("id").replace("plus", "");
            current_diff = $("#diff" + current_player);
            current_diff.text(parseInt(current_diff.text()) + 1);
        });

        $("#regist").on("click", function () {
            data = {
                "id": $("#id").val(),
                "diff1": parseInt($("#diff1").text()),
                "diff2": parseInt($("#diff2").text()),
                "diff3": parseInt($("#diff3").text()),
                "diff4": parseInt($("#diff4").text())
            }

            $.ajax({
                type: 'POST',
                url: '/regist',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data)
            }).done(function (data, textStatus, jqXHR) {
                $(".diff").text(0);
                for (var i = 1; i < 5; i++) {
                    $("#chips"+i).text(data["chips"+i]);
                }
            }).fail(function (text) {
                alert('failed... Please Try agein!')
            });
        });
        $("#refresh").on("click", function () {
            data = {
                "id": $("#id").val()
            }

            $.ajax({
                type: 'POST',
                url: '/refresh',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data)
            }).done(function (data, textStatus, jqXHR) {
                $(".diff").text(0);
                for (var i = 1; i < 5; i++) {
                    $("#chips"+i).text(data["chips"+i]);
                }
            }).fail(function (text) {
                alert('failed... Please Try agein!')
            });
        });
        
        $("#plus_all").on("click", function () {
            var base = $("input[name='players']:checked").val();
            if (base == undefined) {
                return;
            }
            var chips_elm = $("#all_chips");
            if(chips_elm.val() == ""){
                return;
            }
            var chips = parseInt(chips_elm.val());
            for (var i = 1; i < 5; i++) {
                if(i != base){
                    base_diff = $("#diff" + base);
                    base_diff.text(parseInt(base_diff.text()) - chips);
                    current_diff = $("#diff" + i);
                    current_diff.text(parseInt(current_diff.text()) + chips);
                }
            }
            chips_elm.val("");
        });

        $("#minus_all").on("click", function () {
            var base = $("input[name='players']:checked").val();
            if (base == undefined) {
                return;
            }
            var chips_elm = $("#all_chips")
            if(chips_elm.val() == ""){
                return;
            }
            var chips = parseInt(chips_elm.val());

            for (var i = 1; i < 5; i++) {
                if(i != base){
                    base_diff = $("#diff" + base);
                    base_diff.text(parseInt(base_diff.text()) + chips);
                    current_diff = $("#diff" + i);
                    current_diff.text(parseInt(current_diff.text()) - chips);
                }
            }
            chips_elm.val("");
        });
    }
    mahjang_chips.plus = function (element) {
        alert(this.text);
    };

    mahjang_chips.minus = function (element) {
        alert(this.text);
    };

    init();
}(this));
