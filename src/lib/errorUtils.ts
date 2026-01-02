/**
 * Parses API error responses and returns a user-friendly error message.
 * Handles both simple message errors and validation error arrays.
 */
export function getErrorMessage(error: unknown, fallback = 'An error occurred'): string {
    if (!error || typeof error !== 'object') {
        return fallback;
    }

    const err = error as Record<string, unknown>;

    // Handle validation errors array: { error: [{ field, message }] }
    if (Array.isArray(err.error) && err.error.length > 0) {
        return err.error
            .map((e: { field?: string; message?: string }) => 
                e.field ? `${e.field}: ${e.message}` : e.message
            )
            .filter(Boolean)
            .join(', ');
    }

    // Handle simple message: { message: "..." }
    if (typeof err.message === 'string' && err.message) {
        return err.message;
    }

    // Handle error as string
    if (typeof err.error === 'string' && err.error) {
        return err.error;
    }

    return fallback;
}
