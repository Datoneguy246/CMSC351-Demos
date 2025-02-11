function bubble_sort(lst) {
    // Iterate through list
    for (let i = 0; i < lst.length; i++) {
        // Do a sweep through the list, ignoring the sorted elements that have bubbled up to the top
        for (let j = 1; j < lst.length - i; j++) {
            // Get two elements at [j-1, j]
            let a = lst[j-1];
            let b = lst[j];

            // Compare a and b
            if (a > b) {
                // Swap
                lst[j-1] = b;
                lst[j] = a;
            }
        }

        // FOR DISPLAY PURPOSES ONLY
        addToOutput(lst, lst.length - i - 1);
    }

    // Return sorted list
    return lst;
}

/*
HTML FUNCTIONS FOR WEBPAGE
*/
const output = document.getElementById("out");
function calc() {
    output.innerHTML = "";
    let lst_raw = document.getElementById("in_lst").value.split(',');
    let lst = [];
    for (let i = 0; i < lst_raw.length; i++) {
        lst.push(parseInt(lst_raw[i].trim()));
    }
    addToOutput(lst, lst.length);
    console.log(bubble_sort(lst));
}

function addToOutput(lst, start) {
    let tempHTML = "<span style='color:red;'>";
    for (let i = 0; i < start; i++) {
        tempHTML += lst[i] + " ";
    }
    tempHTML += "</span><strong>|</strong><span class='green_txt'> ";
    for (let i = start; i < lst.length; i++) {
        tempHTML += lst[i] + " ";
    }
    tempHTML += "</span><br>";

    output.innerHTML += tempHTML;
}
