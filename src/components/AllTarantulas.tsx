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
        {data.findAll.map((t: any) => (
          <li key={t.id}>
            <strong>{t.name}</strong><br />
            Habitat: {t.habitat?.name || 'N/A'}<br />
            Life Stage: {t.lifeStage?.name || 'N/A'}<br />
            Genus: {t.genus?.name || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllTarantulas