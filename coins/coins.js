// currency is an array of coin values in descending order

function greedy(x, currency) {
    let coin_representation = []; // Array of coins to return
    let change_remaining = x; // Keep track of the remaining money that has not yet been represented by change...
    while (change_remaining > 0) {
        // Find the largest coin that is less than or equal to the change remaining
        while (currency[0] > change_remaining)
            currency.shift(); // We can remove this coin from the array for efficiency... it won't be needed

        change_remaining -= currency[0];
        coin_representation.push(currency[0]);
    }

    return coin_representation;
}

function dynamic(x, currency) {
    let table = []; // Array meant to represent Ting's slides...
    table.push([0, 0]); // Zero is represented by 0 coins. Duh!

    // Calculate all values up to x
    for (let i = 1; i <= x; i++) {
        let min_coins = i; // i is max value (all pennies)
        let coin_used = -1;
        for (let j = 0; j < currency.length; j++) {
            let c = currency[j];
            if (c > i)
                continue; // Impossible to express i with any coin greater than i

            // Get table value of i-c to figure out how many coins are needed for this value of c
            let coins_needed = table[i-c][0] + 1;
            if (coins_needed <= min_coins) {
                min_coins = coins_needed;
                coin_used = c;
            }
        }
        table.push([min_coins, coin_used]);
    }

    // Work backwards to figure out coin representation of x
    let coin_representation = [];
    let coin_used = -1;
    let coin_indicies = []; // For display only
    for (let i = x; i > 0; i -= coin_used) {
        coin_used = table[i][1];
        coin_representation.push(coin_used);
        coin_indicies.push(i);
    }

    // Display table
    display_table(table, coin_indicies);

    return coin_representation;
}

/*
HTML FUNCTIONS FOR WEBPAGE
*/
function calc() {
    // Parse input
    let x = parseInt(document.getElementById("in_x").value);
    let currency_raw = document.getElementById("in_cur").value.split(',');
    let currency = [];
    for (let i = 0; i < currency_raw.length; i++) {
        currency.push(parseInt(currency_raw[i].trim()));
    }
    console.log(x);
    console.log(currency);

    // Run algorithms
    let g = greedy(x, currency.slice());
    let d = dynamic(x, currency);

    // Display
    document.getElementById("greedy").innerHTML = "Greedy: " + g.toString().replaceAll(',', ", ") + " <i>(" + g.length + " coins)</i>";
    document.getElementById("dynamic").innerHTML = "Dynamic: " + d.toString().replaceAll(',', ", ") + " <i>(" + d.length + " coins)</i>";
}

function display_table(table, coins) {
    let last_row_of_interest = false;
    let coin_arr = Array.from(coins);
    let table_html = document.getElementById("t");
    table_html.innerHTML = "";
    for (let i = 0; i < table.length; i++) {
        // DOM stuff
        let row = document.createElement("tr");
        let index = document.createElement("td");
        index.appendChild(document.createTextNode(i));
        let coins = document.createElement("td");
        coins.appendChild(document.createTextNode(table[i][0]));
        let last_coin = document.createElement("td");
        last_coin.appendChild(document.createTextNode(table[i][1]));

        row.appendChild(index);
        row.appendChild(coins);
        row.appendChild(last_coin);

        if (i == table.length-1) {
            last_row_of_interest = true;
            row.style.backgroundColor = "green";
        } else if (i == 0 || coin_arr.includes(i)) {
            last_row_of_interest = true;
            row.style.backgroundColor = "pink";
        } else {
            let arrow_segment = document.createElement("p");
            arrow_segment.style.textAlign = "center";
            arrow_segment.style.margin = "0";
            arrow_segment.appendChild(document.createTextNode(last_row_of_interest ? "^" : "|"));
            row.appendChild(arrow_segment);
            last_row_of_interest = false;
        }

        table_html.appendChild(row);
    }
}