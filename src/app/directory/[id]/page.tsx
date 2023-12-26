/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { useRouter } from 'next/router';

const client = createDirectus("https://startupnation.panel.dreamslab.dev/").with(rest());

async function fetchdata(slug:string){
  return client.request(
    readItems("Startups",{
      fields: ['*'],
      filter: {slug},
      single: true
    })
  )
}

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { slug } = router.query;
  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStartupdata = async () => {
      try {
        const result = await fetchdata(slug);
        setStartupData(result);
      } catch (error) {
        console.error('Error fetching startup data:', error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      getStartupdata();
    }
  }, [slug])
  return (
    <div>page</div>
  )
}

export default page