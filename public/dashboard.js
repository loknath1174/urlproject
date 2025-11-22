const API = "https://urlproject-1.onrender.com";

async function loadUrls() {
  const res = await fetch(`${API}/api/urls`);
  const urls = await res.json();

  const table = document.getElementById("urlTable");
  table.innerHTML = "";

  urls.forEach(url => {
    const shortUrl = `${API}/${url.shortId}`;

    table.innerHTML += `
      <tr class="border-b border-gray-700">
        <td class="p-4">
          <a href="${shortUrl}" target="_blank" class="text-blue-400">${shortUrl}</a>
        </td>
        <td class="p-4">${url.longUrl}</td>
        <td class="p-4">${url.clicks}</td>
      </tr>
    `;
  });
}

loadUrls();
