const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const apiClient = async (endpoint, options = {}) => {
    const url = `/api${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  export const todoAPI = {
    getAll: () => apiClient('/todo'),
    
    create: (todoData) => 
      apiClient('/todo', {
        method: 'POST',
        body: JSON.stringify(todoData),
      }),
    
    update: (todoData) => 
      apiClient('/todo', {
        method: 'PUT',
        body: JSON.stringify(todoData),
      }),
    
    delete: (id) => 
      apiClient('/todo', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      }),
  };
