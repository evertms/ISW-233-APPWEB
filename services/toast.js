const Toast = {
    showMessage(text, type) {
        const colors = {
            success: "#2ecc71",
            error: "#e74c3c",
            info: "#3498db",
            warning: "#f39c12"
        };

        const backgroundColor = colors[type] || colors.info;

        const existingMessageBox = document.getElementById("customMessageBox");
        if (existingMessageBox) {
            document.body.removeChild(existingMessageBox);
        }

        const messageBox = document.createElement("div");
        messageBox.id = "customMessageBox";
        messageBox.style.position = "fixed";
        messageBox.style.bottom = "20px";
        messageBox.style.left = "50%";
        messageBox.style.transform = "translateX(-50%)";
        messageBox.style.padding = "12px 24px";
        messageBox.style.backgroundColor = backgroundColor;
        messageBox.style.color = "white";
        messageBox.style.borderRadius = "8px";
        messageBox.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
        messageBox.style.zIndex = "1000";
        messageBox.style.fontSize = "1rem";
        messageBox.style.opacity = "0";
        messageBox.style.transition = "opacity 0.3s ease-in-out";
        messageBox.textContent = text;

        document.body.appendChild(messageBox);

        setTimeout(() => {
            messageBox.style.opacity = "1";
        }, 10);

        setTimeout(() => {
            messageBox.style.opacity = "0";
            setTimeout(() => {
            if (document.body.contains(messageBox)) {
                document.body.removeChild(messageBox);
            }
            }, 300);
        }, 2700);
    }
}

export default Toast;