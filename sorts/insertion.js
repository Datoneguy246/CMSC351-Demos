function insertion_sort(lst) {
    // Iterate through list (starting at 1 instead of 0)
    for (let i = 1; i < lst.length; i++) {
        let map = "<br><span style='color: red'><i>";  // FOR DISPLAY PURPOSES ONLY
        let key = lst[i]; 
        
        // Go backwards and shift to the right
        let j = i-1;
        while (j >= 0 && key < lst[j]) {
            map += lst[j] + " is shifted to the right (i: " + j + "->" + (j+1) + ")<br>"; // FOR DISPLAY PURPOSES ONLY
            lst[j+1] = lst[j];
            j--;
        }
        lst[j+1] = key;

        // FOR DISPLAY PURPOSES ONLY
        addToOutput(lst, j+1, map + "</i></span>");
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
    addToOutput(lst, 0, "Initial List: ");
    console.log(insertion_sort(lst));
}

function addToOutput(lst, key, map) {
    let tempHTML = map;
    for (let i = 0; i < lst.length; i++) {
        if (i == key) {
            tempHTML += "<span style='color: green;'>";
        }
        tempHTML += lst[i] + " ";
        if (i == key) {
            tempHTML += "</span>";
        }
    }
    tempHTML += "<br>";
    output.innerHTML += tempHTML;
}