document.addEventListener('DOMContentLoaded', (event) => {
    let startTime;
    let activeTopic;

    function startTracking(topic) {
        startTime = new Date().getTime();
        activeTopic = topic;
    }

    function stopTracking() {
        const endTime = new Date().getTime();
        const timeSpent = Math.round((endTime - startTime) / 1000); // Time spent in seconds
        if (activeTopic) {
            updateProgress(activeTopic, timeSpent);
            activeTopic = null;
        }
    }

    function updateProgress(topic, timeSpent) {
        // Update the progress bar
        const progressBar = document.querySelector(`.card[data-topic="${topic}"] .progress-bar`);
        if (progressBar) {
            let currentProgress = parseInt(progressBar.getAttribute('data-progress')) || 0;
            let newProgress = Math.min(currentProgress + timeSpent, 100); // Assuming 100 as max progress
            progressBar.setAttribute('data-progress', newProgress);
            progressBar.querySelector('div').style.width = newProgress + '%';

            // Send updated progress to backend
            fetch('/update-progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic, progress: newProgress })
            });
        }
    }

    // Attach event listeners to start tracking on card hover and stop tracking when mouse leaves
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const topic = card.getAttribute('data-topic');
            startTracking(topic);
        });

        card.addEventListener('mouseleave', () => {
            stopTracking();
        });
    });
});
