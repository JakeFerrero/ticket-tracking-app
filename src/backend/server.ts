import cors from 'cors';
import express from 'express';
import { db } from './db';
import { CreatePersonDto, CreateTicketDto, UpdatePersonDto, UpdateTicketDto } from './types';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

// People routes
app.get('/people', (req, res) => {
  res.json(db.getAllPeople());
});

app.get('/people/:id', (req, res) => {
  const person = db.getPerson(req.params.id);
  if (!person) {
    return res.status(404).json({ error: 'Person not found' });
  }
  res.json(person);
});

app.post('/people', (req, res) => {
  const data = req.body as CreatePersonDto;
  if (!data.name || data.name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  const person = db.createPerson(data);
  res.status(201).json(person);
});

app.put('/people/:id', (req, res) => {
  const data = req.body as UpdatePersonDto;
  if (data.name !== undefined && data.name.trim() === '') {
    return res.status(400).json({ error: 'Name cannot be empty' });
  }
  const person = db.updatePerson(req.params.id, data);
  if (!person) {
    return res.status(404).json({ error: 'Person not found' });
  }
  res.json(person);
});

app.delete('/people/:id', (req, res) => {
  const success = db.deletePerson(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Person not found' });
  }
  res.status(204).send();
});

// Ticket routes
app.get('/tickets', (req, res) => {
  res.json(db.getAllTickets());
});

app.get('/tickets/:id', (req, res) => {
  const ticket = db.getTicket(req.params.id);
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }
  res.json(ticket);
});

app.post('/tickets', (req, res) => {
  const data = req.body as CreateTicketDto;
  if (!data.name || data.name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  const ticket = db.createTicket(data);
  res.status(201).json(ticket);
});

app.put('/tickets/:id', (req, res) => {
  const data = req.body as UpdateTicketDto;
  if (data.name !== undefined && data.name.trim() === '') {
    return res.status(400).json({ error: 'Name cannot be empty' });
  }
  const ticket = db.updateTicket(req.params.id, data);
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }
  res.json(ticket);
});

app.delete('/tickets/:id', (req, res) => {
  const success = db.deleteTicket(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Ticket not found' });
  }
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
