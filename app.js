// FG Property Web Application Logic
document.addEventListener("DOMContentLoaded", () => {
    // 1. Enriched Property Portfolio Data
    const properties = [
        {
            id: 832,
            title: "Spacious Family Residence",
            city: "Lenasia",
            price: 1500000,
            bedrooms: 4,
            bathrooms: 3,
            area: 320,
            type: "house",
            badge: "Exclusively Listed",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
            desc: "A comfortable and low-maintenance multi-level residence featuring an additional outbuilding, perfect for multi-generational living or immediate lease opportunities."
        },
        {
            id: 831,
            title: "Charming Cottage Residence",
            city: "Crosby",
            price: 1195000,
            bedrooms: 3,
            bathrooms: 2,
            area: 210,
            type: "house",
            badge: "Exclusively Listed",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            desc: "A beautiful family home with historic character and solid brick design. Includes a private guest cottage in a high-demand suburb close to primary amenities."
        },
        {
            id: 830,
            title: "Cozy Starter Apartment",
            city: "Mayfair",
            price: 1100000,
            bedrooms: 3,
            bathrooms: 2,
            area: 110,
            type: "apartment",
            badge: "Premium Offer",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
            desc: "Ideal starter home for first-time buyers seeking absolute comfort and convenient access in the heart of Mayfair."
        },
        {
            id: 829,
            title: "Modern Architectural Masterpiece",
            city: "Sandton",
            price: 3999999,
            bedrooms: 4,
            bathrooms: 3,
            area: 440,
            type: "house",
            badge: "Premium Offer",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
            desc: "Designed with structural elegance and luxury open layouts, this double-storey residence in Sandton offers panoramic skyline views and state-of-the-art finishes."
        },
        {
            id: 825,
            title: "Neat Home with Spacious Yard",
            city: "Lenasia South",
            price: 799999,
            bedrooms: 3,
            bathrooms: 2,
            area: 180,
            type: "house",
            badge: "Just Listed",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
            desc: "Set on a generous 1014 sqm plot that offers ample space, secure layout, and endless extension potential for growing families."
        },
        {
            id: 823,
            title: "Spacious Double-Storey Gated Home",
            city: "Lenasia South",
            price: 1200000,
            bedrooms: 7,
            bathrooms: 5,
            area: 480,
            type: "house",
            badge: "Just Listed",
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
            desc: "Situated in a highly secure gated community, this impressive double-storey property offers massive volume and versatility."
        }
    ];

    // DOM Elements
    const listingsContainer = document.getElementById("listings-container");
    const searchCity = document.getElementById("search-city");
    const searchType = document.getElementById("search-type");
    const searchBeds = document.getElementById("search-beds");
    const searchBudget = document.getElementById("search-budget");
    const searchBtn = document.getElementById("search-btn");

    // Modal elements
    const bookingModal = document.getElementById("booking-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const bookingForm = document.getElementById("booking-form");
    const modalPropertyTitle = document.getElementById("modal-property-title");

    // Valuation Form elements
    const evaluationForm = document.getElementById("evaluation-form");
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const step1Indicator = document.getElementById("step-1-indicator");
    const step2Indicator = document.getElementById("step-2-indicator");
    const btnNextStep = document.getElementById("btn-next-step");
    const btnPrevStep = document.getElementById("btn-prev-step");
    const successBox = document.getElementById("success-box");

    // Navbar Scroll Transition
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Render Properties Function
    function renderProperties(filteredProps) {
        if(!listingsContainer) return;
        listingsContainer.innerHTML = "";
        
        if (filteredProps.length === 0) {
            listingsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-face-frown" style="font-size: 3rem; color: var(--fg-gold); margin-bottom: 1rem; display: block;"></i>
                    <p>No sanctuaries found matching your criteria. Try adjusting filters.</p>
                </div>
            `;
            return;
        }

        filteredProps.forEach(prop => {
            const card = document.createElement("div");
            card.className = "listing-card";
            card.innerHTML = `
                <div class="listing-img-box">
                    <img src="${prop.image}" alt="${prop.title}">
                    <span class="listing-badge">${prop.badge}</span>
                </div>
                <div class="listing-content">
                    <div class="listing-meta">
                        <span class="listing-loc">${prop.city}</span>
                        <span class="listing-price">R ${prop.price.toLocaleString()}</span>
                    </div>
                    <h3 class="listing-title">${prop.title}</h3>
                    <p class="listing-desc">${prop.desc}</p>
                    <div class="listing-specs">
                        <span><i class="fa-solid fa-bed"></i> ${prop.bedrooms} Beds</span>
                        <span><i class="fa-solid fa-bath"></i> ${prop.bathrooms} Baths</span>
                        <span><i class="fa-solid fa-ruler-combined"></i> ${prop.area} m²</span>
                    </div>
                    <div class="listing-footer">
                        <button class="btn-card" data-title="${prop.title}">Book Viewing</button>
                    </div>
                </div>
            `;
            listingsContainer.appendChild(card);
        });

        // Add event listeners to viewing booking buttons
        document.querySelectorAll(".btn-card").forEach(button => {
            button.addEventListener("click", (e) => {
                const title = e.target.getAttribute("data-title");
                if (modalPropertyTitle) {
                    modalPropertyTitle.textContent = title;
                }
                if (bookingModal) {
                    bookingModal.classList.remove("hide");
                }
            });
        });
    }

    // 3. Filter Properties Logic
    function handleFilter() {
        if (!searchCity || !searchType || !searchBeds || !searchBudget) return;
        
        const cityValue = searchCity.value;
        const typeValue = searchType.value;
        const bedsValue = searchBeds.value;
        const budgetValue = searchBudget.value;

        const filtered = properties.filter(prop => {
            // City filter (case insensitive substring check)
            const matchCity = (cityValue === "all" || prop.city.toLowerCase().includes(cityValue.toLowerCase()));
            
            // Type filter
            const matchType = (typeValue === "all" || prop.type === typeValue);
            
            // Beds filter
            let matchBeds = true;
            if (bedsValue === "3") {
                matchBeds = (prop.bedrooms === 3);
            } else if (bedsValue === "4") {
                matchBeds = (prop.bedrooms >= 4);
            }
            
            // Budget filter
            let matchBudget = true;
            if (budgetValue !== "all") {
                matchBudget = (prop.price <= parseInt(budgetValue.replace(/\D/g, '')));
            }

            return matchCity && matchType && matchBeds && matchBudget;
        });

        renderProperties(filtered);
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", handleFilter);
    }

    // Initial render
    renderProperties(properties);

    // Multi-Step Lead Form Logic
    window.goToStep = function(step) {
        if (step === 2) {
            const address = document.getElementById('form-address').value.trim();
            const suburb = document.getElementById('form-suburb').value.trim();
            const beds = document.getElementById('form-beds').value;
            const baths = document.getElementById('form-baths').value;

            if (!address || !suburb || !beds || !baths) {
                alert('Please complete property details before moving to contact details.');
                return;
            }
        }

        document.querySelectorAll('.form-block').forEach(el => el.classList.remove('active'));
        document.getElementById(`step-${step}`).classList.add('active');

        if (step1Indicator && step2Indicator) {
            if (step === 2) {
                step1Indicator.classList.add('completed');
                step2Indicator.classList.add('active');
            } else {
                step1Indicator.classList.remove('completed');
                step1Indicator.classList.add('active');
                step2Indicator.classList.remove('active');
            }
        }
    };

    if (evaluationForm) {
        evaluationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('step-2').classList.remove('active');
            document.querySelector('.form-nav-indicator').style.display = 'none';
            document.getElementById('success-box').style.display = 'flex';
        });
    }

    // Modal close logic
    if (closeModalBtn && bookingModal) {
        closeModalBtn.addEventListener("click", () => {
            bookingModal.classList.add("hide");
        });
        
        // Close modal when clicking outside of it
        window.addEventListener("click", (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.add("hide");
            }
        });
    }

    if (bookingForm && bookingModal) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Viewing requested successfully! We will contact you soon.');
            bookingModal.classList.add("hide");
            bookingForm.reset();
        });
    }
});
