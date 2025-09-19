/* eslint-disable */
function ordenaListNumero(number) {
    const numberArray = [];
    const numberString = JSON.stringify(number);
    for (let i of numberString) {
        numberArray.push(i);
    }
    numberArray.sort((a, b) => a - b);
    return numberArray;
}

const number = 3512760916325;
console.log(ordenaListNumero(number));
