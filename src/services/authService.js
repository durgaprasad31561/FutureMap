const API_BASE = 'http://localhost:8080'

async function signup({ name, email, phone, password }) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phoneNumber: phone, password })
    })

    const contentType = res.headers.get('content-type') || ''
    let data
    if (contentType.includes('application/json')) {
      data = await res.json()
    } else {
      data = await res.text()
    }

    return { ok: res.ok, data, message: typeof data === 'string' ? data : JSON.stringify(data) }
  } catch (err) {
    return { ok: false, message: err.message }
  }
}

async function login({ email, password }) {
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const contentType = res.headers.get('content-type') || ''
    let data
    if (contentType.includes('application/json')) {
      data = await res.json()
    } else {
      data = await res.text()
    }

    return { ok: res.ok, data, message: typeof data === 'string' ? data : JSON.stringify(data) }
  } catch (err) {
    return { ok: false, message: err.message }
  }
}

export default { signup, login }
