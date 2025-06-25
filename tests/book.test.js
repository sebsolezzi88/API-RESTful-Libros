import request from 'supertest';
import app from '../index.js'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwaWthY2h1VXNlciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzUwODkyOTI2LCJleHAiOjE3NTA4OTY1MjZ9.LwaEHoc4KVVWle5pLewb0gyjVLJ_e_vrp4rrDdfFXKE';
describe('GET /api/books/getbooks', () => {
  it('debería requerir autenticación', async () => {
    const res = await request(app).get('/api/book/getbooks');
    expect(res.statusCode).toBe(401); // Suponiendo que usas JWT
  });

  it('debería devolver libros si está autenticado', async () => {
   
    const res = await request(app)
      .get('/api/book/getbooks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('books');
  });
});


describe('POST /api/book/addbook', () => {
  /* it('debería agregar un libro con token válido', async () => {
   

    const newBook = {
      bookname: 'El Quijote',
      author: 'Miguel de Cervantes',
      category:"fiction"
    };

    const res = await request(app)
      .post('/api/book/addbook')
      .set('Authorization', `Bearer ${token}`)
      .send(newBook);

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('Book added successfully');
  }); */

   it('debería fallar si no se envía token', async () => {
    const newBook = {
      bookname: 'El Quijote',
      author: 'Miguel de Cervantes',
      category: "fiction"
    };

    const res = await request(app)
      .post('/api/book/addbook')
      .send(newBook);

    expect(res.statusCode).toBe(401); 
  }); 

  it('debería fallar si el libro ya esta ingresado', async () => {
   

    const newBook = {
      bookname: 'El Quijote',
      author: 'Miguel de Cervantes',
      category:"fiction"
    };

    const res = await request(app)
      .post('/api/book/addbook')
      .set('Authorization', `Bearer ${token}`)
      .send(newBook);

    expect(res.statusCode).toBe(409);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('you already saved this book.');
  }); 

});

describe('PUT /api/book/changebooktatus/:idlibro',()=>{
  it('debería cambiar el esto de lectura del libro', async () => {
   

    const bookStatus = {
      status:"read"
    };

    const res = await request(app)
      .put('/api/book/changebooktatus/7')
      .set('Authorization', `Bearer ${token}`)
      .send(bookStatus);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('book updated');
  });

   it('debería devolver errro por status invalido', async () => {
   

    const bookStatus = {
      status:"boring"
    };

    const res = await request(app)
      .put('/api/book/changebooktatus/7')
      .set('Authorization', `Bearer ${token}`)
      .send(bookStatus);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('invalid status');
  });

  it('debería devolve error si no encuentra el libro', async () => {
   

    const bookStatus = {
      status:"read"
    };

    const res = await request(app)
      .put('/api/book/changebooktatus/65')
      .set('Authorization', `Bearer ${token}`)
      .send(bookStatus);

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('book not found');
  });

});