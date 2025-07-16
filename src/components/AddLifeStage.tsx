import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_LIFESTAGE = gql`
  mutation CreateLifeStage($input: CreateLifeStageInput!) {
    createLifeStage(input: $input) {
      id
      name
    }
  }
`;

const AddLifeStage = () => {
  const [name, setName] = useState('');
  const [createLifeStage, { data, loading, error }] = useMutation(CREATE_LIFESTAGE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createLifeStage({
      variables: {
        input: { name },
      },
    });
    setName(''); 
  };

  return (
    <div>
      <h2>Add Life Stage</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Life Stage Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Life Stage'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && <p>Created Life Stage: {data.createLifeStage.name}</p>}
    </div>
  );
};

export default AddLifeStage;
