"üse client"

import React from 'react'
import { createDirectus, rest, readItems } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';

const client = createDirectus("https://startupnation.panel.dreamslab.dev/").with(rest());

function Data() {
    return client.request(
      readItems("Startups", {
        fields: ['*']
      })
    );
  }

const page = async() => {
    const data = await Data()
    console.log(data)
  return (
    <main className='flex max-w-[600px] justify-center items-center'>
        <div >
            {data.map((item) => (
                <div key={item.id} className='bg-green-300 gap-6 mb-10 rounded-md'>
                    <Link href={`/directory/${item.slug}`}>
                    <h1>{item.company_name}</h1>
                    <h3>{item.title}</h3>
                    <p>{item.dirscription}</p>
                    </Link>
                </div>
            ))}
        </div>
    </main>
  )
}

export default page