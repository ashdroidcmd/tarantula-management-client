import { useQuery, useMutation, gql } from '@apollo/client';

const GET_LIFE_STAGES = gql`
  query {
    lifeStages {
      id
      name
    }
  }
`;

const DELETE_LIFESTAGES = gql`
  mutation DeleteLifeStage($id: Int!) {
    deleteLifeStage(id: $id) {
      id
      name
    }
  }
`;

type LifeStage = {
  id: number;
  name: string;
};


function AllLifeStages() {
  const { data, loading, error, refetch } = useQuery(GET_LIFE_STAGES);
   const [deleteHabitat, { loading: deleting }] = useMutation(DELETE_LIFESTAGES);
  

  const handleDelete = async (id: number) => {
    try {
      await deleteHabitat({ variables: { id } });
      refetch(); // refetch the list after deletion
    } catch (err) {
      console.error('Failed to delete Habitat:', err);
    }
  };

  if (loading) return <p>Loading life stages...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.lifeStages.map((stage: LifeStage) => (
          <li key={stage.id}>
            {stage.id}. {stage.name}{''}
            <button onClick={() => handleDelete(stage.id)} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllLifeStages;
