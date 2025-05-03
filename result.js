document.addEventListener("DOMContentLoaded", function () {
    const resultBox = document.getElementById("result-box");
    const loadingText = document.querySelector(".loading");

    // Retrieve stored risk message and level
    const riskMessage = sessionStorage.getItem("riskMessage");
    const riskLevel = sessionStorage.getItem("riskLevel");

    if (riskMessage && riskLevel) {
        loadingText.style.display = "none";
        resultBox.textContent = riskMessage;
        resultBox.classList.add(riskLevel);
        resultBox.style.display = "block";
    } else {
        resultBox.textContent = "No valid data found. Please upload a mammogram again.";
        resultBox.classList.add("moderate");
        resultBox.style.display = "block";
    }
});