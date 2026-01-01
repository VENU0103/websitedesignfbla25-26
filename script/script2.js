// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to handle scroll events
  function handleScroll() {
    const animatedElements = document.querySelectorAll('.animated-element');
  
    animatedElements.forEach(element => {
      if (isInViewport(element)) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(10px)';
      } else {
        // Reset the animation properties if the element is not in the viewport
        element.style.opacity = 0;
        element.style.transform = 'translateY(10px)';
      }
    });
  }
  // Attach the handleScroll function to the scroll event
window.addEventListener('scroll', handleScroll);

// Key for storing the scroll position in session storage
  const SCROLL_POS_KEY = 'scrollPosition';
  // Key for tracking the previous tab/window context
  const PREV_CONTEXT_KEY = 'prevContext';

  // --- Function to save the current scroll position ---
  function saveScrollPosition() {
    // Check if the user is leaving the page via navigation (not just refreshing)
    if (document.visibilityState === 'hidden') {
      sessionStorage.setItem(SCROLL_POS_KEY, window.scrollY);
      sessionStorage.setItem(PREV_CONTEXT_KEY, 'navigated');
    } else {
      // If it's just a refresh in the same tab, mark it as such
      sessionStorage.setItem(PREV_CONTEXT_KEY, 'refreshed');
    }
  }

  // --- Function to restore or clear the scroll position ---
  function restoreOrClearScrollPosition() {
    const previousContext = sessionStorage.getItem(PREV_CONTEXT_KEY);
    
    if (previousContext === 'refreshed') {
      // Case 1: Restoring on refresh in the same tab
      const storedScrollY = sessionStorage.getItem(SCROLL_POS_KEY);
      if (storedScrollY !== null) {
        // Use a slight delay to ensure the DOM is fully painted before scrolling
        window.setTimeout(() => {
          window.scrollTo(0, parseInt(storedScrollY, 10));
        }, 100); 
      }
    } else {
      // Case 2: User arrived from a different tab/window (previousContext === 'navigated' or null)
      // Clear storage and scroll to top (default browser behavior)
      sessionStorage.removeItem(SCROLL_POS_KEY);
      sessionStorage.removeItem(PREV_CONTEXT_KEY);
      // Explicitly scroll to the top just in case
      window.scrollTo(0, 0); 
    }
  }

  // --- Event Listeners ---
  
  // Save position when the page is about to unload or hide (before refresh or navigation)
  // Use the Page Visibility API for better detection
  document.addEventListener('visibilitychange', saveScrollPosition);
  
  // Restore position when the page loads
  window.addEventListener('load', restoreOrClearScrollPosition)

