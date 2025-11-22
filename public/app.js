const API = "https://urlproject-1.onrender.com";

async function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;

  const res = await fetch(`${API}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ longUrl })
  });

  const data = await res.json();

  document.getElementById("shortUrl").href = data.shortUrl;
  document.getElementById("shortUrl").innerText = data.shortUrl;

  document.getElementById("result").classList.remove("hidden");
}
