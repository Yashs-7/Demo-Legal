document.addEventListener('DOMContentLoaded', () => {
  const textArea = document.getElementById('textArea');
  const saveBtn = document.getElementById('saveBtn');
  const result = document.getElementById('result');
  const downloadBtn = document.getElementById('downloadBtn');

  
  // Fetch the initial content from MongoDB Atlas when the page loads
  fetch('/api/Agreement-template')
    .then((response) => response.json())
    .then((data) => {
      const initialContent = data.content;
      textArea.value = initialContent;
    })
    .catch((error) => {
      console.error(error);
    });
  

  downloadBtn.addEventListener('click', () => {
    const modifiedText = textArea.value;
    downloadTextFile(modifiedText, 'modified_text.txt');
  });

  function downloadTextFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Event listener for "Save Changes" button
  saveBtn.addEventListener('click', async () => {
    const text = textArea.value;

    // Save the text to the backend
    try {
      const response = await fetch('/api/text/demo1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: text }),
      });

      if (response.ok) {
        result.innerHTML = 'Text saved successfully!';
        // Save the text in localStorage
        localStorage.setItem('savedText', text);
      } else {
        result.innerHTML = 'Error saving text.';
      }
    } catch (error) {
      console.error(error);
    }
  });
});
