const generateSessionId = () => {
  return `session_${new Date().getTime()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const createServerSession = () => {
  const sessionId = generateSessionId();
  return {
    sessionId,
  };
};
