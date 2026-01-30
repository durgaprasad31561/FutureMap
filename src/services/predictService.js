const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080'

async function parseResponse(res) {
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return { ok: res.ok, data: await res.json(), status: res.status }
  }
  const text = await res.text()
  return { ok: res.ok, message: text, status: res.status }
}

async function predictRank(payload) {
  try {
    const res = await fetch(`${API_BASE}/api/predict/rank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return await parseResponse(res)
  } catch (err) {
    return { ok: false, message: err.message }
  }
}

export default { predictRank }
