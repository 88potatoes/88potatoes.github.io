//start - end 090222

const text_input = document.getElementById("text_input");
const from_base = document.getElementById("from_base");
const to_base = document.getElementById("to_base");
const result = document.querySelector(".result");
const pairs = {"10": "a", "11": "b", "12": "c", "13": "d", "14": "e", "15": "f"}
const order = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

//function to return the highest index
function returnMaxIndex (array) {
    let a = 0;

    for(let i = 0; i < array.length; i++) {
        if(order.indexOf(array[i]) == -1) {
            return -1;
        }else if(order.indexOf(array[i]) > a) {
            a = order.indexOf(array[i]);
        }

    }

    return a;
}


// creates options for the select elements
for(let i = 2; i <= 16; i++) {
    let temp = document.createElement("option");
    temp.innerHTML = i;
    temp.value = i;

    from_base.appendChild(temp);
}

for(let i = 2; i <= 16; i++) {
    let temp = document.createElement("option");
    temp.innerHTML = i;
    temp.value = i;

    to_base.appendChild(temp);
}

//converts decimal to a given base
function computeToToBase(p) {
    let base = to_base.value;
    let input = p;
    
    let first_array = [];
    let second_array = [];

    let n = 1;
    while(n < input) {
        first_array.push(n);
        n *= base;
    }

    for(let i = first_array.length - 1; i >= 0; i--) {
        let u = Math.floor(input / first_array[i]);
        input = input - (u * first_array[i]);

        second_array.push(u);
    }

    let final = "";
    for(let i = 0; i < first_array.length; i++) {
        if(second_array[i] < 10) {
            final += second_array[i].toString();
        }else {
            final += pairs[second_array[i].toString()];
        }
    }

    console.log(final);
    result.textContent = `${text_input.value} in base ${from_base.value} = ${final} in base ${to_base.value}`;
}

// converts a given base to a decimal
function computeToDec() {
    let input = text_input.value;

    let base = from_base.value;

    let first_array = input.split("");
    let second_array = [];

    //testing for a valid number
    if(returnMaxIndex(first_array) == -1 || returnMaxIndex(first_array) >= base) {
        result.textContent = "Not a valid number";
        return;
    }

    let n = 1;
    //changing the 'how' it loops only effects the 'i' that you use
    // it still loops the same if 'i' is not used
    for(let i = first_array.length - 1; i >= 0; i--) {
        second_array.push(n);
        n *= base;
    }
    second_array.reverse();

    let total = 0;
    for(let i = 0; i < first_array.length; i++) {
        if(parseInt(first_array[i]) < 10) {
            total += parseInt(first_array[i]) * second_array[i]; 
        }else {
            total += order.indexOf(first_array[i]) * second_array[i];
        }
    }
    
    computeToToBase(total);
}