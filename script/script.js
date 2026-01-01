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
    title: "Gamin - Augusta Savage",
    image: "images/gamin.png",
    text: "Savage used her skills of pride, inquisitiveness, and self-confidence to create artifacts of young people struggling for survival in New York during the 1920’s. Savage’s best art piece is called Gamin. It was one of the most famous art pieces that represented the Harlem Renaissance. Although Gamin looks like a sturdy bronze bust it is actually made of carefully-painted plaster. Surviving examples in untouched condition like this one are quite rare, for plaster is easily chipped and cracked and the fragile surface is susceptible to scuffs and abrasions. Savage was a mentor to many young artists, including Romare Bearden. Late in his life, Bearden recalled that Savage was an inspiring role model: she was \"open, free, resisted the usual conventions of the time, and lived for her art, thinking of success only in terms of how well her sculptures turned out.\""
  },
  2: {
    title: "American Lake Scene - Thomas Cole",
    image: "images/americanlakescene.png",
    text: "Thomas Cole believed American landscape painters had special advantages because the nation’s untouched forests, lakes, and waterfalls offered fresh, inspiring subjects. As a leading early landscape artist, he argued that nature itself could be the main focus of a painting, reflecting Americans’ growing belief in the spiritual and healing power of the natural world. In this work, Cole paints a dramatic, likely imagined, landscape alongside a single Native American figure. Instead of portraying him through common stereotypes, Cole shows the figure as thoughtful and reflective, pausing to consider the passing of time, symbolized by the setting sun."
  },
  3: {
    title: "Cambodian Head - Malvina Hoffman",
    image: "images/cambodianhead.png",
    text: "Malvina Hoffman first trained in New York under well-known sculptor Gutzon Borglum, creator of the Mount Rushmore faces, and later studied in Paris with the famous French sculptor Auguste Rodin. This bust connects to what is likely her most famous project, The Races of Mankind, a series of 105 life-size sculptures representing different world cultures, commissioned by Chicago’s Field Museum in 1930—the largest bronze sculpture commission ever at the time. Although Hoffman was praised during her career, her work later faced criticism for relying on cultural stereotypes. However, when viewed in the context of her era, pieces like Cambodian Head can be seen as her effort to highlight the beauty, dignity, and shared humanity of people from around the world."
  },
  4: {
    title: "The Stone Cottage, Old Lyme - Childe Hassam",
    image: "images/stonecottage.png",
    text: "Childe Hassam, considered one of the most important American Impressionists alongside Theodore Robinson and William Merritt Chase, was a leading member of The Ten, a group formed in 1898 to challenge the traditional judging of the National Academy of Design, much like the French Impressionists had rejected the Paris Salon years earlier. In The Stone Cottage, painted during his first visit to Old Lyme, Connecticut in 1903, a town that soon became a favorite summer spot for artists. Hassam’s long experience with Impressionism is clear in his light, confident brushstrokes, his soft blue-and-green color palette, and his use of untouched canvas to capture the natural tones of the stone walls."
  },
  5: {
    title: "Husbandry Aided by Arts and Commerce - Benjamin West",
    image: "images/husbandryaided.png",
    text: "Despite the limited artistic training and inspiration available in 18th-century America, Benjamin West showed remarkable talent from a young age, enough that in 1760 two Philadelphia patrons funded his trip to Italy to study the Old Masters. He later settled in England in 1763, where he quickly gained the support of King George III and Queen Charlotte and was appointed Historical Painter to the King in 1772. In addition to being a skilled artist, West became an influential teacher whose students included major American painters such as Charles Willson Peale, Gilbert Stuart, John Trumbull, and Thomas Sully. Among his commissions for King George III was designing nine ceiling panels for the Queen’s lodge at Windsor Castle, and this painting is one of three surviving oil sketches for that project. The allegory of Agriculture, which this sketch represents, was especially appreciated by the King, who fondly referred to himself as “Farmer George.”"
  },
  6: {
    title: "Moonlight - Elliot Daingerfield",
    image: "images/moonlight.png",
    text: "In the early 1900s, people were still highly interested in landscape painting, and many artists continued to draw inspiration from the natural world. However, the precise, detailed approach valued by the previous generation shifted toward looser brushwork and more creative freedom. During this time, Impressionism and Tonalism became the dominant styles. Tonalism emphasized the idea that the mood and poetic beauty of nature mattered just as much as accurate details or exact realism. Because of their soft, unified colors, sunrise and sunset were favorite subjects for Tonalist painters such as Elliot Daingerfield, who spent much of his career working in the mountain town of Blowing Rock."
  },
  7: {
    title: "Circumcision of Christ from \"Life of the Virgin\" - Hendrick Goltzius",
    image: "images/circumcisionofchrist.png",
    text: "This engraving comes from Hendrick Goltzius’s series The Life of the Virgin, created between 1593 and 1594. For each print, Goltzius deliberately copied the style of a different artist, and this particular work imitates the famous German master Albrecht Dürer. His exceptional skill as an engraver is evident in the subtle tones he created by varying the thickness of his lines. His achievements are even more impressive considering that his right hand had been injured and left crippled early in his life."
  },
  8: {
    title: "Carnival Scene - George Benjamin Luks",
    image: "images/carnivalscene.png",
    text: "Like other members of the Ashcan School, George Luks became well known for painting the people and streets of lower Manhattan. Of the group, he was probably the one who portrayed these subjects in the roughest and most direct way. Luks had a bold, fiery personality, he drank heavily, caused trouble, and preferred depicting the tough, everyday lives of immigrants and loners rather than the wealthy. In 1918, he created Blue Devils on Fifth Avenue, a painting of French veterans marching in New York, for an exhibition supporting the Allied cause in World War I; that work is now in the Phillips Collection in Washington, D.C. The Mint Museum’s Carnival Scene, which features people wearing similar blue military uniforms along with French flags, was likely made as a companion or related piece."
  },
  9: {
    title: "George Washington Surrendering His Commission - Francis B. Mayer",
    image: "images/georgewashingtonsurrendering.png",
    text: "This painting, along with the one displayed beside it, reflects America’s deep interest in its early history and in influential Colonial-era figures like George Washington. This interest was part of a larger cultural movement known as the Colonial Revival, which peaked in the 1920s with the creation of fully reconstructed historic villages such as Colonial Williamsburg. Both paintings, made around the turn of the 20th century, show key moments in Washington’s life. Francis Mayer, a skilled painter and illustrator, chose to mark the 100th anniversary of Washington’s 1783 resignation as Commander in Chief, an event that reinforced civilian authority over the military. Six years later, in 1789, Washington became the nation’s first president, a moment captured in Howard Pyle’s painting. Pyle, one of America’s leading illustrators alongside N.C. Wyeth, depicts a hesitant Washington taking on the leadership of the young country. In his journal, Washington admitted his anxiety, writing that as he left Mount Vernon to begin his presidency, he did so “with a mind oppressed with more anxious and painful sensations than I have words to express,” yet determined to serve his country despite his doubts."
  },
  10: {
    title: "Rollage - Jiri Kolar",
    image: "images/rollage.png",
    text: "Jiri Kolar, both an artist and a writer, was a controversial figure in the Czechoslovakian avant-garde during the mid-twentieth century. Some of his works were censored in the 1930s and 1960s, and he was even briefly imprisoned after police discovered an anti-Communist manuscript he had written. His collage art often made by cutting images into strips and rearranging them with pieces from other pictures has been seen as a reflection of the fragmentation, distortion, and upheaval he faced throughout his difficult life. Working with a scalpel and magazine images, Kolar developed several collage methods, including rollage, a technique in which alternating strips from two different images are combined, making it challenging for the viewer to focus on either one."
  },
  11: {
    title: "Portrait of Isaac Gouverneur - Gilbert Stuart",
    image: "images/isaacgouverneur.png",
    text: "Isaac Gouverneur, a British citizen living in New York, supported colonial independence by providing military supplies in 1775. His actions led to his arrest for treason and imprisonment in England, though he eventually returned to New York as a celebrated patriot. This large mid-19th-century presentation pitcher, displayed across from the Stuart painting, was produced by Charles Cartlidge and Company, the first major porcelain manufacturer in Greenpoint, Brooklyn. Such grand objects were typically commissioned to honor prominent individuals or historical events; this specific piece was made for the Governor of New York. The decorative scheme is rich with symbolism, featuring oak leaves and acorns to represent strength, while a patriotic eagle and a red, white, and blue shield form the spout."
  },
  12: {
    title: "Irish Chain Quilt - Sallie W. Snyder",
    image: "images/irishchainquilt.png",
    text: "The Irish Chain quilt is a classic example of how simple geometry can create a complex visual effect through the clever use of both piecing and appliqué. The design centers on a block made of a five-by-five grid of red, green, and white squares, which alternates with a solid white block of the same size. The \"secret\" to the pattern’s continuous look is that a small red square is appliquéd onto each corner of the plain white blocks; when joined, these elements align to form a vibrant, interlocking diagonal lattice. Interestingly, the quilt’s history is hidden on its reverse side, which features a \"cretonne\" backing, a sturdy, roller-printed fabric that surged in popularity during the late 19th century. This specific backing, adorned with pastoral scenes of tennis players and children, is characteristic of the textiles produced by New England’s Cocheco and Merrimack mills in the 1880s, providing a definitive link to the era of its creation."
  },
  13: {
    title: "Computer Series - Richard Landis",
    image: "images/computerseries.png",
    text: "Drawing inspiration from the geometric abstraction of Kandinsky and Mondrian, as well as the intricate patterns of Moorish tilework and the textile innovations of Anni Albers, Landis developed a sophisticated artistic voice through the medium of the loom. His work focuses on the technical precision of loom-controlled weaving to produce fabrics of immense structural detail. During the 1970s, he explored the mathematical limits of his craft by creating double-weave hangings that mapped out every potential color combination within a set warp and weft grid. A decade later, he refined this systematic approach, drastically reducing the scale while heightening the complexity of the weave. The resulting compositions are characterized by a rigorous, tight control that simultaneously produces a vibrant and rhythmic visual energy."
  },
  14: {
    title: "Baltimore Album Quilt - Catherine B. Hooper",
    image: "images/baltimorealbumquilt.png",
    text: "Emerging from the economic prosperity of 1840s Baltimore, the Baltimore Album quilt represents the pinnacle of mid-19th-century appliqué, distinguished by its use of pristine, new fabrics rather than traditional scraps. This particular masterpiece was crafted by Catherine Bell Hooper, the wife of a major textile mill owner, which granted her unique access to high-quality materials from her husband’s Mount Vernon Mills. The quilt’s design features a central Bible block embroidered with Hooper’s initials, surrounded by twenty-four blocks filled with a vibrant array of stylized floral arrangements including bouquets, wreaths, and baskets that symbolize the lush gardens of a wealthy city. Framed by a classic 1850s border of red-and-green swags and bows, the consistency of the fabric and the single set of initials suggest that this intricate work was the sole creation of Catherine herself, rather than a group effort. These quilts often served as complex visual records of the era, frequently incorporating local landmarks, war heroes, and civic monuments into their distinctive, layered pictorial style."
  },
  15: {
    title: "Pipe Dream - John Cederquist",
    image: "images/pipedream.png",
    text: "John Cederquist bridges the gap between traditional craftsmanship and surrealist art by creating functional furniture that draws heavily from Japanese woodblock prints, Popeye cartoons, and modern iconography to deceive the viewer’s eye. His work is defined by masterfully constructed illusions that challenge our spatial perception, as seen in his piece Pipe Dream, where a swordfish appears to burst through a spiraling pipe of surging water with intense, kinetic energy. While the piece looks like a three-dimensional sculpture or a flat graphic illustration, it is actually a meticulously engineered chest; its drawers are disguised as a complex puzzle that fits together so seamlessly that the furniture’s utility is nearly invisible when viewed from the front."
  },
  16: {
    title: "Lotus Necklace #3 - Linda MacNeil",
    image: "images/lotusnecklace.png",
    text: "Linda MacNeil created Lotus Necklace #3 as one of a pair of pieces in the Mint Museum’s collection that draw stylistic inspiration from the art of ancient Egypt. Much like its counterpart, Nile Midnight, this piece features a lotus flower rising from a V-shaped base, with the natural form simplified into clean, geometric shapes. MacNeil’s fascination with the plant stems from the vivid contrast between its jewel-like blossoms and the bright green pads they rest upon. Although she has incorporated glass into her jewelry designs since the late 1970s, this specific necklace was produced at the Waterford Crystal factory in Ireland while she was visiting during an artist residency held by her husband, Dan Dailey."
  },
  17: {
    title: "Royal Blue Mint Chandelier - Dale P. Chihuly",
    image: "images/bluechandelier.png",
    text: "Dale Chihuly stands as an exceptionally influential figure in the world of glass art, known for his ability to mesmerize global audiences with his diverse range of sculptures, vessels, and massive installations. His artistic style is defined by its sense of movement, intricate fragility, and bold presentation. The Royal Blue Mint Chandelier is a perfect representation of these traits. This hanging work features a natural, organic form with reaching glass tendrils, and it is meticulously constructed from about 318 individual pieces of hand-blown glass in shades of blue and clear."
  },
  18: {
    title: "Lilies of the Valley - Mark Peiser",
    image: "images/liliesofthevalley.png",
    text: "Widely appreciated across Europe and North America for their fragrant, bell-shaped white blossoms, lilies of the valley serve as the inspiration for this elegant work by Mark Peiser. Created between 1976 and 1981, this piece is part of his celebrated Paperweight Vases collection, which drew creative influence from the natural scenery surrounding his studio in Penland, North Carolina. To achieve such lifelike detail, Peiser utilized a torch to shape glass canes into delicate floral components, which he then carefully arranged onto multiple layers of molten glass. The process of blowing the glass added a sense of three-dimensional realism, making the floral imagery appear to have actual depth. As a pioneer of the studio glass movement, Peiser established this series as a significant contribution to contemporary glass art."
  },
  19: {
    title: "Carolina Bouquet Botanical - Paul Stankard",
    image: "images/carolinaboquet.png",
    text: "Paul Stankard creates glass paperweights that serve as detailed sculptures exploring the natural cycle of existence, from vitality to decomposition. His piece titled Carolina Bouquet Botanical features regional flora like the lady’s slipper, blueberry, and mountain laurel, accompanied by a honeybee to signify the necessity of pollination. Stankard extends his focus beneath the surface to show the root systems, where he introduces elements of magical realism that reflect his personal philosophy. This includes one of his characteristic root people to symbolize life’s positive life force, contrasted by a distressed mask that conveys his grief over the passing of a friend."
  },
  20: {
    title: "Spectral Boundary - Tom Patti",
    image: "images/spectralboundary.png",
    text: "Tom Patti has achieved national recognition for his innovative approach to using industrial and architectural glass in his work. In Spectral Boundary, he examines the connection between the historical textile industry of North Carolina and modern industrial progress by fusing over thirty layers of glass, plastic, and woven fibers. A remarkable detail regarding this installation is that it was produced using the same high-pressure compression technology used to create the exterior of Stealth bombers, making the resulting panels resistant to both bullets and explosives. Originally situated at the Mint Museum of Craft + Design on North Tryon Street, the piece has since been redesigned and moved to a new location."
  },
  21: {
    title: "A Man - Cornelius J. van der Ceulen",
    image: "images/aman.png",
    text: "Although much of Cornelius Johnson van Cuelen’s younger years remains a mystery, he had established his signature artistic approach by 1627. He became a celebrated portraitist within the English royal circles, serving under the reigns of King James I, Queen Anne, and King Charles I. Starting in 1632, his work evolved to include more stylized poses and fluidly rendered clothing, which are now hallmarks of his portfolio. Eventually, by 1647, he relocated to Amsterdam where he continued his career as a portrait artist."
  },
  22: {
    title: "Untitled (Figures and Record Player) - Eva Pennink",
    image: "images/untitled1.png",
    text: "After making a name for herself as a prominent fashion photographer and model during the 1930s, Eva Pennink shifted her creative focus to collage in her later years. Her work is characterized by a playful and witty blend of classical art history and modern cultural references, using unexpected pairings to spark both humor and reflection. In 1975, her contributions to the medium were officially recognized when The Mint Museum hosted the first-ever museum exhibition dedicated to her collage work."
  },
  23: {
    title: "Untitled (Trees, Angel, Dancer) - Eva Pennink",
    image: "images/untitled2.png",
    text: "After establishing herself as a prominent fashion photographer and model in the 1930s, Eva Pennink transitioned to collage as her main artistic outlet later in life. She developed a style that playfully merged elements of art history with modern culture, creating unexpected pairings that were both witty and intellectually engaging. Her work in this medium gained formal museum recognition in 1975 when the Mint Museum organized the first solo exhibition of her collages."
  },
  24: {
    title: "Rest on the Flight Into Egypt - Francesco Zuccarelli",
    image: "images/restonflightintoegypt.png",
    text: "After honing his craft in Tuscany and Rome, Zuccarelli established himself in Venice, where his decorative landscapes gained significant traction among local collectors. His work typically relied on a consistent stylistic framework, which he personalized by incorporating various religious, historical, or mythological figures. These figures were not merely ornamental; they acted as the primary narrative tools that identified the specific theme or subject of each piece."
  },
  25: {
    title: "Boy in a Doublet - Paulus Moreelse",
    image: "images/boyinadoublet.png",
    text: "This portrait highlights the talent of Paulus Moreelse in capturing the delicate differences between textures such as fabric, skin, and metal. By carefully balancing light and shadow, he creates a sense of three-dimensional weight and presence for the subject. The straightforward approach of showing the figure at full length directs the attention toward the young man's character, portraying him as a person who is poised and certain of his high social standing."
  },
  26: {
    title: "Christ and the Samaritan Woman - Sisto Badalocchio",
    image: "images/christandsamaritan.png",
    text: "This portrait highlights the talent of Paulus Moreelse in capturing the delicate differences between textures such as fabric, skin, and metal. By carefully balancing light and shadow, he creates a sense of three-dimensional weight and presence for the subject. The straightforward approach of showing the figure at full length directs the attention toward the young man's character, portraying him as a person who is poised and certain of his high social standing."
  },
  27: {
    title: "Autobiography: East/West (Gardens) - Howardena Pindell",
    image: "images/autobiographyeastwest.png",
    text: "The account of Christ and the Samaritan woman was a popular theme for artists during the 16th and 17th centuries. Drawing from the Gospel of John, the narrative describes Christ's journey to the Samaritan city of Sychar and his encounter with a woman at Jacob's Well. The artwork captures the specific climax of their dialogue: after the woman expresses her belief in the future arrival of the Messiah, Christ reveals his identity by stating that he is the one she is speaking to."
  },
  28: {
    title: "Fear - Iva Tabakovic",
    image: "images/fear.png",
    text: "Throughout her Autobiography series, Howardena Pindell transitioned from the minimalist hole punch works of the 1970s to complex, layered collages that explore her personal history and global experiences. Following a 1979 accident that caused short-term memory loss, Pindell began using postcards from her travels in pieces like East/West (Gardens) to reconstruct her past, mimicking the brain's effort to synthesize fragmented information into a cohesive memory. This specific work reflects the sanctuary she found in Japanese gardens, where the traditional organization of space and color offered a peaceful retreat from the racism she encountered during her travels. By physically cutting and reassembling her canvases, Pindell transformed these flashes of memory into a powerful narrative of resilience and healing."
  },
  29: {
    title: "Concert - Iva Tabakovic",
    image: "images/concert.png",
    text: "Iva Tabakovic, an artist from Eastern Europe, began his professional life by producing satirical paintings that provided a critique of human nature. In his later years, he expanded his practice to include a variety of artistic formats, such as the collages seen here. These works merge imagery from disparate origins, rearranging them into surreal and sometimes unsettling hybrid figures or environments. Both of these specific collages were featured in a 1966 New York exhibition titled Life, Thoughts, Dreams. The exhibition catalogue characterized his art as a secondary universe that runs parallel to our own, emphasizing the complex relationship between the tangible physical world and the internal realms of emotion and thought."
  },
  30: {
    title: "Cubomania - Jiri Kolar",
    image: "images/cubomania.png",
    text: "Jiri Kolar was a prominent and provocative member of the Czechoslovakian avant-garde throughout the mid-twentieth century. His career was marked by political conflict; his work faced bans in both the 1930s and 1960s, and he served a short prison sentence after authorities discovered his anti-Communist writings. Kolar expressed the chaos and fragmentation of his life through unique collage methods where he used a scalpel to slice magazine images into strips. One of his most notable inventions was a technique called rollage, which involves alternating strips from two different pictures. This process creates a visual tension that prevents the viewer from easily focusing on a single subject, effectively mirroring the distortion and destruction Kolar witnessed during his era."
  },
  31: {
    title: "Of the Blues: Carolina Shout - Romare H. Bearden",
    image: "images/carolinashout.png",
    text: "Romare Bearden titled this work after a jazz recording by James P. Johnson, yet the imagery focuses on the religious ritual of baptism. This combination of secular and sacred themes has led some to view the piece as controversial. Bearden, who drew constant inspiration from both ceremony and sound, recognized the profound ties between these two worlds. He understood that jazz music grew directly from the foundations of gospel music, and his work highlights the cultural bridge where musical expression and religious practice meet."
  },
  32: {
    title: "Night Wing - Anne Truitt",
    image: "images/nightwing.png",
    text: "Anne Truitt explored the interaction of color and light through simple three dimensional shapes, sharing some conceptual ground with Minimalists but preferring traditional hand craftsmanship over industrial methods. Her sculptures often functioned as a bridge between painting and sculpture, inspired by childhood memories of fences and trees seen through poor eyesight that rendered the world as soft masses of color. This early perspective influenced her desire to set color free into space, creating works that lack identifying markers and focus on pure form. By using a recessed base that made her columns appear to float, she encouraged viewers to experience the work as an ethereal presence rather than a heavy material object."
  },
  33: {
    title: "LandScape With Trees and Dandelions - Charles E. Burchfield",
    image: "images/landscapewithtreesanddandelions.png",
    text: "Charles Burchfield’s artistic journey is generally categorized into three distinct phases, beginning with an early focus on childhood wonder and symbolic nature (1915-1921), followed by a more commercially successful period of Midwest Regionalism (1921-1943), and concluding with a return to the spiritual and mystical themes of his youth. His 1945 quote reflects this final stage, where his primary goal shifted from mere depiction to expressing a deeply personal mood. A prime example of this mature style is Landscape with Trees and Dandelions, a large-scale watercolor that utilizes a vibrant palette of blues, greens, and yellows to evoke the heat of summer. In this work, Burchfield captures the invisible vitality of the environment through \"quivering\" and \"zig-zagging\" lines, transforming a simple field of dandelions into a rhythmic, humming display of natural energy."
  },
  34: {
    title: "Jack-in-a-Box - Gene Davis",
    image: "images/jackinabox.png",
    text: "Gene Davis was a key figure in the Washington Color School who focused on hard-edged geometric works centered on color intervals. In his painting Jack-in-Box, he used uniform vertical stripes to create a sense of rhythm and motion across the canvas through a detailed yet balanced arrangement of hues. Davis suggested that the best way to experience his art is to pick one specific color and follow its repetition and placement throughout the entire composition. He believed that by entering the work through a single color door, a viewer could truly grasp the complex relationships and visual energy he intended to convey."
  },
  35: {
    title: "No. 9, A Force of Small, Line No. 2 - Kojo Griffin",
    image: "images/aforceofsmall.png",
    text: "In his work titled No. 9, A Force of Small, Line No. 2, Kojo Griffin draws inspiration from I Ching hexagrams to explore how different states of being and ideas are interconnected. This piece functions as a psychological portrait or parable, using a central blue figure to represent the self amidst a variety of universal themes related to emotion and childhood. Griffin overlays the composition with a network of cogs and gears to symbolically link these concepts, while DNA helices and turtles represent human universality and the power of patience. While the work appears to be a traditional painting, it is actually a mixed media piece where the central figure and turtles are collaged into a background filled with stamped, drawn, and painted elements."
  },
  36: {
    title: "Middle Passage - Radcliffe Bailey",
    image: "images/middlepassage.png",
    text: "In his work Middle Passage, Radcliffe Bailey incorporates heavy symbolism to address the historical and personal experiences of African Americans. The title directly references the traumatic journey of enslaved people across the Atlantic, while the physical components of the assemblage offer a narrative of both struggle and resilience. Bailey uses chain links to represent the enduring strength found in community and family, and an axe head to evoke Shango, the Yoruba god of thunder. The intricate patterns on the axe head serve as a tribute to traditional African ritual scarification. By hanging urns from a dormant tree, Bailey references the Southern African American tradition of bottle trees, which are believed to capture spirits or bring good fortune. Through this complex three-dimensional collage, Bailey transforms objects associated with aggression into a powerful statement on cultural transcendence and pride."
  },
  37: {
    title: "Still Life With Flowers and Eggplant - Robert De Niro, Sr.",
    image: "images/stilllifewithflowersandeggplant.png",
    text: "Robert De Niro Sr. demonstrated the enduring impact of Abstract Expressionism through his energetic use of line and vibrant color, characterized by visible and expressive brushwork. While he maintained a deep respect for historical art traditions, he applied these influences to classic subjects such as the human figure, landscapes, and still lifes to create a style that felt both timeless and modern. His approach was deeply personal and rooted in emotional honesty; he often cited Pablo Picasso’s belief that painting is love made visible, suggesting that the primary purpose of his creative process was the outward expression of that affection and passion."
  },
  38: {
    title: "Grid Five - Thomas Downing",
    image: "images/gridfive.png",
    text: "Thomas Downing approached painting as a disciplined pursuit of timelessness, a process defined by rhythmic repetition and a deep focus on subtle changes. As a key figure in the Washington Color School, he spent his career exploring the relationship between color and the circular form. In Grid Five, Downing arranges uniform circles within a structured layout, using shifts in hue and pattern to demonstrate his belief in the enduring power of simple, repeated geometry."
  },
  39: {
    title: "Amerika IX - Tim Rollins, K.O.S. and Kids of Charlotte",
    image: "images/amerikaix.png",
    text: "In 1981, Tim Rollins began a teaching career in the South Bronx that focused on merging artistic creation with educational development, leading to the formation of K.O.S., or Kids of Survival. This collaborative team of student artists became known for painting directly onto pages from classic European literary and art historical texts, a process exemplified by the series based on Franz Kafka’s novel Amerika. The imagery of golden horns used in these works was inspired by a specific passage in the book, prompted by Rollins’ question to his students about what kind of instrument would represent their own dignity, freedom, and future. For Amerika IX, Rollins and K.O.S. partnered with local youth in Charlotte, allowing the unique perspectives and sensibilities of those students to influence the final collaborative composition."
  },
  40: {
    title: "Bulb XIV - Alice B. Munn",
    image: "images/bulbxiv.png",
    text: "Alice Ballard Munn uses ceramic art to capture and memorialize the fleeting beauty found in nature. In Bulb XIV, she transforms a simple garlic bud into a large scale sculpture, inviting viewers to appreciate its elegant, curving lines which mirror the three dimensional shape of a buta, a traditional floral motif from Indian and Persian art. Based in South Carolina, Ballard Munn finds her creative inspiration in the everyday flora of her own garden and local surroundings, with a particular focus on how living organisms evolve and shift their shapes. Bulb XIV captures a specific moment in this life cycle, appearing frozen in a state of active growth as it begins to release the green shoots that signal its transition into a new plant."
  },
  41: {
    title: "Pot - Felipe Ortega",
    image: "images/pot.png",
    text: "Felipe Ortega pushes the limits of standard pottery ornamentation by incorporating horse hair into the creation of his vessels. By applying the hair to the surface of the clay just before the firing process, he allows the strands to burn away, leaving behind carbonized markings. These dark, winding lines serve to emphasize the natural and fluid shapes of his pottery."
  },
  42: {
    title: "“Floating Heel” Evening Shoes - Joseph LaRose",
    image: "images/floatingheel.png",
    text: "The floating heels concept was officially patented by Martin Freidman in 1956, introducing a design that eliminated the traditional vertical heel post. By utilizing a cantilevered sole and a reinforced mid-sole cast from metal, the structure provided enough strength to suspend the wearer's heel in the air while supporting their full body weight. This engineering feat created a striking visual gap between the back of the shoe and the ground."
  },
  43: {
    title: "“Kabuki” Shoes - Beth Levine",
    image: "images/kabukishoes.png",
    text: "Drawing inspiration from the traditional wooden footwear of Japan, the Kabuki shoe takes its name from the country’s classic theatrical style. The shoe’s streamlined shape was intended to create the impression that the wearer was floating, particularly in the models that utilized platforms made of black lacquered wood. This effect eventually led designer Beth Levine to remark that the style might have been better suited to the name airplane pumps. Innovative and unconventional structures like these were a hallmark of the footwear produced by Beth and Herbert Levine throughout the 1960s, 70s, and 80s."
  },
  44: {
    title: "“Gillie” Platform Shoes - Vivienne Westwood",
    image: "images/gillieshoes.png",
    text: "Vivienne Westwood is considered one of the most significant and creative figures in British fashion history. Her bold designs gained worldwide attention in 1993 through her extreme Gillie platform shoes, which served as the inspiration for this specific model. These shoes became famous when supermodel Naomi Campbell lost her balance and fell during a runway show while wearing a pair that featured four-inch platforms and eight-inch heels."
  },
  45: {
    title: "Wedding Dress Ensemble - Maria M. Gallenga",
    image: "images/weddingdress.png",
    text: "Maria Maria Gallenga utilized stenciled patterns on silk velvet, drawing creative influence from historical Medieval and Eastern textile motifs. Her work often drew comparisons to the designs of Mariano Fortuny y Madrazo, who stood as the preeminent figure in Venetian fashion throughout the first several decades of the 1900s."
  },
  46: {
    title: "Gentleman's Dress Suit - Schloss Brothers",
    image: "images/gentlemansdresssuit.png",
    text: "Starting in the 1880s, the three-piece suit emerged as the definitive daily ensemble for men, maintaining a consistent silhouette of a matching jacket, vest, and trousers well into the 20th century. While this \"ditto suit\" provided a uniform look for business and leisure, men expressed their personal style through subtle tailoring details, such as choosing between single or double-breasted vests, selecting specific pocket shapes, or opting for three versus four-button coat closures. Although navy and black were the standard colors for professional life, specialized variations were also crafted for athletics, formal events, and domestic relaxation. This shift toward standardized menswear coincided with the birth of the Belk retail empire; William Henry Belk opened his initial bargain shop in Monroe, North Carolina, in 1888, eventually partnering with his brother John to form the Belk Brothers Company and expanding into the Charlotte market by 1895."
  },
  47: {
    title: "Evening Dress With Sash - St. Joseph's",
    image: "images/eveningdresswithsash.png",
    text: "Modern corset engineering shifted away from extreme waist constriction, instead producing a single, rounded silhouette across the chest known as a monobosom. This new design elongated the torso, creating a sleek line that extended from the bustline down to the hips. On this specific dress, the bodice hangs low in the front, partially obscuring the waist sashes. The sleeves reach three-quarters of the way down the arm and are finished with ornamental lace, while the back of the skirt extends into a graceful train."
  },
  48: {
    title: "Fifteen-Gallon Masonic Jar - John A. Craven",
    image: "images/fifteengallonmasonicjar.png",
    text: "The Craven family represents one of the most influential lineages in North Carolina’s pottery history, a tradition that started with Peter Craven following his move to the state around 1745. Generations later, John Anderson Craven and his three siblings, Thomas Wesley, Jacob Dorris, and William Nicholas, were trained in the craft by their father, Reverend Anderson Craven. While his brothers eventually established their own independent workshops upon becoming adults, John Anderson maintained a lifelong professional partnership with his father."
  },
  49: {
    title: "Jug - Samuel Bell",
    image: "images/jug.png",
    text: "The earliest known agate wares, dating approximately from 1729 to 1744, were discovered during excavations at Samuel Bell’s Lower Street potworks, located on the former site of the Old Pomona Inn in Newcastle-under-Lyme. Although Bell secured a patent in 1729 for making red marble stone ware, which was notably characterized by a deep and ruby-like gloss, he was part of a broader landscape of contemporaneous potters also experimenting with red agate techniques. Despite the stoneware terminology in his patent, physical evidence from the site reveals that Bell was actually producing high-quality and twice-fired lead-glazed earthenware. This transition was pivotal for the Staffordshire pottery industry, as Bell’s use of lathe-turning to refine the marbled patterns of blended clays predated the industrial refinements later popularized by masters like Thomas Whieldon and Josiah Wedgwood."
  },
  50: {
    title: "“Southern Pines” Vase - Newcomb Pottery, Anna F. Simpson, Joseph Meyer",
    image: "images/southernpinesvase.png",
    text: "The Newcomb and Rookwood potteries served as prime examples of the American Arts and Crafts Movement through their commitment to craftsmanship, hand-painted decorations, and simple forms. Both firms employed decorators who drew inspiration from popular styles in the fine arts world, most notably Tonalism during the early 20th century. The artists who decorated the vases in this collection were clearly influenced by this movement, as each piece features a design inspired by the hushed colors and suffused light characteristic of Tonalist paintings. Visitors interested in seeing more examples of American ceramics from the Arts and Crafts period can visit the Mint Museum Randolph."
  }
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