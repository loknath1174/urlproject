const API ="https://urlproject-nyyb.onrender.com";
async function loadUrls() {
  const res = await fetch("http://localhost:5000/api/urls");
  const urls = await res.json();

  const table = document.getElementById("urlTable");
  table.innerHTML = "";

  urls.forEach(url => {
    const shortUrl = `http://localhost:5000/${url.shortId}`;

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
