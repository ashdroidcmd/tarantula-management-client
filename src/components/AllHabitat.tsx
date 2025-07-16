import { useQuery, useMutation, gql } from '@apollo/client';

const GET_HABITATS = gql`
  query {
    habitats {
      id
      name
    }
  }
`;

const DELETE_HABITAT = gql`
  mutation DeleteHabitat($id: Int!) {
    deleteHabitat(id: $id) {
      id
      name
    }
  }
`;

type Habitat = {
  id: number;
  name: string;
};

function AllHabitat() {
  const { data, loading, error, refetch } = useQuery(GET_HABITATS);
  const [deleteHabitat, { loading: deleting }] = useMutation(DELETE_HABITAT);

  const handleDelete = async (id: number) => {
    try {
      await deleteHabitat({ variables: { id } });
      refetch(); // refetch the list after deletion
    } catch (err) {
      console.error('Failed to delete Habitat:', err);
    }
  };

  if (loading) return <p>Loading habitats...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.habitats.map((habitat: Habitat) => (
          <li key={habitat.id}>
            {habitat.id}. {habitat.name}{' '}
            <button onClick={() => handleDelete(habitat.id)} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllHabitat;
