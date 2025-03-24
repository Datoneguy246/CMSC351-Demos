function quicksort(lst) {
    // Call aux function with bounds of entire list
    quicksort_aux(lst, 0, lst.length-1);

    // Return sorted list
    return lst;
}

// Recursive aux function that keeps track of left/right indicies
function quicksort_aux(lst, l, r) {
    // Check if this list has at least two elements
    if (l < r) {
        // Partition the list
        let rpi = partition(lst, l, r);

        /* 
        We know:
        1. Everything to the left of rpi is less than or equal to lst[rpi]
        2. Everything to the right of rpi is more than lst[rpi]
        3. lst[rpi] is in it's sorted position

        Logically, it follows that we can acheive a fully sorted list by
        recursively partitioning the two sublists of [L, rpi-1] and [rpi+1, R]
        */

        quicksort_aux(lst, l, rpi-1);
        quicksort_aux(lst, rpi+1, r);
    }
}

function partition(lst, l, r) {
    // HTML DISPLAY
    outputMsg("Paritioning list from: " + l + " to " + r);

    // Select the last element of this sub-list as the partition key
    let pkey = lst[r];

    // Iterate through sub-list, keeping track of:
    // t: the leftmost element > pkey
    // i: the first subsequent element after lst[t] that is <= pkey
    let t = l;
    for (let i = l; i < r; i++) {
        if (lst[i] <= pkey) {
            // Swap lst[t] and lst[i]
            swap(lst, i, t);

            // Increment t
            t++;

            // HTML DISPLAY
            addToOutput(lst, l, r, pkey);
        }
    }

    // Swap final value of lst[t] with lst[r] (moving the pivot key into sorted position)
    swap(lst, t, r);

    // HTML DISPLAY
    addToOutput(lst, l, r, pkey);

    // Return the final value of the pivot key, in it's sorted position
    return t;
}

// Simple list swap function
function swap(list, a, b) {
    let temp = list[a];
    list[a] = list[b];
    list[b] = temp;
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
    console.log(quicksort(lst));
}

function outputMsg(msg) {
    let p = document.createElement('p');
    let txt = document.createTextNode(msg);
    p.appendChild(txt);
    output.appendChild(p);
}

function addToOutput(lst, l, r, pkey) {
    let tempHTML = "[";
    for (let i = 0; i < lst.length; i++) {
        let colour = i >= l && r <= r ? (lst[i] == pkey ? "green" : "red") : "black";
        tempHTML += "<span style='color: " + colour + "'>" + lst[i] + "</span>";
        if (i < lst.length-1)
            tempHTML += ", ";
    }
    tempHTML += "]<br>";
    output.innerHTML += tempHTML;
}