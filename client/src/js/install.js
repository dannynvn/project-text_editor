const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // store the event for later use
    window.deferredPrompt = event;

    // make the install button visible
    butInstall.classList.toggle('hidden', false);
});

// click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    console.log('working');
    const promptEvent = window.deferredPrompt;
    console.log(promptEvent);
    if (!promptEvent) {
        // The deferred prompt isn't available. 
        return;
    }

    // Show the install prompt.
    promptEvent.prompt();
    console.log('promptEvent', promptEvent);

    // reset the deferred prompt variable, since it can't be used again
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clear the deferredPrompt
    window.deferredPrompt = null;
});
