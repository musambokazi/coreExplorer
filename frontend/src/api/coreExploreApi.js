const getApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_URL;
  if (configured) {
    return configured;
  }

  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
    return "http://localhost:8000";
  }

  return `http://${hostname}:8000`;
};

const API_BASE_URL = getApiBaseUrl();

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.detail || data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};
export const coreExploreApi = {
  login(email, password) {
    return requestJson('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  register(name, email, password) {
    return requestJson('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },
  subscribe(studentId) {
    return requestJson(`/api/auth/subscribe?student_id=${studentId}`, {
      method: 'POST',
    });
  },
  createPathway(payload) {
    return requestJson("/api/pathways", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  listPathways(studentId) {
    const params = new URLSearchParams({ student_id: String(studentId) });
    return requestJson(`/api/pathways?${params.toString()}`);
  },
};
