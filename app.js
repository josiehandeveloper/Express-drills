const express = require('express');
const debug = require('debug'); 

const app = express(); 



app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
  });

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
  });


app.get('/', (req, res) => {
    res.send('Hello Express!');
  });

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
  });

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req, res) => {
    res.send('We don\'t serve that here. Never call again!');
  });



  app.get('/grade', (req, res) => {
    // get the mark from the query
    const { mark } = req.query;
  
    // do some validation
    if (!mark) {
      // mark is required
      return res
        .status(400)
        .send('Please provide a mark');
    }
  
    const numericMark = parseFloat(mark);
    if (Number.isNaN(numericMark)) {
      // mark must be a number
      return res
        .status(400)
        .send('Mark must be a numeric value');
    }
  
    if (numericMark < 0 || numericMark > 100) {
      // mark must be in range 0 to 100
      return res
        .status(400)
        .send('Mark must be in range 0 to 100');
    }
  
    if (numericMark >= 90) {
      return res.send('A');
    }
  
    if (numericMark > 80) {
      return res.send('B');
    }
  
    if (numericMark >= 70) {
      return res.send('C');
    }
  
    res.send('F');
  });