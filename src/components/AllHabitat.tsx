import { useQuery, gql } from '@apollo/client';

const GET_HABITATS = gql`
  query {
    habitats {
      id
      name
    }
  }
`;

function AllHabitat() {
  const { data, loading, error } = useQuery(GET_HABITATS);

  if (loading) return <p>Loading habitats...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.habitats.map((habitat: any) => (
          <li key={habitat.id}>
            {habitat.id}. {habitat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllHabitat;
