function heapsort(list) {
    // Convert list to max heap
    convertToMaxHeap(list);

    // HTML DISPLAY ONLY
    addToOutput(list, list, "Convert To Max Heap");

    // Traverse list backwards (from n -> 1 inclusive)
    for (let i = list.length-1; i > 0; i--) {
        // Swap elements i and 0
        swap(list, 0, i);

        // HTML DISPLAY ONLY
        addToOutput(list, list.slice(0, i), "Swap and Chop");

        // Call maxheapify, ignoring the elements that have been chopped off [i, n]
        list = maxheapify(list.slice(0, i), 0).concat(list.slice(i, list.length));
        /**
         * Sorry for the weird JS array stuff here...
         * list.slice(i,j) returns a new sublist containing the elements between indicies i (inclusive) and j (exclusive)
         * .concat() appends two arrays together
         * 
         * Essentially, since I've made a seperate list to be passed into maxheapify(), maxheapify() needs to return
         * a new list instead of directly altering the original list. Then I need to concat the "chopped" off elements
         * to the returned list so those don't get lost and stay in the final list.
         * 
         * There's probably a better way to do this but this works fine...
         */

        // HTML DISPLAY ONLY
        addToOutput(list, list.slice(0, i), "Max-Heapify");
    }

    return list;
}

// Takes in a CBT represented as a list and float the root down until the tree is a max heap
// Returns a new list
function maxheapify(list, root) {
    let parent = list[root];

    // Get children of parent
    let leftChild = 2 * root + 1;
    let rightChild = 2 * root + 2;

    // Get max child
    let maxChild;
    if (leftChild >= list.length) {
        maxChild = root; // Parent is leaf. There are no children.
    } 
    else if (rightChild >= list.length) {
        maxChild = leftChild; // There is no right child. Left must be larger by default
    }
    else {
        // Get max of two
        maxChild = list[leftChild] > list[rightChild] ? leftChild : rightChild;
    }

    // Check if the parent is larger than it's largest child
    if (list[maxChild] > parent) {
        // Swap the child with the parent
        swap(list, maxChild, root);

        // Continue maxheapify on swapped node
        return maxheapify(list, maxChild);
    }

    // Parent is larger. Maxheapified
    return list;
}

function convertToMaxHeap(list) {
    // Calls maxheapify on every non-leaf nodes (from the bottom up)
    let nonLeafs = Math.floor(list.length/2);
    for (let i = nonLeafs - 1; i >= 0; i--) {
        maxheapify(list, i);
    }
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
let count = 0;
function calc() {
    output.innerHTML = "";
    count = 0;
    let lst_raw = document.getElementById("in_lst").value.split(',');
    let lst = [];
    for (let i = 0; i < lst_raw.length; i++) {
        lst.push(parseInt(lst_raw[i].trim()));
    }
    addToOutput(lst, lst, "Initial Input");
    console.log(heapsort(lst));
}

function addToOutput(list, heapList, msg) {
    let heapID = "heap_" + count;
    let tempHTML = "<tr><td>" + msg + "</td><td>  [";
    for (let i = 0; i < list.length; i++) {
        tempHTML += list[i];
        if (i < list.length-1) 
            tempHTML += ", ";
    }
    tempHTML += "]  </td><td id='" + heapID + "'></td></tr>";
    output.insertAdjacentHTML("beforeend", tempHTML);
    createBST(heapList.map(String), document.getElementById(heapID));

    count++
}