export async function consumeReadableStream<T>(
  stream: ReadableStream<T>,
  callback: (chunk: T) => Promise<void>,
  signal: AbortSignal
): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  signal.addEventListener('abort', () => reader.cancel(), { once: true });

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value) {
        callback(decoder.decode(value));
      }
    }
  } catch (error) {
    if (signal.aborted) {
      console.error('Stream reading was aborted:', error);
    } else {
      console.error('Error consuming stream:', error);
    }
  } finally {
    reader.releaseLock();
  }
};
