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

        if (newburger == "") {
            alert("You didn't even enter a name!!")
        } else {
            console.log("added new burger: ", newburger);

            // Send the POST request
            $.ajax("/api/burgers", {
                type: "POST",
                data: { 'burger_name': newburger }
            }).then(
                function () {
                    console.log("added new burger: ", newburger);
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        }
    })

    $("#apiburgerclear").on("click", function (event) {
        event.preventDefault();
        if (confirm("Are you sure you want to clear all the burgers?")) {
            // Send the POST request
            $.ajax("/api/burgers", {
                type: "DELETE",
            }).then(
                function () {
                    location.reload();
                }
            );
        }
    })


});