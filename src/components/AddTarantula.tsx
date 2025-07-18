import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Functional Programming
// is a paradigm where functions are treated as first-class citizens, emphasizing immutability, pure functions, higher-order functions, and avoiding side effects.

const CREATE_TARANTULA = gql`
  mutation CreateTarantula($input: CreateTarantulaInput!) {
    createTarantula(input: $input) {
      id
      name
      habitatId
      lifeStageId
      genusId
    }
  }
`;

// 2. Immutability - Data is never mutated, Instead you return new copies of the data structure.
// AddTarantula component is designed to add a new tarantula by submitting a form only but not changing the original data structure
const AddTarantula = () => {
  const [form, setForm] = useState({
    name: '',
    habitatId: '',
    lifeStageId: '',
    genusId: '',
  });

  // 4. Higher Order Function - A function that takes another function as an argument or returns a function as its result.
  // useMutation is a higher-order function that returns a function to execute the mutation.
  // useMutation is a hook from GraphQL
  const [createTarantula, { loading, error, data }] = useMutation(CREATE_TARANTULA);

  // 1. Pure Functions - A pure function always returns the same output for the same input and has no side effects.
  // Examples:
  // const Handlechange - is pure: it does not mutate state directly and returns a new state object.
  // goes to const AddTarantula to input the values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const Handlesubmit - is also pure: it does not mutate the form state directly and returns a new state after submission. PURE LOGIC in CREATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTarantula({
      variables: {
        input: {
          name: form.name,
          habitatId: parseInt(form.habitatId),
          lifeStageId: parseInt(form.lifeStageId),
          genusId: parseInt(form.genusId),
        },
      },
    });
    setForm({ name: '', habitatId: '', lifeStageId: '', genusId: '' });
  };

  // 3. Declarative Programming - focuses on what the program should achieve
  // Example this component describes what the UI should look like based on the state, rather than how to change it.
  return (
    <div>
      <h2>Add Tarantula</h2>
      {/* 5. First Class Function
        First-class functions (also called first-class citizens) means:
        In JavaScript, functions can be treated like any other value.
        They can be:
        Stored in variables,
        Passed as arguments to other functions,
        Returned from functions,
        Assigned to object properties or array elements. 
        Example: handleSubmit and handChange is stored on a variable passed on a event listenr (onSubmit and onChange)*/}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tarantula Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="habitatId"
          placeholder="Habitat ID"
          value={form.habitatId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="lifeStageId"
          placeholder="Life Stage ID"
          value={form.lifeStageId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="genusId"
          placeholder="Genus ID"
          value={form.genusId}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Add Tarantula'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>✅ Created: {data.createTarantula.name}</p>}
    </div>
  );
};

export default AddTarantula;
