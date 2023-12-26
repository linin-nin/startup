"üse client"

import React from 'react'
import { createDirectus, rest, readItems } from '@directus/sdk';
import Link from 'next/link';


const client = createDirectus("https://startupnation.panel.dreamslab.dev/").with(rest());

function fetchData() {
    return client.request(
      readItems("Startups", {
        fields: ['*']
      })
    );
  }

const page = async() => {
    const data = await fetchData()
  return (
    <main className='flex  w-full justify-center pt-20 items-center'>
        <div>
            {data.map((item) => (
                <div key={item.id} className=' gap-6 mb-2 rounded-md'>
                    <Link href={`/directory/${item.slug}`}>
                    <h1>{item.company_name}</h1>
                    </Link>
                </div>
            ))}
        </div>
    </main>
  )
}

export default page