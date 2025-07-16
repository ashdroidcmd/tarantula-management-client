import { useQuery, gql } from '@apollo/client';

const GET_LIFE_STAGES = gql`
  query {
    lifeStages {
      id
      name
    }
  }
`;

function AllLifeStages() {
  const { data, loading, error } = useQuery(GET_LIFE_STAGES);

  if (loading) return <p>Loading life stages...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.lifeStages.map((stage: any) => (
          <li key={stage.id}>
            {stage.id}. {stage.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllLifeStages;
