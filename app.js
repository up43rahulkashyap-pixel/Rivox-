document.addEventListener("DOMContentLoaded", () => {
    
    // === 1. SINGLE CLICK LIKE BUTTON ===
    const likeButtons = document.querySelectorAll(".like-btn");
    
    likeButtons.forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            toggleLike(this.closest(".post"));
        });
    });

    // Like badhane aur ghatane ka function
    function toggleLike(postElement, forceLike = false) {
        const icon = postElement.querySelector(".like-btn i");
        const likesDiv = postElement.querySelector(".post-likes");
        let currentLikes = parseInt(likesDiv.textContent.replace(/,/g, ''));

        // Agar post pehle se liked nahi hai ya double tap kiya hai
        if (icon.classList.contains("fa-regular") || forceLike) {
            if(icon.classList.contains("fa-regular")) {
                currentLikes += 1;
            }
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
            icon.style.color = "#e74c3c"; // Red Color
        } else {
            // Un-like karne par
            currentLikes -= 1;
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
            icon.style.color = "";
        }
        likesDiv.textContent = currentLikes.toLocaleString() + " likes";
    }

    // === 2. DOUBLE TAP TO LIKE ANIMATION ===
    const postImages = document.querySelectorAll(".post-image-container");
    
    postImages.forEach(container => {
        let lastTap = 0;
        container.addEventListener("click", function(e) {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            // Agar do click ke beech ka time 300ms se kam hai (Double Tap)
            if (tapLength < 300 && tapLength > 0) {
                const heart = this.querySelector(".double-tap-heart");
                const post = this.closest(".post");
                
                // Bada heart pop-up screen par dikhana
                heart.classList.add("animate");
                setTimeout(() => heart.classList.remove("animate"), 700);
                
                // Post ko auto-like karna
                toggleLike(post, true);
            }
            lastTap = currentTime;
        });
    });
});
