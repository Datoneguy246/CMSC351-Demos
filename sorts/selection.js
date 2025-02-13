function selection_sort(lst) {
    // Iterate through list
    for (let i = 0; i < lst.length-1; i++) {
        // Keep track of minimum element
        let minimum_index = -1;

        // We know the elements before i are sorted. Do a sweep starting from i
        for (let j = i; j < lst.length; j++) {
            // Check if this is the smallest element
            if (lst[j] < lst[minimum_index] || minimum_index == -1)
                minimum_index = j; // This is the smallest element
        }

        // Swap lst[minimum_index] with lst[i]
        let temp = lst[minimum_index];
        lst[minimum_index] = lst[i];
        lst[i] = temp;

        // HTML Display
        addToOutput(lst, i+1);
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
    addToOutput(lst, 0);
    console.log(selection_sort(lst));
}

function addToOutput(lst, start) {
    if (start+1 >= lst.length)
        start++;

    let tempHTML = "<span class='green_txt'>";
    for (let i = 0; i < start; i++) {
        tempHTML += lst[i] + " ";
    }
    tempHTML += "</span><strong>|</strong><span style='color:red;'> ";
    for (let i = start; i < lst.length; i++) {
        tempHTML += lst[i] + " ";
    }
    tempHTML += "</span><br>";

    output.innerHTML += tempHTML;
}
