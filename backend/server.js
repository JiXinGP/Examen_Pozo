const express = require('express');
const { Pool } = require('pg');
const cors = require('cors')

const app = express();
const port = 3000;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bd_restaurane',
  password: '1234',
  port: 5432,
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use(express.static('public'));
app.get('/clientes', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM clientes');
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  app.get('/pedidos', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM pedidos');
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  app.get('/productos', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM productos');
      res.json(rows);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });


  app.get('/ultimo-pedido', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM pedidos ORDER BY id_pedido DESC LIMIT 1');
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el último pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
app.post('/insertar_cliente', async (req, res) => {
    try {
      const { nombre, cedula, email, contrasena } = req.body;
 
      await pool.query(
        'INSERT INTO clientes (nombre, cedula, email, contrasena) VALUES ($1, $2, $3, $4)',
        [nombre, cedula, email, contrasena]
      );
  
      res.status(201).send('Cliente insertado correctamente');
    } catch (error) {
      console.error('Error al insertar cliente en la base de datos:', error);
      res.status(500).send('Error interno del servidor');
    }
  });
  app.post('/agg-pedido', async (req, res) => {
    const { confirmar_pedido,totalCompra } = req.body;
    console.log("backend "+confirmar_pedido)
    try {
        await pool.query('INSERT INTO pedidos (contenido, estado,total_compra) VALUES ($1, $2, $3)', [confirmar_pedido, 'Por entregar',totalCompra]);
  
        res.json({ mensaje: 'Pedido guardado exitosamente' });
    } catch (error) {
        console.error('Error al guardar pedido en la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.post