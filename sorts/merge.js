function merge_sort(lst, start, end) {
    if (start < end) {
        // Find the middle of the list to split (floor if list not even)
        let C = Math.floor((start + end) / 2);

        addToBreakdown(lst, start, C, C+1, end); // HTML DISPLAY 
        // Recursively call merge_sort on each sublist
        merge_sort(lst, start, C);
        merge_sort(lst, C + 1, end);

        // Merge
        merge(lst, start, C, C + 1, end);
        addToMerge(lst, start, end); // HTML DISPLAY
    }
}

function merge(lst, start1, end1, start2, end2) {
    // Create temp array for sorting of the same size as lst
    let temp = []; // By default, JS arrays don't have a fixed length. Assume this is of size n

    // Iterate through all lists (i for sublist1, j for sublist2, k for temp)
    let i = start1; let j = start2; let k = 0;
    while (i <= end1 && j <= end2) {
        // Compare sublist value (recall: i is used when values are equal)
        if (lst[i] <= lst[j]) {
            temp[k++] = lst[i];
            i++;
        } else {
            temp[k++] = lst[j];
            j++;
        }
    }

    // In the case the two sublists are not of equal length, we need to copy over the remaining elements to temp
    for (let ri = i; ri <= end1; ri++)
        temp[k++] = lst[ri];
    for (let rj = j; rj <= end2; rj++)
        temp[k++] = lst[rj];

    // Overwrite the values of lst with temp
    for (let n = 0; n < temp.length; n++) {
        lst[start1 + n] = temp[n];
    }
}

/*
HTML FUNCTIONS FOR WEBPAGE
*/
const output = document.getElementById("out");
const seperator = "<span style='color: white;'>...........</span>";
let breakdown = {};
let merged = {};
function calc() {
    breakdown = {};
    merged = {};
    console.log("Performing Merge Sort...")
    output.innerHTML = "<strong>1) Break down list:</strong><br>";
    let lst_raw = document.getElementById("in_lst").value.split(',');
    let lst = [];
    for (let i = 0; i < lst_raw.length; i++) {
        lst.push(parseInt(lst_raw[i].trim()));
    }
    merge_sort(lst, 0, lst.length - 1)
    
    let breakdownHtml = "<div style='text-align: center;'>";
    for (let i = 0; i < Math.floor(Math.log2(lst.length)); i++) {
        if (breakdown[i] == undefined)
            continue;

        breakdownHtml += breakdown[i].replaceAll("^^",seperator);
        breakdownHtml += "<br><br>";
    }
    for (let i = 0; i < lst_raw.length; i++) {
        breakdownHtml += lst_raw[i] + seperator;
    }
    breakdownHtml += "</div>";
    output.innerHTML += breakdownHtml;

    output.innerHTML += "<strong>2) Merge list:</strong><br>";
    let mergedHtml = "<div style='text-align: center;'>";
    for (let i = Math.floor(Math.log2(lst.length))-1; i >= 0; i--) {
        if (merged[i] == undefined)
            continue;

        if (i == 0) mergedHtml += "<strong>";
        mergedHtml += merged[i].replaceAll("^^",seperator);
        if (i == 0) mergedHtml += "</strong>";
        mergedHtml += "<br><br>";
    }
    mergedHtml += "</div>";
    output.innerHTML += mergedHtml;
}

function addToBreakdown(lst, start1, end1, start2, end2) {
    let tempHTML = "";
    for (let i = start1; i <= end1; i++) {
        tempHTML += lst[i]; if (i != end1) {tempHTML += ", "; }
    }
    tempHTML += "  |  ";
    for (let i = start2; i <= end2; i++) {
        tempHTML += lst[i]; if (i != end2) { tempHTML += ", "; }
    }
    tempHTML += "^^";

    // Figure out what depth level this is
    let depth = Math.ceil(Math.log2(lst.length/(end2-start1+1)));
    if (breakdown[depth] == undefined)
        breakdown[depth] = "";
    breakdown[depth] += tempHTML;
}

function addToMerge(lst, start, end) {
    let tempHTML = "";
    for (let i = start; i <= end; i++) {
        tempHTML += lst[i]; if (i != end) {tempHTML += ", "; }
    }
    tempHTML += "^^";

    // Figure out what depth level this is
    let depth = Math.ceil(Math.log2(lst.length/(end-start+1)));
    if (merged[depth] == undefined)
        merged[depth] = "";
    merged[depth] += tempHTML;
}