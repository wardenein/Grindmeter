import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Grindmeter</title>
        <meta name="description" content="Grindmeter frontend" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Welcome to Grindmeter!</h1>
        <p>This is your frontend running locally.</p>
      </main>
    </>
  )
}
