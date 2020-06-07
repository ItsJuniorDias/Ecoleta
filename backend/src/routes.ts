import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async  (resquest, response ) => {
  const items =  await knex('items').select('*');
  

  const serializedItems = items.map(item => {
    return {
      id: item.id,
      title: item.title,
      image_url: `https://localhost:3333/uploads/${item.image}`,
    }
  })

  return response.json(serializedItems)
});

routes.post('/points', async (request, response) => {
  const { 
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = request.body;

  await knex('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,    
  });

  return response.json({ sucess: true});
}); 

export default routes;