import express from 'express';

const app = express();

app.get('/users', (resquest, response ) => {
  console.log('Listagem de usuário');

  response.json([
    'Alexandre',
    'Junior',
    'Maykel',
    'Daniel'
  ])
});

app.listen(3333);