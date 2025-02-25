function binary_search(lst, target) {
    // Set L,R bounds for the current sublist we're searching in
    let L = 0;
    let R = lst.length-1;

    // Loop until L > R (no longer a valid sublist)
    while (L <= R) {
        // Calculate center of sublist
        let C = Math.floor((L+R)/2);

        // DISPLAY ONLY
        display(lst, L, R, C);

        // Check where the target is in relation to the center
        if (lst[C] == target) {
            // Found target at C!
            return C;
        }
        else if (lst[C] < target) {
            // Target is to the right of C in the list
            L = C+1;
        }
        else if (lst[C] > target) {
            // Target is to the left of C in the list
            R = C-1;
        }
    }

    // We've searched the whole list and the target wasn't found. It must not be in the list
    return -1;
}

/*
HTML FUNCTIONS FOR WEBPAGE
*/
const output = document.getElementById("out");
const idx = document.getElementById("idx");
function calc() {
    output.innerHTML = "";
    let lst_raw = document.getElementById("in_lst").value.split(',');
    let lst = [];
    for (let i = 0; i < lst_raw.length; i++) {
        lst.push(parseInt(lst_raw[i].trim()));
    }
    let target = parseInt(document.getElementById("in_targ").value);
    let result = binary_search(lst, target);
    if (result >= 0) {
        idx.innerHTML = "Found target at index: " + result;
    } else {
        output.innerHTML = "";
        idx.innerHTML = "Could not find target in list...";
    }
}

function display(lst, l, r, c) {
    let tempHTMl = "";
    for (let i = 0; i < lst.length; i++) {
        if (i == l)
            tempHTMl += "<span style='color: purple;'><strong>[ </span>";
        if (i == c)
            tempHTMl += "<span style='color: red;'>(";
        tempHTMl += lst[i];
        if (i == c)
            tempHTMl += ")</span>";
        tempHTMl += " ";

        if (i == r)
            tempHTMl += "<span style='color: purple;'>]</strong> </span>";
    }
    tempHTMl += "<br><br>";
    output.innerHTML += tempHTMl;
}