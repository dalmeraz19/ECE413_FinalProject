document.addEventListener("DOMContentLoaded", () => {
    const addDeviceForm = document.getElementById("addDeviceForm");
    const deviceItems = document.getElementById("deviceItems");
  
    // Add a device
    addDeviceForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const deviceName = document.getElementById("deviceName").value.trim();
      const deviceId = document.getElementById("deviceId").value.trim();
      const description = document.getElementById("description").value.trim();
  
      if (!deviceName || !deviceId) {
        alert("Device Name and Device ID are required!");
        return;
      }
  
      // Create a new device item
      const deviceItem = document.createElement("li");
      deviceItem.classList.add("device-item");
  
      const deviceDetails = `
        <div>
          <strong>${deviceName}</strong> (ID: ${deviceId}) 
          ${description ? `<p>${description}</p>` : ""}
        </div>
      `;
  
      // Create the remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
  
      // Attach remove functionality
      removeButton.addEventListener("click", () => {
        deviceItems.removeChild(deviceItem);
      });
  
      // Append details and button to the device item
      deviceItem.innerHTML = deviceDetails;
      deviceItem.appendChild(removeButton);
  
      // Append the new device item to the list
      deviceItems.appendChild(deviceItem);
  
      // Reset form
      addDeviceForm.reset();
    });
  });
  