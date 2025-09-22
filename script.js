const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const outputHtml = document.getElementById('outputHtml');
const preview = document.getElementById('preview');

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert("Please enter a prompt");

  try {
    const res = await fetch('/api/ai-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } 
    catch { data = { html: text }; }

    if (res.ok) {
      outputHtml.value = data.html || "<!-- No output -->";
      preview.srcdoc = data.html || "<!-- No output -->";
    } else {
      alert(data.error || "AI generation failed");
    }

  } catch (err) {
    console.error("Fetch failed:", err);
    alert("AI generation request failed. Check console for details.");
  }
});
