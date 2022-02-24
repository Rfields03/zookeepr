const { animals } = require('./data/animals');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();

function filterByQuery(query, animalsArray) {
  let filteredResults = animalsArray;
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
}

function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
  res.json(result);
  } else {
    res.send(404);
  }
});

app.post('/api/animals', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});