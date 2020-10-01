    // Destroy the popup
    export function wait(ms = 0) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    export async function destroyPopup(popup) {
        popup.classList.remove("open");
        await wait(1000); // Wait for 1 sec
        popup.remove(); // remove it from the DOM
        popup = null; // remove it from the javascript memory
    }