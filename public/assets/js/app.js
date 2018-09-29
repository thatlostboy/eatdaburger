$(function () {
    $(".devourme").on("click", function (event) {
        event.preventDefault();
        id = $(this).data("id");

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
        }).then(
            function () {
                console.log("changed status to devoured");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    })

    $("#addburger").on("click", function (event) {
        event.preventDefault();
        newburger = $("#burgername").val().trim();

        console.log("added new burger: ", newburger);

        // Send the POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: { 'burger_name':newburger }
        }).then(
            function () {
                console.log("added new burger: ", newburger);
                // Reload the page to get the updated list
                location.reload();
            }
        );  
    })

    $("#apiburgerclear").on("click", function (event) {
        event.preventDefault();
        console.log("Hello?")

        // Send the POST request
        $.ajax("/api/burgers", {
            type: "DELETE",
        }).then(
            function () {
                location.reload();
            }
        );  
    })

    // #apiburgerlist:hover, #apiburgerclear:hover

});