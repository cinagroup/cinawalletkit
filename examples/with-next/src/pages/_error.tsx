function ErrorPage({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{statusCode || 'Error'}</h1>
      <p>An error occurred.</p>
      <a 
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#0070f3',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none',
        }}
      >
        Go Home
      </a>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
