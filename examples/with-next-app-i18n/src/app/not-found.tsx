// Root not-found page.
//
// This intentionally does NOT use any next-intl server APIs. Next.js statically
// prerenders the internal `/_not-found` route during build, and calling next-intl
// helpers there triggers "Expected workStore to be initialized" in Next.js 16.
// Localized 404s are handled by the catch-all within `[locale]` instead.
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'system-ui, sans-serif',
            gap: 8,
          }}
        >
          <h1 style={{ margin: 0 }}>404</h1>
          <p style={{ margin: 0, color: '#666' }}>Page not found</p>
        </div>
      </body>
    </html>
  );
}
