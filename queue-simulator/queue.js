
class Queue {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    // Add an element to the rear of the queue
    enqueue(element) {
        this.items.push(element);
        this.count = this.items.length;

        console.log(`${element} added to rear`);
        return element;
    }

    // Remove the front element of the queue
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }

        let deleteItem = this.items.shift();
        this.count = this.items.length;

        console.log(`${deleteItem} removed from front`);
        return deleteItem;
    }

    // View the front element without removing it
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }

        console.log(`Front element is ${this.items[0]}`);
        return this.items[0];
    }

    // Check whether the queue is empty
    isEmpty() {
        return this.count === 0;
    }

    // Return the number of elements
    size() {
        return this.count;
    }

    // Print queue elements from front to rear
    print() {
        return this.items.join(" ");
    }

    // Clear all queue elements
    clear() {
        this.items = [];
        this.count = 0;

        console.log("Queue cleared.");
        return this.items;
    }
}

// Create a Queue object
const queue = new Queue();

$(document).ready(function () {

    // Display queue elements from FRONT to REAR
    function displayQueue() {
        $("#queue").empty();

        for (let i = 0; i < queue.count; i++) {
            let element = queue.items[i];

            let block = $("<div>")
                .addClass(
                    "row bg-primary enqueue-block text-white text-center p-2 border border-light"
                )
                .text(element);

            // Mark the first element as FRONT
            if (i === 0) {
                block.prepend("FRONT: ");
            }

            // Mark the last element as REAR
            if (i === queue.count - 1) {
                block.append(" :REAR");
            }

            $("#queue").append(block);
        }
    }

    // Display status and error messages
    function showMessage(message) {
        $("#message").text(message);
    }

    // ENQUEUE - Add an element to the rear
    $("#btn_Enqueue").on("click", function () {
        let enqueue_data = $("#st_data").val().trim();

        // Prevent blank input
        if (enqueue_data === "") {
            showMessage("Please enter a value.");
            return;
        }

        queue.enqueue(enqueue_data);

        displayQueue();

        $("#st_data").val("");
        showMessage(`${enqueue_data} added to rear.`);
    });

    // DEQUEUE - Remove the front element
    $("#btn_Dequeue").on("click", function () {

        // Prevent dequeue when empty
        if (queue.isEmpty()) {
            showMessage("Queue is empty! Cannot Dequeue.");
            return;
        }

        let dequeue_data = queue.dequeue();

        let deletedBlock = $("<div>")
            .addClass(
                "row dequeue-block text-bg-danger border border-light"
            )
            .text(dequeue_data);

        // Show the removed element in the deleted area
        $("#shifted").prepend(deletedBlock);

        displayQueue();

        showMessage(`${dequeue_data} removed from front.`);
    });

    // PEEK - Highlight the front element
    $("#btn_peek").on("click", function () {

        // Prevent peek when empty
        if (queue.isEmpty()) {
            showMessage("Queue is empty! Cannot Peek.");
            return;
        }

        let peek_data = queue.peek();

        // Select the first displayed element
        let frontBlock = $("#queue").children().first();

        // Change front element to gold
        frontBlock.removeClass("bg-primary text-white")
                  .addClass("peek");

        // Restore original color after 500 milliseconds
        setTimeout(function () {
            frontBlock.removeClass("peek")
                      .addClass("bg-primary text-white");
        }, 500);

        showMessage(`Front element is ${peek_data}.`);
    });

    // CLEAR - Reset the queue and deleted display
    $("#btn_clear").on("click", function () {

        queue.clear();

        $("#queue").empty();
        $("#shifted").empty();

        showMessage("Queue cleared.");
    });

});
