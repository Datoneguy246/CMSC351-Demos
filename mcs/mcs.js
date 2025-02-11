/*
Recursive function takes in:
- lst: the complete list of elements
- l: the left index representing the start of the contiguous sub-list (inclusive)
- r: the right index representing the start of the contiguous sub-list (inclusive)
*/
function mcs_divide_and_conquer(lst, l, r) {
    // Base case: Single element sub-list
    if (l == r) {
        return lst[l]; 
    }

    // Find center of sub-list, c
    let c = Math.floor((l + r) / 2);

    // Get max sum of sub-list to the left of c
    let lmax = mcs_divide_and_conquer(lst, l, c);

    // Get max sum of sub-list to the right of c
    let rmax = mcs_divide_and_conquer(lst, c+1, r);

    // Get straddling max sum of a sublist anchored to c
    let lhmax = -Infinity; let lhsum = 0;
    let rhmax = -Infinity; let rhsum = 0;
    for (let i = c; i >= l; i--) { // Calculate left hand side of straddling max by going from C down to L
        lhsum += lst[i];
        if (lhsum > lhmax) 
            lhmax = lhsum;
    }
    for (let i = c+1; i <= r; i++) { // Calculate right hand side of straddling max by going from C+1 up to R
        rhsum += lst[i];
        if (rhsum > rhmax) 
            rhmax = rhsum;
    }
    let cmax = lhmax + rhmax;

    // Return the maximum of these three sums
    let max_sum = Math.max(lmax, rmax, cmax);
    return max_sum;
}

function mcs_kadane(lst) {
    // Keep track of last M_i value
    let last_mi = -Infinity;

    // Keep track of overall maximum value
    let max_overall = -Infinity;

    // Iterate through list
    for (let i = 0; i < lst.length; i++) {
        // Calculate this M_i value: max of (last_mi + lst[i], lst[i])
        let lstI = lst[i];
        let mi = Math.max(last_mi + lstI, lstI);

        // Check if this is the new maximum overall value
        if (mi > max_overall)
            max_overall = mi;

        // Set last_mi
        last_mi = mi;

        // Display on table (HTML Display)
        addToTable(lstI, mi, max_overall, mi == lstI);
    }

    // Return maximum sum
    return max_overall;
}

/*
HTML FUNCTIONS FOR WEBPAGE
*/
function calc() {
    kadaneTable.innerHTML = "";
    let lst_raw = document.getElementById("in_lst").value.split(',');
    let lst = [];
    for (let i = 0; i < lst_raw.length; i++) {
        lst.push(parseInt(lst_raw[i].trim()));
    }
    display(mcs_divide_and_conquer(lst, 0, lst.length-1), lst);
    console.log("Kadane: " + mcs_kadane(lst));
    let possible_ends = document.querySelectorAll(".possible_end");
    possible_ends[possible_ends.length-1].style.backgroundColor = "green";
}

function findBoundsForSum(sum, lst) {
    for (let i = 0; i < lst.length; i++) {
        for (let j = i; j < lst.length; j++) {
            let lsum = 0;
            for (let k = i; k <= j; k++) {
                lsum += lst[k];
            }
            if (lsum == sum) {
                return [i, j];
            }
        }
    }
    return null;
}

function display(sum, lst) {
    let bounds = findBoundsForSum(sum, lst);
    let l = bounds[0]; let r = bounds[1];
    console.log(l + ", " + r);
    let output = document.getElementById("mcs");

    let list_string = "Maximum Contiguous Sum: <br>[";
    for (let i = 0; i < lst.length; i++) {
        if (i == l) { list_string += "<span class='green_txt'>"; }
        list_string += lst[i]; if (i < lst.length-1) { list_string += ", "; }
        if (i == r) { list_string += "</span>"; }
    }
    list_string += "]<br><strong>" + sum + "</strong>";
    output.innerHTML = list_string;
}

const kadaneTable = document.getElementById("t");
function addToTable(element, mi, overall, new_sub_list) {
    let row = document.createElement("tr");
    let element_td = document.createElement("td");
    element_td.appendChild(document.createTextNode(element));
    let mi_td = document.createElement("td");
    mi_td.appendChild(document.createTextNode(mi));
    let overall_td = document.createElement("td");
    overall_td.appendChild(document.createTextNode(overall));
    row.appendChild(element_td);
    row.appendChild(mi_td);
    row.appendChild(overall_td);

    if (new_sub_list)
        row.style.backgroundColor = "pink";

    if (mi == overall)
        row.className = "possible_end";

    kadaneTable.appendChild(row);
}