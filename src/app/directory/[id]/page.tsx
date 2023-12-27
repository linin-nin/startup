import React from 'react'
import { createDirectus, rest, readItems } from '@directus/sdk'

interface Startup {
  id: number;
  company_name: string;
  // Add other properties based on your data structure
}
interface StartupDetailPageProps {
  startup: Startup[];
}

const client = createDirectus("https://startupnation.panel.dreamslab.dev/").with(rest());

function fetchData(slug:string) {
    return client.request(
      readItems("Startups", {
        fields: [
          'id',
          'company_name', 
          'title', 
          { founder: ['*']},
          {category: ['category_name']}
        ],
        filter: {
          slug: slug
        }
      })
    );
  }

  export async function getServerSideProps(params) {
    try {
      const slug = params.slug;
      const data = await fetchData(slug);
  
      return {
        props: {
          startup: data,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          startup: null,
        },
      };
    }
  }


const Detailpage: React.FC<StartupDetailPageProps> = ({startup}) => {
  return (
    <div>
      {
        startup.map((item) => {
          <div key={item.id}>

          </div>
        })
      }
    </div>
  )
}

export default Detailpage