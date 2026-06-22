// Side-effect entry: ensure a Workers-compatible environment before any
// dependency module is evaluated.
//
// Two things must be in place before React / react-router-dom load:
//
//   1. process.env.NODE_ENV === 'production' — React's CommonJS entry picks its
//      production build only when this is set; otherwise it loads the
//      development build, which calls the Node-only `console.createTask`.
//      Under nodejs_compat, `process.env` exists but is empty by default.
//
//   2. console.createTask polyfill — a safety net in case any dependency still
//      resolves the dev build.
//
// This file is the worker entry. We set these synchronously, then dynamically
// import the server so the setup is in place before any dependency evaluates.

// 1. Force production mode for React's NODE_ENV conditional.
try {
  const g = globalThis as unknown as Record<string, unknown>;
  const process = g.process as { env?: Record<string, string | undefined> };
  if (!process) {
    g.process = { env: {} };
  }
  process.env = process.env || {};
  process.env.NODE_ENV = 'production';
} catch {
  /* ignore */
}

// 2. Polyfill Node-only Console API.
const consoleAny = console as unknown as {
  createTask?: () => {
    run: <T>(name: unknown, fn: () => T) => T;
    dispose: () => void;
  };
};
if (typeof consoleAny.createTask !== 'function') {
  consoleAny.createTask = () => ({
    run: <T>(_name: unknown, fn: () => T) => fn(),
    dispose: () => {},
  });
}

// Dynamic import guarantees the setup above runs first.
const serverPromise = import('./server');

export default {
  async fetch(
    request: Request,
    env: unknown,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const server = await serverPromise;
    return server.default.fetch(request, env as never, ctx);
  },
};
