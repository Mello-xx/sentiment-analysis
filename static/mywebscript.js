document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("emotionForm");
    const resultText = document.getElementById("resultText");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const userText = document.getElementById("text").value;

        fetch("/emotionDetector", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: userText }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.dominant_emotion === null) {
                    resultText.textContent = "Invalid text! Please try again!";
                } else {
                    resultText.textContent =
                        `For the given statement, the system response is ` +
                        `'anger': ${data.anger}, ` +
                        `'disgust': ${data.disgust}, ` +
                        `'fear': ${data.fear}, ` +
                        `'joy': ${data.joy}, ` +
                        `'sadness': ${data.sadness}. ` +
                        `The dominant emotion is ${data.dominant_emotion}.`;
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                resultText.textContent = "Something went wrong. Please try again.";
            });
    });
});
