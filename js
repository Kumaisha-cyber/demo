// Welcome message

window.addEventListener("load", function () {

    console.log(
        "Welcome to S. Kumaisha's Digital Resume!"
    );

});


// Say Hello button

function showMessage() {

    alert(
        "Hello! Welcome to S. Kumaisha's Digital Resume."
    );

}


// Print / Download Resume

function printResume() {

    window.print();

}


// Automatically display current year

const year = document.getElementById("year");

if (year) {

    year.textContent = new Date().getFullYear();

}


// Smooth navigation

const navigationLinks =
    document.querySelectorAll("nav a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});