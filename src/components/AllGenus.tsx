import { useQuery, useMutation, gql } from '@apollo/client';

const GET_GENUSES = gql`
  query {
    genuses {
      id
      name
    }
  }
`;

const DELETE_GENUS = gql`
  mutation DeleteGenus($id: Int!) {
    deleteGenus(id: $id) {
      id
      name
    }
  }
`;

function AllGenus() {
  const { data, loading, error, refetch } = useQuery(GET_GENUSES);
  const [deleteGenus, { loading: deleting }] = useMutation(DELETE_GENUS);

  const handleDelete = async (id: number) => {
    try {
      await deleteGenus({ variables: { id } });
      refetch(); // refetch the list after deletion
    } catch (err) {
      console.error('Failed to delete genus:', err);
    }
  };

  if (loading) return <p>Loading Genuses...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.genuses.map((genus: any) => (
          <li key={genus.id}>
            {genus.id}. {genus.name}{' '}
            <button onClick={() => handleDelete(genus.id)} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllGenus;
