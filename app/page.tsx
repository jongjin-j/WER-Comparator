'use client';

export default function Home() {
  const testConnection = async () => {
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Error connecting to backend: ' + error);
    }
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={testConnection}>Test Backend Connection</button>
    </div>
  );
}
