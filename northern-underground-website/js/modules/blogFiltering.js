// js/modules/blogFiltering.js
import { translations, currentLang } from '../../../js/modules/translation.js'; // Import translations

const blogPostsData = [
    {
        id: 1,
        titleKey: 'blogPostTitle1',
        excerptKey: 'blogPostExcerpt1',
        image: 'https://via.placeholder.com/400x250/4CAF50/FFFFFF?text=Blog+Post+1',
        category: 'technology',
        date: '2023-10-26'
    },
    {
        id: 2,
        titleKey: 'blogPostTitle2',
        excerptKey: 'blogPostExcerpt2',
        image: 'https://via.placeholder.com/400x250/333333/FFFFFF?text=Blog+Post+2',
        category: 'relationships',
        date: '2023-10-20'
    },
    {
        id: 3,
        titleKey: 'blogPostTitle3',
        excerptKey: 'blogPostExcerpt3',
        image: 'https://via.placeholder.com/400x250/66BB6A/FFFFFF?text=Blog+Post+3',
        category: 'company',
        date: '2023-10-15'
    },
    {
        id: 4,
        titleKey: 'blogPostTitle4',
        excerptKey: 'blogPostExcerpt4',
        image: 'https://via.placeholder.com/400x250/555555/FFFFFF?text=Blog+Post+4',
        category: 'tips',
        date: '2023-10-10'
    }
    // Add more blog posts as needed
];

let currentCategory = 'all';
let currentSearchTerm = '';

function initBlogFiltering(applyTranslationsCallback) {
    const blogSearchInput = document.getElementById('blog-search-input');
    const categoryTags = document.querySelectorAll('.category-tag');
    const blogPostsContainer = document.getElementById('blog-posts-container');

    if (!blogPostsContainer) {
        // console.warn("Blog posts container not found. Skipping blog filtering initialization.");
        return;
    }

    function displayBlogPosts(posts) {
        blogPostsContainer.innerHTML = '';
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-color-light);">No blog posts found matching your criteria.</p>`;
            return;
        }

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('blog-post-card');
            postCard.innerHTML = `
                <img src="${post.image}" alt="${translations[currentLang][post.titleKey]}">
                <div class="blog-post-card-content">
                    <span class="category">${translations[currentLang]['blogCategory' + post.category.charAt(0).toUpperCase() + post.category.slice(1)] || post.category}</span>
                    <h3>${translations[currentLang][post.titleKey]}</h3>
                    <p>${translations[currentLang][post.excerptKey]}</p>
                    <button class="read-more-btn" data-translate-key="blogReadMore">Read More</button>
                </div>
            `;
            blogPostsContainer.appendChild(postCard);
        });
        // Re-apply translations after dynamic content is loaded
        if (applyTranslationsCallback) {
            applyTranslationsCallback();
        }
    }

    function filterBlogPosts() {
        const searchTerm = blogSearchInput ? blogSearchInput.value.toLowerCase() : '';
        const filteredCategory = currentCategory;

        const filtered = blogPostsData.filter(post => {
            const matchesSearch = translations[currentLang][post.titleKey].toLowerCase().includes(searchTerm) ||
                                  translations[currentLang][post.excerptKey].toLowerCase().includes(searchTerm);
            const matchesCategory = filteredCategory === 'all' || post.category === filteredCategory;
            return matchesSearch && matchesCategory;
        });
        displayBlogPosts(filtered);
    }

    if (blogSearchInput) {
        blogSearchInput.addEventListener('input', () => {
            currentSearchTerm = blogSearchInput.value;
            filterBlogPosts();
        });
    }

    if (categoryTags.length > 0) {
        categoryTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Remove 'active' from all category tags
                categoryTags.forEach(t => t.classList.remove('active'));
                // Add 'active' to the clicked tag
                tag.classList.add('active');
                currentCategory = tag.dataset.category;
                filterBlogPosts();
            });
        });
    }

    // Initial display of blog posts when the page loads
    filterBlogPosts();
}

export { initBlogFiltering };