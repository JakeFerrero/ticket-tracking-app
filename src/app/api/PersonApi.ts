import { Person } from "@/backend/types";

export async function deletePerson(id: string): Promise<boolean> {
  const response = await fetch(`http://localhost:3001/people/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
}

export async function getPeople(): Promise<Person[]> {
  const response = await fetch('http://localhost:3001/people');
  return response.json();
}

export async function getPersonById(id: string): Promise<Person> {
  const response = await fetch(`http://localhost:3001/people/${id}`);
  return response.json();
}

export async function createPerson(person: Person): Promise<Person> {
  const response = await fetch('http://localhost:3001/people', {
    method: 'POST',
    body: JSON.stringify(person),
  });
  return response.json();
}

export async function updatePerson(person: Person): Promise<Person> {
  const response = await fetch(`http://localhost:3001/people/${person.id}`, {
    method: 'PUT',
    body: JSON.stringify(person),
  });
  return response.json();
}
