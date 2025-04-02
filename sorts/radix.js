function radix_sort(lst) {
    // Find digit length
    let maxDigits = 0;
    for (let i = 0; i < lst.length; i++) {
        let iDigits = Math.floor(Math.log10(lst[i]));
        if (iDigits > maxDigits)
            maxDigits = iDigits;
    }

    // Sort each digit with counting sort (base algorithm must be stable)
    for (let i = -1; i >= -maxDigits-1; i--) {
        addToOutput(lst, maxDigits + i + 1, maxDigits);
        lst = reorderListByIndexes(lst, counting_sort_for_radix(getNthDigits(lst, i)));
    }
    addToOutput(lst, null, maxDigits);
}

// JS function that gets the nth digit list of a list (ex. getNthDigits([001, 234, 216, 250], 2) = [1, 4, 6, 0])
function getNthDigits(arr, n) {
    return arr.map(num => {
        const strNum = String(num);
        const index = n < 0 ? strNum.length + n : n;
        return index >= 0 && index < strNum.length ? parseInt(strNum[index], 10) : 0;
    });
}

// JS function that reorders an array given a seperate array of indicies 
function reorderListByIndexes(arr, indexes) {
    return indexes.map((_, i) => arr[indexes[i]]);
}

function counting_sort_for_radix(lst) {
    let k = lst[0];
    for (let i = 1; i < lst.length; i++) {
        if (lst[i] > k)
            k = lst[i];
    }
    let POS = new Array(k+1).fill(0); 
    for (let i = 0; i < lst.length; i++) {
        POS[lst[i]]++;
    }
    for (let i = 1; i < POS.length; i++) {
        POS[i] += POS[i-1];
    }
    let NEW = new Array(lst.length).fill(0);
    for (let i = lst.length-1; i >= 0; i--) {
        NEW[POS[lst[i]] - 1] = i; 
        POS[lst[i]]--;
    }
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
    console.log(radix_sort(lst));
}

function addToOutput(lst, dig, maxdig) {
    let tempHTML = "<span>";
    for (let i = 0; i < lst.length; i++) {
        let iStr = String(lst[i]).padStart(maxdig+1, "0");
        for (let j = 0; j <= maxdig; j++) {
            tempHTML += dig != null && j == dig ? "<span style='color: red'>" + iStr[j] + "</span>" : iStr[j];
        }
        tempHTML += " ";
    }
    tempHTML += "</span><br><br>";

    output.innerHTML += tempHTML;
}
