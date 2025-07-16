import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_HABITAT = gql`
  mutation CreateHabitat($input: CreateHabitatInput!) {
    createHabitat(input: $input) {
      id
      name
    }
  }
`;

const AddHabitat = () => {
  const [name, setName] = useState('');
  const [createHabitat, { data, loading, error }] = useMutation(CREATE_HABITAT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createHabitat({
      variables: {
        input: { name },
      },
    });
    setName(''); 
  };

  return (
    <div>
      <h2>Add Habitat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Habitat name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Habitat'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>Created Habitat: {data.createHabitat.name}</p>}
    </div>
  );
};

export default AddHabitat;
