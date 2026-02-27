// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0
    );
}

// Function to handle scroll events
function handleScroll() {
    const animatedElements = document.querySelectorAll('.animated-element');
  
    animatedElements.forEach(element => {
      if (isInViewport(element)) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0px)';
      } else {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
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

// Get the ID from the URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Attach the handleScroll function to the scroll event
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);

function toggleMenu() {
    document.querySelector('.main_heading')?.classList.toggle('show');
    document.querySelector('.content_page_heading')?.classList.toggle('show');
}

function proceedToGetTickets() {
    const checkboxes = document.querySelectorAll('input[name="ticketType"]');

    const ticketInfo = {
        "BechtlerMembers": { name: "Bechtler Members Ticket", price: 0, idRequired: false },
        "Youth": { name: "Youth Ticket (18 and under)", price: 0, idRequired: false },
        "Adult": { name: "Adult Ticket", price: 15, idRequired: false },
        "CollegeStudent": { name: "College Student Ticket", price: 10, idRequired: true },
        "Teacher": { name: "Teacher Ticket", price: 10, idRequired: true },
        "Senior": { name: "Senior Ticket (65+)", price: 10, idRequired: true },
        "CollegeArtStudent": { name: "College Art Student Ticket", price: 0, idRequired: true }
    };

    const purchasedTickets = [];
    let totalPrice = 0;

    for (const checkbox of checkboxes) {
        if (!checkbox.checked) continue;

        const info = ticketInfo[checkbox.value];

        // ID check if required
        if (info.idRequired) {
            let hasID = "";
            while (true) {
                hasID = prompt(`The "${info.name}" ticket requires an ID. Do you have one? (yes/no)`);
                if (hasID === null) {
                    alert("Purchase cancelled.");
                    checkboxes.forEach(cb => cb.checked = false);
                    return;
                }
                hasID = hasID.trim().toLowerCase();
                if (hasID === "yes" || hasID === "no") break;
                alert('Please enter "yes" or "no".');
            }

            if (hasID === "no") {
                alert(`You cannot buy the "${info.name}" ticket without an ID.`);
                continue;
            }
        }

        // Quantity prompt for all tickets (allow 0)
        let quantity;
        while (true) {
            const input = prompt(`How many "${info.name}" tickets do you want?`);
            if (input === null) {
                alert("Purchase cancelled.");
                checkboxes.forEach(cb => cb.checked = false);
                return;
            }
            quantity = parseInt(input);
            if (!isNaN(quantity) && quantity >= 0) break;
            alert("Please enter a valid number 0 or greater.");
        }

        purchasedTickets.push({ name: info.name, quantity: quantity, price: info.price });
        totalPrice += info.price * quantity;
    }

    // Filter out tickets with quantity 0
    const finalTickets = purchasedTickets.filter(ticket => ticket.quantity > 0);

    if (finalTickets.length > 0) {
        let summary = "You have successfully bought the following tickets:\n\n";
        finalTickets.forEach(ticket => {
            summary += `- ${ticket.quantity} x ${ticket.name} ($${ticket.price} each)\n`;
        });
        summary += `\nTotal Price: $${totalPrice}`;
        summary += `\n\nThank you for your purchase!`;
        alert(summary);
    } else {
        alert("You didn't buy any tickets.");
    }

    // uncheck all at the end
    checkboxes.forEach(cb => cb.checked = false);
}

function BecomeMember() {
    const membership = prompt("Which membership do you want?\n\n- Contributor Membership for $60/year\n- Supporter Membership for $100/year\n- Signature Membership for $250/year\n- Champion Membership for $500/year\n\nType 'Contributor', 'Supporter', 'Signature', or 'Champion' to select a membership (case does not matter).");
    if (membership === null) return;

    const validMemberships = ["Contributor", "Supporter", "Signature", "Champion"].map(m => m.toLowerCase());
    if (!validMemberships.includes(membership.toLowerCase())) {
        alert("Invalid membership selection. Please enter 'Contributor', 'Supporter', 'Signature', or 'Champion'. If you don't want to become a member, click 'Cancel'.");
        return BecomeMember();
    }

    alert(`You have successfully bought a ${membership.toLowerCase()} membership! Thank you for your purchase!`);
}

// Call on page load
handleScroll();