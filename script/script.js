document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    "section, article, div, p, h1, h2, h3, h4, h5, h6, img, table, tr, li"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  elements.forEach(el => observer.observe(el));
});

// Store all pages
const pages = {
  1: {
    title: "Gamin - Augusta Savage",
    image: "images/gamin.png",
    text: "Savage used her skills of pride, inquisitiveness, and self-confidence to create artifacts of young people struggling for survival in New York during the 1920’s. Savage’s best art piece is called Gamin. It was one of the most famous art pieces that represented the Harlem Renaissance. Although Gamin looks like a sturdy bronze bust it is actually made of carefully-painted plaster. Surviving examples in untouched condition like this one are quite rare, for plaster is easily chipped and cracked and the fragile surface is susceptible to scuffs and abrasions. Savage was a mentor to many young artists, including Romare Bearden. Late in his life, Bearden recalled that Savage was an inspiring role model: she was \"open, free, resisted the usual conventions of the time, and lived for her art, thinking of success only in terms of how well her sculptures turned out.\""
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