// Store all pages
const pages = {
  1: {
    title: "Maja Godlewska: The Fluid Landscapes",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/08/Maja-Godlewska-for-web-10-768x512.jpg",
    text: "Maja Godlewska, a professor at the University of North Carolina at Charlotte, has dedicated her career to documenting the complex intersection of human activity and the natural world through her global travels and artistic residencies. Her work, which is displayed across multiple levels of the Mint Museum Uptown, uses watercolor paper and ink to create sculptural, undulating surfaces that mimic the organic patterns of terrain, growth, and decay. By focusing on the tension between the enduring beauty of nature and the disruptive effects of eco-tourism and digital-age consumption, Godlewska encourages viewers to move past superficial observations and engage in slow, reflective looking. Her highly decorated career, which includes a Fulbright Fellowship and numerous other prestigious grants, informs her exploration of the fragile balance between form and formlessness in our changing environment."
  },
  2: {
    title: "Interventions: Weaving Joy, Woven Resistance",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/10/2025.11-Kat-Sanchez-Interventions-gallery-for-web-19-768x512.jpg",
    text: "In her installation for the Interventions series at the Mint Museum, artist Katrina Sánchez explores the complexities of her bicultural identity by weaving together her Panamanian heritage and her upbringing in the American South. The exhibition places contemporary works within the museum's permanent collections to foster a dialogue between history and the present day. Drawing from a family legacy of handwork, including a great-grandmother famously nicknamed the spider for her constant crocheting, Sánchez uses tactile materials like yarn, ribbons, fish scales, and corn to create vibrant, layered webs. These pieces serve as a physical map of her memories and traditions, referencing the lush landscapes of Panama and the intricate patterns of ancestral Mola garments. By utilizing fiber and mixed media, Sánchez honors a manual history passed down through generations of women in her family, transforming traditional craft into a modern exploration of comfort, connection, and cultural persistence."
  },
  3: {
    title: "Art of Devotion: The Santos de Palo Tradition of Puerto Rico",
    image: "https://www.mintmuseum.org/wp-content/uploads/2024/04/Santos-Gallery-for-web-07-768x512.jpg",
    text: "This exhibition showcases nearly 200 objects spanning three centuries to explore the sacred Puerto Rican folk-art tradition of Santos de Palo. These small, hand-carved wooden saints originated with rural farmers who, isolated from the formal Catholic Church and its clergy, created their own devotional figures from local branches and Spanish cedar for use in home altars. Over time, this humble practice evolved into a significant symbol of national identity, blending Spanish Catholic influences with the artistic heritage of the indigenous Taino and African populations. Curated by Dorie Reents-Budet, the collection belongs to Nitza Mediavilla Piñero and Francisco Toste Santana, who spent decades building this archive in San Juan before moving to Charlotte. This presentation marks the very first time their extensive collection has been exhibited within the United States, offering a rare look at the resilience and multicultural history of Puerto Rican faith."
  },
  4: {
    title: "Renaissance, Romanticism, and Rebellion: European Art from the Smith-Naifeh Collection",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/07/Huet-River-Landscape-with-a-Rainbow-2-768x518.jpg",
    text: "This exhibition explores the massive cultural and aesthetic shifts of 19th-century Europe through the prestigious Smith-Naifeh Collection, which was curated over several decades by the late Gregory Smith and Pulitzer Prize-winning author Steven Naifeh. Organized by Todd Herman and Jonathan Stuhlman, the display marks the most significant public presentation of these works, many of which represent artists who were contemporaries or influences of Vincent van Gogh. The show is structured into three distinct movements: Renaissance, which looks at the classical academic traditions of European salons; Romanticism, which focuses on emotional depth and dramatic landscapes; and Rebellion, which highlights the avant-garde artists whose experimental styles birthed modernism. Beyond their work as collectors, Naifeh and Smith are celebrated for their landmark biographies of iconic artists, and this exhibition serves as a visual extension of their lifelong dedication to art history and scholarship."
  },
  5: {
    title: "Across the Nation” Masterpieces from the National Gallery of Art",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/03/Autumn-Drama-Alma-Thomas-768x611.jpg",
    text: "In celebration of America’s 250th anniversary, The Mint Museum has been selected as one of only ten institutions nationwide to participate in the National Gallery of Art’s Across the Nation initiative. This partnership brings iconic masterpieces to Charlotte, including Edgar Degas’s intimate portrayal of movement in Dancers Backstage, Georgia O’Keeffe’s vibrant floral abstraction Jack-in-Pulpit – No. 2, and Alma Thomas’s rhythmic, seasonal exploration in Autumn Drama. By featuring these celebrated works, the program aims to make world-class cultural treasures more accessible to local communities while highlighting the diverse artistic legacy of the American experience. As Todd Herman, President and CEO of The Mint Museum, notes, this collaboration offers a rare opportunity for the public to engage directly with some of the most significant pieces from the National Gallery’s collection in a way that celebrates beauty, innovation, and shared history."
  },
  6: {
    title: "Heritage Gallery",
    image: "https://www.mintmuseum.org/wp-content/uploads/2023/01/mint-museum-heritage-gallery-1200x400-1-1000x333.webp",
    text: "Established in 1936 as the first art museum in North Carolina, The Mint Museum has long served as a pioneer in the region's cultural landscape. This history of leadership is showcased in the Heritage Gallery at Mint Museum Randolph, which serves as a dedicated space for exploring the institution's transformation. Through a curated selection of artwork, historical photographs, and archival records, the gallery traces the building's journey from its original function as a United States Mint branch to its modern identity as a premier art destination. By documenting these milestones, the installation offers a comprehensive look at the museum's past while pointing toward its future evolution."
  },
  7: {
    title: "Craft in the Laboratory: The Science of Making Things",
    image: "https://www.mintmuseum.org/wp-content/uploads/2022/05/2010.70-jpg-1000x665.webp",
    text: "As the first exhibition of its kind in the Southeast, Craft in the Laboratory investigates the intersection of artistic design and scientific principles. Supported by the Müller Corporation, this initiative marks the first major update to the Mint Museum's Craft and Design Galleries in over a decade. Curators Annie Carlano and Rebecca Elliot selected 100 pieces from the museum's permanent collection to demonstrate how math and science inform the creation of objects made from diverse materials like steel, polymers, and repurposed agricultural waste. The display features work from global creators, ranging from intricate stoneware and forged metal to contemporary furniture like the Nyala Chair and the Rainbow Chair. This comprehensive look at the technical side of creativity is also documented in a dedicated catalog published by Dan Giles, Ltd."
  },
  8: {
    title: "Constellation CLT",
    image: "https://www.mintmuseum.org/wp-content/uploads/2023/10/constellation-clt-logo-jpg-1000x563.webp",
    text: "Constellation CLT is a recurring exhibition program that highlights the work of local creators while bringing energy to the museum's public areas. To ensure a fresh experience for visitors, the featured installations change three times every year. These works are strategically placed throughout the Mint Museum Uptown across five specific locations, including the main entrance, the base of the Morrison Atrium escalator, the landings on the Mezzanine and Level 3, and inside the Museum Store."
  },
  9: {
    title: "Ten Ten Ten",
    image: "https://www.mintmuseum.org/wp-content/uploads/2023/01/1337640145-e1604407649600.webp",
    text: "Project Ten Ten Ten was a specialized commissioning initiative launched to coincide with the grand opening of the Mint Museum Uptown in October 2010. By inviting ten internationally recognized visionaries to create site-specific works, the museum assembled a collection that spans a wide array of mediums, including ceramics, metalwork, wood, and lighting design. The project initially debuted with striking installations by artists like Danny Lane and Joseph Walsh and has since expanded to include major works by creators such as Cristina Córdova and Tom Joyce. These unique commissions serve as a permanent tribute to modern innovation, ensuring that the museum's Craft and Design galleries feature world-class examples of contemporary artistry."
  },
  10: {
    title: "Portals to the Past: British Ceramics 1675-1825",
    image: "https://www.mintmuseum.org/wp-content/uploads/2023/01/grief-dear-eliza-1000x563.jpg",
    text: "The Mint Museum houses a highly regarded collection of 18th-century British ceramics, featuring over 2,000 pieces that showcase the exceptional craftsmanship of historic factories like Chelsea and Worcester. Visitors can explore more than 200 highlights from this collection in the Portals to the Past exhibition at Mint Museum Randolph, where objects are organized by themes such as manufacturing technique and daily function. The display integrates pottery and porcelain with era-appropriate fashion, silver, and furniture to provide a complete picture of the period. To make the experience more engaging, the exhibition includes interactive mystery cases where guests can use their phones to solve puzzles about specific items. This presentation, supported by the Delhom Service League, celebrates the 50th anniversary of the museum's acquisition of the foundational Delhom Collection and is accompanied by a detailed scholarly catalogue."
  },
  11: {
    title: "Mint Around Town",
    image: "https://www.mintmuseum.org/wp-content/uploads/2023/01/suntarget-john-henry__524x0_q85_subsampling-2-jpg.webp",
    text: "The Mint Museum maintains a long-standing commitment to public art by placing significant pieces from its collection throughout the Charlotte area. These installations extend the museum’s reach beyond its traditional galleries, making world-class art accessible in everyday environments. Notable examples of these public works can be found in various high-traffic locations, ranging from the center of the Uptown business district to the campus of the University of North Carolina at Charlotte. By integrating these objects into the fabric of the city, the museum ensures that art remains a constant presence in the lives of residents and students alike."
  },
  12: {
    title: "Interventions",
    image: "https://www.mintmuseum.org/wp-content/uploads/2023/10/xxMMR_IrisolGonzales_2021_3_o3-1000x667.jpg",
    text: "The Interventions initiative at Mint Museum Randolph intentionally positions modern artworks within the museum’s permanent collection galleries to bridge the gap between historical and contemporary perspectives. By using these artistic placements as a catalyst for new dialogue, the program aims to deepen cultural engagement and provide fresh insights into the diverse cultures that shape both the local community and the nation. These installations encourage visitors to see traditional works through a modern lens, fostering a continuous conversation between the creators of the past and the artists of today."
  },
  13: {
    title: "MINT5pace",
    image: "https://www.mintmuseum.org/wp-content/uploads/2023/02/mint5pace_header@2x-jpg-1000x682.webp",
    text: "MINT5pace, located on the fifth level of Mint Museum Uptown, serves as a dynamic platform for both artists and curators to realize their creative visions within a professional museum environment. By opening this dedicated area to public submissions, the museum seeks to fully activate its architectural footprint while offering creators a valuable opportunity to gain hands-on experience in exhibition design and installation. This initiative functions as an educational and experimental springboard, allowing local and visiting talent to bridge the gap between concept and gallery presentation while engaging directly with the museum's audience."
  },
  14: {
    title: "Foragers",
    image: "https://www.mintmuseum.org/wp-content/uploads/2023/01/Summer_Wheat_Foragers-2-1024x834-1-1000x814.webp",
    text: "Summer Wheat’s Foragers is a breathtaking four-story installation that transforms the 96 windows of the Mint Museum Uptown’s atrium into a massive 3,720-square-foot narrative. Using vibrant panels that create a stunning stained-glass effect, the Brooklyn-based artist pays tribute to the vital and often-unrecognized labor of women who serve as the foundation of modern society. Originally launched in 2020 as part of the In Vivid Color exhibition alongside other color-focused contemporary artists, this monumental work is fully integrated into the Robert Haywood Morrison Atrium, allowing the public to experience its kaleidoscopic beauty and powerful storytelling entirely for free."
  },
  15: {
    title: "Native American Art",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/03/Siamese-Twins-1000x563.jpg",
    text: "The Mint Museum's Native American art collection features an extensive array of modern and contemporary works from North and Central America, spanning from the 19th century to the present. These pieces highlight how artistic expression has been vital in maintaining cultural identity and spiritual values through centuries of colonization and hardship. At the center of this exhibit is the Grice Collection, which includes traditional Maya textiles from Guatemala and Mexico, ceremonial performance masks, early basketry from Northern California, and distinctive pottery from the American Southwest. Donated by Gretchen and Nelson Grice, the collection is particularly significant for its inclusion of early works by Indigenous artists who later achieved international acclaim, serving as a powerful testament to the resilience and evolving creativity of Native cultures."
  },
  16: {
    title: "Special Collections",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/02/IMG_0027-Enhanced-NR-1000x667.jpg",
    text: "The Special Collections of The Mint Museum Library and Archives feature a rare assembly of materials dating from the 17th to the 21st century, providing essential context for the museum's broader art collections. These \"hidden collections\" are split into two primary categories: the Library Special Collections, which house fragile or scarce items like first editions, limited edition artist books, and historic decorative arts texts, and the Museum Archives, which preserve unique institutional records, including photographs, scrapbooks, and archival videos. To ensure the preservation of these rare items, they are kept separate from the general library holdings but are regularly rotated into public view through dedicated displays at Mint Museum Randolph. Visitors are encouraged to explore these materials in person to uncover the deeper history of the museum and the artists represented within its walls."
  },
  17: {
    title: "Modern + Contemporary",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/02/SummerWheat_sun-2-2-1000x763.jpg",
    text: "The Modern and Contemporary Art collection at The Mint Museum is a dynamic and evolving assembly designed to engage with the global issues and diverse identities that define today’s world. Spanning from the mid-20th century to the present, the collection includes a wide variety of mediums such as paintings, photography, sculpture, and artist books. It also features a growing selection of new media, including digital, video, and time-based works, reflecting the museum's dedication to capturing modern stylistic innovations. By prioritizing art that resonates with the diverse and vibrant community it serves, the Mint ensures that its collection remains a vital resource for understanding significant cultural shifts and the expansive vision of artists working today."
  },
  18: {
    title: "European Art",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/02/1966.54_o3.jpg",
    text: "The Mint Museum’s European Art collection offers a captivating glimpse into the evolution of European artistic styles from the mid-18th to the early 20th centuries. This collection features a diverse array of paintings and decorative arts that capture the expansive scope of Western European aesthetics, ranging from regal depictions of royal opulence to serene pastoral scenes and luminous landscapes. Beyond reflecting the artistic trends of its time, the collection celebrates the contributions of local collectors and patrons. Many of the exceptional works on display have been generously donated by area families over the past 50 years, underscoring the deep and enduring connection between the Charlotte community and the museum."
  },
  19: {
    title: "Decorative Arts",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/02/2022.16.2_vs_o3-1-1000x563.jpg",
    text: "The Mint Museum’s Decorative Arts collection highlights the universal human connections found in the creation of beautiful objects across diverse cultures. With over 12,500 objects, the collection includes fine furniture, silver, and glass that often mirror items found in our own homes, evoking personal memories and daily routines. The primary strength of this collection is its ceramics, featuring significant examples of English and continental European wares, American pottery, and Asian porcelain. Most notably, the museum is home to the largest public collection of North Carolina ceramics in the United States, showcasing the rich regional history of the craft."
  },
  20: {
    title: "Craft + Design",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/02/Craft-and-Design-8-1000x667.jpg",
    text: "The Mint Museum’s Craft and Design collection is internationally recognized for its exceptional assembly of 20th and 21st century works, including glass, fiber art, metal, studio jewelry, furniture, and wood art. This collection also features a significant focus on clay works and North Carolina pottery, highlighting both unique handcrafted pieces and mass-produced objects that represent design excellence. Since the opening of the dedicated craft and design wing in 1999, the museum has evolved to explore how these mediums address contemporary global themes such as identity, technology, sustainability, and social justice. By collaborating with modern makers and acquiring masterworks, the museum maintains its leadership in the field and continues to document the intersection of traditional craft and innovative design."
  },
  21: {
    title: "American Art",
    image: "https://www.mintmuseum.org/wp-content/uploads/2023/01/2016.25_o3-1000x838.jpg",
    text: "The American Art collection at The Mint Museum comprises a diverse range of paintings, sculptures, photographs, and works on paper dating from the Colonial Era through World War II. Located at Mint Museum Uptown, the collection is organized into three primary areas: federal portraiture, 19th-century landscapes, and early 20th-century realism. Visitors can view the evolution of American identity through the portraits of artists like John Singleton Copley and Gilbert Stuart, or follow the shifting perspective of the American wilderness from the naturalism of the Hudson River School to the subjective style of Impressionism. The galleries also highlight the Ashcan School, a group of realists led by Robert Henri who focused on the grit and beauty of everyday life. To provide a more comprehensive historical context, these artworks are displayed alongside period furniture, ceramics, and costumes, offering a deep look into the artistic and cultural heritage of the United States."
  },
  22: {
    title: "Art of the Ancient Americas",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/02/1979.287.7_o3-1-1-1000x563.jpg",
    text: "The Art of the Ancient Americas collection at The Mint Museum is a significant archaeological assembly that preserves the extensive cultural heritage of Indigenous nations from across North, Central, and South America. Comprising more than 2,500 artworks, the collection offers a deep look into the religious, political, and daily lives of civilizations that thrived for over 4,000 years before European contact. The galleries are organized to examine these objects both as functional material culture and as masterpieces of human creativity, showcasing technical expertise in mediums like earthenware, jadeite, gold, silver, and fiber. Much of this remarkable collection was a gift from Dr. and Mrs. Francis Robicsek and stands today as one of the largest and most comprehensive of its kind in the United States, representing dozens of cultures including the Maya, Aztec, and Inca."
  },
  23: {
    title: "African Art",
    image: "https://www.mintmuseum.org/wp-content/uploads/2025/02/Arts-of-africa-gallery-1000x563.jpg",
    text: "The Mint Museum’s African Art collection includes a diverse range of sculptures, textiles, clothing, and decorative objects that highlight the historical and religious variety found across the continent. The collection is organized around three primary themes: Global Connections, Personal and Domestic Objects, and Ceremonial Masquerade. These thematic areas are designed to intersect, demonstrating how a single object can serve multiple roles in society, from a functional household item to a centerpiece of a ceremonial performance. By showcasing a variety of styles and materials produced since the late 19th century, the exhibition helps visitors understand the cultural significance and artistic innovation inherent in African craftsmanship."
  },
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

handleScroll();