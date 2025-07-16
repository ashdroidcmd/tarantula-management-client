import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_GENUS = gql`
  mutation CreateGenus($input: CreateGenusInput!) {
    createGenus(input: $input) {
      id
      name
    }
  }
`;

const AddGenus = () => {
  const [name, setName] = useState('');
  const [createGenus, { data, loading, error }] = useMutation(CREATE_GENUS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createGenus({
      variables: {
        input: { name },
      },
    });
    setName(''); 
  };

  return (
    <div>
      <h2>Add Genus</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Genus name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Genus'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>Created Genus: {data.createGenus.name}</p>}
    </div>
  );
};

export default AddGenus;