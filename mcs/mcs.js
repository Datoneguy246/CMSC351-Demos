/*
Recursive function takes in:
- lst: the complete list of elements
- l: the left index representing the start of the contiguous sub-list (inclusive)
- r: the right index representing the start of the contiguous sub-list (inclusive)
*/
function mcs(lst, l, r) {
    // Base case: Single element sub-list
    if (l == r) {
        return lst[l]; 
    }

    // Find center of sub-list, c
    let c = Math.floor((l + r) / 2);

    // Get max sum of sub-list to the left of c
    let lmax = mcs(lst, l, c);

    // Get max sum of sub-list to the right of c
    let rmax = mcs(lst, c+1, r);

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

/*
HTML FUNCTIONS FOR WEBPAGE
*/
function calc() {
    let lst_raw = document.getElementById("in_lst").value.split(',');
    let lst = [];
    for (let i = 0; i < lst_raw.length; i++) {
        lst.push(parseInt(lst_raw[i].trim()));
    }
    display(mcs(lst, 0, lst.length-1), lst);
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