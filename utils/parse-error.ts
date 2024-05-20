export default (error: unknown) =>
  error instanceof Error ? error : { status: 500, message: 'An unknown error occurred.' };
