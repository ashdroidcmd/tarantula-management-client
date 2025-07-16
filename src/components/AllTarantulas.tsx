import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TARANTULAS = gql`
  query {
    findAll {
      id
      name
      habitat {
        name
      }
      lifeStage {
        name
      }
      genus {
        name
      }
    }
  }
`;

const DELETE_TARANTULA = gql`
  mutation DeleteTarantula($id: Int!) {
    deleteTarantula(id: $id) {
      id
      name
    }
  }
`;

type Tarantula = {
  id: number;
  name: string;
  habitat: {
    id?: number;
    name: string;
  } | null;
  lifeStage: {
    id?: number;
    name: string;
  } | null;
  genus: {
    id?: number;
    name: string;
  } | null;
};

const AllTarantulas = () => {
  const { data, error, loading, refetch } = useQuery(GET_TARANTULAS);
  const [deleteTarantula, { loading: deleting }] = useMutation(DELETE_TARANTULA);

  const handleDelete = async (id: number) => {
    try {
      await deleteTarantula({ variables: { id } });
      await refetch(); // update the list after deletion
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (loading) return <p>Data Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Tarantulas</h1>
      <ul>
        {data.findAll.map((tarantula: Tarantula) => (
          <li key={tarantula.id}>
            <strong>{tarantula.name}</strong><br />
            Habitat: {tarantula.habitat?.name || 'N/A'}<br />
            Life Stage: {tarantula.lifeStage?.name || 'N/A'}<br />
            Genus: {tarantula.genus?.name || 'N/A'}<br />
            <button onClick={() => handleDelete(tarantula.id)} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTarantulas;
