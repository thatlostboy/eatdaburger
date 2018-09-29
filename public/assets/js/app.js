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

    $("#addburger").on("submit", function (event) {
        event.preventDefault();
        newburger = $("#burgername").val().trim();

        console.log(newburger)
    })

});