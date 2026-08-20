export const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      backgroundColor: '#f85149',
      color: '#ffffff',
      padding: '0.75rem 1rem',
      borderRadius: '6px',
      marginBottom: '1rem',
      fontWeight: 'bold',
      border: '1px solid #b3261e'
    }}>
      ⚠️ {message}
    </div>
  );
};
