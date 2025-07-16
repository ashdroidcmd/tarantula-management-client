import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_TARANTULA = gql`
  mutation CreateTarantula($input: CreateTarantulaInput!) {
    createTarantula(input: $input) {
      id
      name
    }
  }
`;

const AddTarantula = () => {
  const [form, setForm] = useState({
    name: '',
    habitatId: '',
    lifeStageId: '',
    genusId: '',
  });

  const [createTarantula, { loading, error, data }] = useMutation(CREATE_TARANTULA);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  return (
    <div>
      <h2>Add Tarantula</h2>
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
