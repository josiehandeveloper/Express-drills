const { response } = require('express');
const express = require('express');


const app = express(); 

//Drill 1
app.get('/sum', (req, res) => {
    //1. get values from the request
    const a = req.query.a;
    const b = req.query.b;

    if(!a){
        return res.status(400).send('Please provide numA');
    }

    if(!b) {
        return res.status(400).send('Please provide numB');
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b); 

    if (Number.isNaN(numA)){
        return res.status(400).send('a must be a number');
    }

    if (Number.isNaN(numB)) {
        return res.status(400).send('b must be a number');
    }

    const c = numA + numB;

    const responseString = `The sum of ${numA} + ${numB} = ${c}`;

    return res.status(400).send(responseString); 

});

//Drill 2
app.get('/cipher', (req, res) => {
    //1. get values from the request
    const text = req.query.text;
    const shift = req.query.shift;

    if(!text) {
        return res.status(400).send('Please provide text');
    }

    if(!shift) {
        return res.status(400).send('Please provide shift');
    }

    const numShift = parseFloat(shift);

   if(Number.isNaN(numShift)){
       return res.status(200).send('shift must be a number'); 
   }

    const base = 'A'.charCodeAt(0);

    const cipher = text
        .toUpperCase()
        .split('')
        .map(char => {
            const code = char.charCodeAt(0);

            if(code < base || code > (base+26)) {
                return char;
            }

            let diff = code - base;
            diff = diff + numShift;

            diff = diff % 26;

            const shiftedChar = String.fromCharCode(base+diff);
            return shiftedChar
        })
        .join('');

        res.status(200).send(cipher)
});

//Drill 3

app.get('/lotto', (req, res) => {
    const { numbers } = req.query;

    if(!numbers) {
        return res.status(400).send('numbers is required');
    }

    if(!Array.isArray(numbers)) {
        return res.status(400).send('numbers must be an array');
    }

    const guesses = numbers 
        .map(n => parseInt(n))
        .filter(n => !Number.isNaN(n) && (n>= 1 && n <=20));

    if(guesses.length !=6 ){
        return res.status(400).send('there must be 6 numbers b.w 1 and 20');
    }

    const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
    
    const winningNumbers = [];
    for (let i = 0; i < 6; i ++) {
        const ran = Math.floor(Math.random() * stockNumbers.length);
        winningNumbers.push(stockNumbers[ran]);
        stockNumbers.splice(ran, 1);
    }

    let diff = winningNumbers.filter(n=> !guesses.includes(n));

    let responseText;

    switch(diff.length) {
        case 0:
            responseText = 'Wow! Unbelievable! You could have won the mega millions!';
            break;
        case 1:
            responseText = 'Congradulations! You win $100!';
            break;
        case 2:
            responseText = 'Congradulations! you win a free ticket!';
            break;
        default:
            responseText = 'Sorry, you lose';

    }

    res.send(responseText);

})