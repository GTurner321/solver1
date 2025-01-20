document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    const scoreElement = document.getElementById("score");
    const correctAnswers = {
        "symbol-1": "-",
        "number-1": "1",
        "symbol-2": "÷",
        "number-2": "2",
    };

    document.querySelectorAll(".draggable").forEach(draggable => {
        draggable.addEventListener("dragstart", event => {
            event.dataTransfer.setData("text", event.target.textContent);
        });
    });

    document.querySelectorAll(".drop-box").forEach(box => {
        box.addEventListener("dragover", event => {
            event.preventDefault();
        });

        box.addEventListener("drop", event => {
            event.preventDefault();
            const droppedValue = event.dataTransfer.getData("text");
            const pair = box.getAttribute("data-pair");

            const message = document.getElementById(`message-${pair.split("-")[1]}`);
            message.textContent = "";

            if (correctAnswers[pair] === droppedValue) {
                box.textContent = droppedValue;

                const allBoxes = document.querySelectorAll(`.drop-box[data-pair^='symbol-1'], .drop-box[data-pair^='number-1']`);
                const allFilled = [...allBoxes].every(b => b.textContent.trim() !== "");

                if (allFilled) {
                    score = 10;
                    scoreElement.textContent = `Score = ${score}`;
                    const finalMessage = document.getElementById("final-message");
                    finalMessage.textContent = "Well done! You have solved the equation.";
                    document.getElementById("next-equation-btn").style.display = "block";
                }
            } else {
                message.textContent = "Try again!";
                message.className = "message try-again";
            }
        });
    });

    const nextEquationBtn = document.getElementById("next-equation-btn");
    nextEquationBtn.addEventListener("click", () => {
        window.location.href = "equation2.html";
    });
});
