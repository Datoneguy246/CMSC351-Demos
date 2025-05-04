const mat_div = document.getElementById("mat");
const graph_div = document.getElementById("graph");
const vertex_count = document.getElementById("mat_n");

function createInput(row) {
    let newInput = document.createElement("input");
    newInput.type = "text";
    newInput.value = "0";
    newInput.className = "mat_in";
    row.appendChild(newInput);
}

function onMatLengthChanged(n) {
    // Validate n
    if (n < 0) {
        vertex_count.value = 0;
        return;
    }

    // Remove old divs if necessary
    let childDivs = mat_div.querySelectorAll(":scope > div");
    let currentN = childDivs.length;
    while (currentN > n) {
        mat_div.removeChild(childDivs[currentN-1]);

        // remove other columns
        childDivs.forEach(row => {
            const inputs = row.querySelectorAll("input");
            const lastInput = inputs[inputs.length - 1];
            if (lastInput) {
                row.removeChild(lastInput);
            }
        });
        currentN--;
    }

    // Add new divs if necessary
    while (currentN < n) {
        let newRow = document.createElement("div");
        for (let i = 0; i < n; i++) {
            createInput(newRow);
        }
        mat_div.appendChild(newRow);

        childDivs.forEach(row => {
            createInput(row);
        });
        currentN++;
    }
}

function parseMatrix() {
    let matrix = [];

    let rows = mat_div.querySelectorAll(":scope > div");
    rows.forEach(r => {
        let row = [];
        const cols = r.querySelectorAll("input");
        cols.forEach(col => {
            row.push(col.value);
        });
        matrix.push(row);
    });
    return matrix;
}

function parseMatrixAsIntegers() {
    let matrix = parseMatrix();
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
            matrix[r][c] = parseInt(matrix[r][c]);
        }
    }
    return matrix;
}

// Set up input listener
window.onload = function() {
    vertex_count.addEventListener("input", function(event) {
        onMatLengthChanged(event.target.value);
    });
}