import { CreatePersonDto, UpdatePersonDto, Person } from "@/backend/types";

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

export async function createPerson(person: CreatePersonDto): Promise<Person> {
  const response = await fetch('http://localhost:3001/people', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(person),
  });
  return response.json();
}

export async function updatePerson(id: string, person: UpdatePersonDto): Promise<Person> {
  const response = await fetch(`http://localhost:3001/people/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(person),
  });
  return response.json();
}
