// Save Physician Selection
document.getElementById("save-physician").addEventListener("click", () => {
    const physicianDropdown = document.getElementById("physician-dropdown");
    const selectedPhysician = physicianDropdown.value;

    if (!selectedPhysician) {
        alert("Please select a physician before saving.");
        return;
    }

    // Update the Physician info in the user details
    const physicianInfo = document.getElementById("physician-info");
    physicianInfo.textContent = `Physician: ${selectedPhysician}`;

    // clear the dropdown after saving
    physicianDropdown.value = "";

    alert(`Physician "${selectedPhysician}" has been saved successfully!`);
});

// Cancel Physician Selection
document.getElementById("cancel-physician").addEventListener("click", () => {
    document.getElementById("physician-dropdown").value = "";
    alert("Selection canceled.");
});
