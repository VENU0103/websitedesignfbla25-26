// Store all pages
const pages = {
  1: {
    title: "Item 1",
    image: "images/large1.png",
    text: "This is the description for Item 1."
  },
  2: {
    title: "Item 2",
    image: "images/large2.png",
    text: "This is the description for Item 2."
  }
  // Add more pages here
};

// Get the ID from the URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (pages[id]) {
    const page = pages[id];
    document.getElementById('title').textContent = page.title;
    document.getElementById('image').src = page.image;
    document.getElementById('image').alt = page.title;
    document.getElementById('text').innerHTML = page.text;
} else {
    document.getElementById('title').textContent = "Page not found";
    document.getElementById('text').textContent = "";
}
