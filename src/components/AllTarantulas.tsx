import { useQuery, gql } from '@apollo/client';

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

const AllTarantulas = () => {

const { data, error, loading } = useQuery(GET_TARANTULAS);
  if (loading) return <p>Data Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Tarantulas</h1>
      <ul>
        {data.findAll.map((tarantula: any) => (
          <li key={tarantula.id}>
            <strong>{tarantula.name}</strong><br />
            Habitat: {tarantula.habitat?.name || 'N/A'}<br />
            Life Stage: {tarantula.lifeStage?.name || 'N/A'}<br />
            Genus: {tarantula.genus?.name || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllTarantulas