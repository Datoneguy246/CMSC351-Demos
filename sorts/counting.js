function counting_sort(lst) {
    // Find max value, k
    let k = lst[0];
    for (let i = 1; i < lst.length; i++) {
        if (lst[i] > k)
            k = lst[i];
    }

    // Given k, create the POS array
    let POS = new Array(k+1).fill(0); // .fill() populates the entire array with zero

    // First, populate the POS array with the non-cummalative counts for each value
    for (let i = 0; i < lst.length; i++) {
        POS[lst[i]]++;
    }

    // Next, make the POS array cummalative
    for (let i = 1; i < POS.length; i++) {
        POS[i] += POS[i-1];
    }

    // Create the NEW array, which we will return
    let NEW = new Array(lst.length).fill(0);

    // Iterate from the end of the original list to 0 (this keeps the algorithm stable)
    for (let i = lst.length-1; i >= 0; i--) {
        // Populate the NEW array
        NEW[POS[lst[i]] - 1] = lst[i];
        POS[lst[i]]--;
    }

    // Return NEW
    return NEW;
}

/*
HTML FUNCTIONS FOR WEBPAGE
*/
const output = document.getElementById("out");
function calc() {
    output.innerHTML = "";
    count = 0;
    let lst_raw = document.getElementById("in_lst").value.split(',');
    let lst = [];
    for (let i = 0; i < lst_raw.length; i++) {
        lst.push(parseInt(lst_raw[i].trim()));
    }
    console.log(counting_sort_w_display(lst));
}

function outputMsg(msg) {
    let p = document.createElement('p');
    let txt = document.createTextNode(msg);
    p.appendChild(txt);
    output.appendChild(p);
}

function outputTable(data) {
    let tableHTML = "<table><tbody><tr>";
    for (let i = 0; i < data.length; i++) {
        tableHTML += "<th>" + i + "</th>";
    }
    tableHTML += "</tr><tr>";
    for (let i = 0; i < data.length; i++) {
        tableHTML += "<td>" + data[i] + "</td>";
    }
    tableHTML += "</tr></tbody></table>";
    output.innerHTML += tableHTML;
}

function counting_sort_w_display(lst) {
    // Find max value, k
    let k = lst[0];
    for (let i = 1; i < lst.length; i++) {
        if (lst[i] > k)
            k = lst[i];
    }

    outputMsg("Max value in list is: " + k);

    // Given k, create the POS array
    let POS = new Array(k+1).fill(0); // .fill() populates the entire array with zero

    // First, populate the POS array with the non-cummalative counts for each value
    for (let i = 0; i < lst.length; i++) {
        POS[lst[i]]++;
    }

    outputMsg("Non-cummalative POS array: ");
    outputTable(POS);

    // Next, make the POS array cummalative
    for (let i = 1; i < POS.length; i++) {
        POS[i] += POS[i-1];
    }

    outputMsg("Cummalative POS array: ");
    outputTable(POS);

    // Create the NEW array, which we will return
    let NEW = new Array(lst.length).fill(0);

    // Iterate from the end of the original list to 0 (this keeps the algorithm stable)
    outputMsg("Popualting new array: ");
    for (let i = lst.length-1; i >= 0; i--) {
        // Populate the NEW array
        NEW[POS[lst[i]] - 1] = lst[i];
        POS[lst[i]]--;


        outputMsg("POS[" + lst[i] + "] = " + (POS[lst[i]]+1) + " so...   NEW[" + (POS[lst[i]]+1) + " - 1] = " + lst[i]);
        outputTable(NEW);
    }

    // Return NEW
    return NEW;
}