import { useEffect, useRef } from 'react';

/**
 * Basic WebSocket client hook for the demo (starter version).
 * TODO: expand into a structured message router with typed handlers.
 */
function useWebSocketClient(url, onMessage) {
  const socketRef = useRef(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    // TODO [Module 3 - Step 2 & 3]: open a WebSocket connection, wire message routing,
    // and handle cleanup when the component unmounts or url changes.
  }, [url]);

  const sendJsonMessage = (message) => {
    console.warn(
      'TODO: sendJsonMessage called but WebSocket is not wired yet (Module 3 - Step 2 & 3).',
      message
    );
  };

  return {
    socket: socketRef.current,
    sendJsonMessage,
  };
}

export default useWebSocketClient;
