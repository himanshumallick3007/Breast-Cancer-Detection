document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("detection-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const diagnosticMammographInput = document.getElementById("diagnostic-mammograph");
        const mriInput = document.getElementById("mri");
        const biopsyInput = document.getElementById("biopsy");
        const ctScanInput = document.getElementById("ct-scan");
        const hormoneTestInput = document.getElementById("hormone-test"); // optional

        // Validation for required reports
        if (!diagnosticMammographInput.files[0]) {
            alert("Please upload your Diagnostic Mammograph report.");
            return;
        }
        if (!mriInput.files[0]) {
            alert("Please upload your MRI report.");
            return;
        }
        if (!biopsyInput.files[0]) {
            alert("Please upload your Breast Biopsy report.");
            return;
        }
        if (!ctScanInput.files[0]) {
            alert("Please upload your CT Scan report.");
            return;
        }

        // Extract digit from file names
        const mammographFile = diagnosticMammographInput.files[0].name.toLowerCase();
        const mriFile = mriInput.files[0].name.toLowerCase();
        const ctScanFile = ctScanInput.files[0].name.toLowerCase();

        function detectDigit(fileName) {
            if (fileName.includes("1")) return "1";
            if (fileName.includes("2")) return "2";
            if (fileName.includes("3")) return "3";
            return "unknown";
        }

        const mammographDigit = detectDigit(mammographFile);
        const mriDigit = detectDigit(mriFile);
        const ctScanDigit = detectDigit(ctScanFile);

        let resultMessage = "Data inconsistent — please review your uploads.";
        let riskLevel = "unknown";

        // Check if all three reports match
        if (mammographDigit === mriDigit && mriDigit === ctScanDigit) {
            switch (mammographDigit) {
                case "1":
                    resultMessage = "Low Risk: No immediate concern, but follow regular screenings.";
                    riskLevel = "low";
                    break;
                case "2":
                    resultMessage = "Moderate Risk: Please contact your doctor and schedule a follow-up screening within 2 weeks.";
                    riskLevel = "moderate";
                    break;
                case "3":
                    resultMessage = "High Risk: Multiple cysts detected — immediately connect to your doctor.";
                    riskLevel = "high";
                    break;
                default:
                    resultMessage = "Unable to determine risk — ensure correct file naming.";
                    riskLevel = "unknown";
            }
        }

        // Store the result in sessionStorage for the results page
        sessionStorage.setItem("riskMessage", resultMessage);
        sessionStorage.setItem("riskLevel", riskLevel);

        // Redirect to results page
        window.location.href = "results.html";
    });
});
