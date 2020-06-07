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

  const trx = await knex.transaction();

  const insertedIds = await trx('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,    
  });

  const pointItems = items.map((item_id: number) => {
    return {
      item_id,
      point_id: insertedIds[0],
    }
  })

  await trx('point_items').insert(pointItems);

  return response.json({ sucess: true});
}); 

export default routes;